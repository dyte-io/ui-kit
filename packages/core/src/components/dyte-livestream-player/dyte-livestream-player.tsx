import type { LivestreamState } from '@dytesdk/web-core';
import { Component, h, Host, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Size, DyteI18n, IconPack, defaultIconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { showLivestream, PlayerEventType, PlayerState } from '../../utils/livestream';

@Component({
  tag: 'dyte-livestream-player',
  styleUrl: 'dyte-livestream-player.css',
  shadow: true,
})
export class DyteLivestreamPlayer {
  private player: HTMLVideoElement;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  @State() playbackUrl: string;

  @State() isSupported: boolean = true;

  @State() playerState: PlayerState | PlayerEventType = PlayerState.IDLE;

  @State() livestreamState: LivestreamState = 'IDLE';

  @State() playerError: any;

  @State() latency: number = 0;

  @State() livestreamId: string = null;

  @State() audioPlaybackError: boolean = false;

  /**
   * Emit API error events
   */
  @Event({ bubbles: true, composed: true }) dyteAPIError: EventEmitter<{
    trace: string;
    message: string;
  }>;

  private livestreamUpdateListener = (state: LivestreamState) => {
    this.livestreamState = state;
    this.playbackUrl = this.meeting.livestream.playbackUrl;
  };

  @Watch('livestreamState')
  // @ts-ignore
  private updateLivestreamId() {
    const url = this.meeting.livestream.playbackUrl;
    if (!url || this.livestreamState !== 'LIVESTREAMING') {
      this.livestreamId = null;
      this.player = null;
      // @ts-ignore
      window.dyteLivestreamPlayerElement = null;
      return;
    }

    const parts = url.split('/');
    const manifestIndex = parts.findIndex((part) => part === 'manifest');
    const streamId = parts[manifestIndex - 1];
    this.livestreamId = streamId;
  }

  private getLoadingState = () => {
    let loadingMessage = '';
    let isLoading = false;
    let showIcon = false;
    switch (this.livestreamState) {
      case 'IDLE':
        loadingMessage = this.t('livestream.idle');
        isLoading = true;
        showIcon = false;
        break;
      case 'STARTING':
        loadingMessage = this.t('livestream.starting');
        isLoading = true;
        showIcon = true;
        break;
      case 'STOPPING':
        loadingMessage = this.t('livestream.stopping');
        isLoading = true;
        showIcon = true;
        break;
      case 'LIVESTREAMING':
        if (this.playerState !== PlayerState.PLAYING) {
          loadingMessage = this.t('livestream.starting');
          showIcon = true;
          isLoading = true;
        }
        break;
      default:
        isLoading = false;
        loadingMessage = this.t('');
        showIcon = true;
        break;
    }
    return { isLoading, loadingMessage, showIcon };
  };

  private getErrorState = () => {
    let isError = false;
    let errorMessage = '';
    if (this.livestreamState !== 'LIVESTREAMING') {
      isError = false;
      errorMessage = this.t('');
      return { isError, errorMessage };
    }
    if (!this.isSupported) {
      isError = true;
      errorMessage = this.t('livestream.error.not_supported');
    }
    if (!this.playbackUrl) {
      isError = true;
      errorMessage = this.t('livestream.error.not_found');
    }
    if (this.playerError) {
      isError = true;
      errorMessage = this.t(this.playerError?.message ?? 'livestream.error.unknown');
    }
    return { isError, errorMessage };
  };

  private isScriptWithSrcPresent(srcUrl) {
    const scripts = document.querySelectorAll('script');
    for (let script of scripts) {
      if (script.src === srcUrl) {
        return true;
      }
    }
    return false;
  }

  /**
   * Make sure to call loadLivestreamPlayer before startLivestreamPlayer.
   */
  private startLivestreamPlayer = async () => {
    try {
      this.meeting.__internals__.logger.info(
        'dyte-livestream-player:: Initialising player element.'
      );
      // @ts-ignore
      await window.__stream.initElement(this.player);
      this.meeting.__internals__.logger.info('dyte-livestream-player:: About to start player.');
      // @ts-ignore
      await window.dyte_hls.play();
      this.playerState = PlayerState.PLAYING;
      this.audioPlaybackError = false;
      this.meeting.__internals__.logger.info(
        'dyte-livestream-player:: Player has started playing.'
      );
    } catch (error) {
      this.meeting.__internals__.logger.error(`dyte-livestream-player:: Player couldn't start.`, {
        error,
      });
      // Retry with user gesture
      this.audioPlaybackError = true;
    }
  };

  private loadLivestreamPlayer = async () => {
    const playerSrc = `https://cdn.dyte.in/streams/script.js`;
    if (!(window as any).__stream && this.isScriptWithSrcPresent(playerSrc)) {
      // Script loading is ongoing; Do Nothing
      return false;
    }

    if ((window as any).__stream) {
      return true;
    }

    // Since script is not there, let's add script first
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = playerSrc;
      script.onload = () => {
        setTimeout(() => {
          if ((window as any).__stream) {
            this.meeting.__internals__.logger.info(
              `dyte-livestream-player:: Finished script load. Added window._stream.`
            );
            resolve(true);
            return;
          }
          this.meeting.__internals__.logger.error(
            `dyte-livestream-player:: onLoad didn't add window._stream in time.`
          );
          resolve(false);
        }, 1000);
      };
      script.onerror = (error: any) => {
        this.meeting.__internals__.logger.error(
          `dyte-livestream-player:: CDN script didn't load.`,
          { error }
        );
        resolve(false);
      };
      document.head.appendChild(script);
    });
  };

  async connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting.livestream.removeListener('livestreamUpdate', this.livestreamUpdateListener);
    this.player = null;
    // @ts-ignore
    window.dyteLivestreamPlayerElement = null;
  }

  @Watch('meeting')
  meetingChanged(meeting) {
    if (meeting == null) return;
    this.livestreamState = this.meeting.livestream.state;
    this.playbackUrl = this.meeting.livestream.playbackUrl;
    this.meeting.livestream.on('livestreamUpdate', this.livestreamUpdateListener);
  }

  render() {
    if (!showLivestream(this.meeting)) return;
    const { isError, errorMessage } = this.getErrorState();
    const { isLoading, loadingMessage, showIcon } = this.getLoadingState();

    return (
      <Host>
        <div class="player-container">
          {this.livestreamState === 'LIVESTREAMING' && this.livestreamId && (
            <div class="flex h-full w-full items-start justify-center pb-20">
              <stream
                width="100%"
                height="80vh"
                className="overflow-hidden rounded-lg"
                src={this.livestreamId}
                ref={async (self) => {
                  this.player = self;
                  // Add player instance on window to satisfy cdn script
                  // @ts-ignore
                  window.dyteLivestreamPlayerElement = self;
                  const isPlayerLoaded = await this.loadLivestreamPlayer();
                  if (isPlayerLoaded) {
                    await this.startLivestreamPlayer();
                  }
                }}
                cmcd
                autoplay
                force-flavor="llhls"
                customer-domain-prefix="customer-s8oj0c1n5ek8ah1e"
              ></stream>
            </div>
          )}
          {this.audioPlaybackError && (
            <div class="unmute-popup">
              <h3>{this.t('audio_playback.title')}</h3>
              <p>{this.t('audio_playback.description')}</p>
              <dyte-button
                kind="wide"
                onClick={() => {
                  if (this.player) {
                    this.player.muted = false;
                  }
                  this.audioPlaybackError = false;
                }}
                title={this.t('audio_playback')}
                iconPack={this.iconPack}
                t={this.t}
              >
                {this.t('audio_playback')}
              </dyte-button>
            </div>
          )}
          {isError && (
            <div class="loader">
              <dyte-icon icon={this.iconPack.warning} t={this.t} />
              <p>{errorMessage}</p>
            </div>
          )}
          {!isError && isLoading && (
            <div class="loader">
              {showIcon && (
                <dyte-spinner
                  id="icon"
                  part="spinner"
                  iconPack={this.iconPack}
                  t={this.t}
                  size="md"
                />
              )}
              <p>{loadingMessage}</p>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
