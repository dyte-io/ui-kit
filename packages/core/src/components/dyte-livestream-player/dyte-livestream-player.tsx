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

  private loadPlayerAndPlayLivestream = () => {
    const playerSrc = `https://cdn.dyte.in/streams/script.js`;
    if (!(window as any).__stream && this.isScriptWithSrcPresent(playerSrc)) {
      // Script loading is ongoing; Do Nothing
      return;
    }
    if ((window as any).__stream) {
      // Already loaded, let's initialize the player element and play
      setTimeout(async () => {
        // @ts-ignore
        await window.__stream.initElement(this.player);
        // @ts-ignore
        await window.dyte_hls.play();
        this.playerState = PlayerState.PLAYING;
      }, 200);
      return;
    }

    // Since script is not there, let's add script first
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = playerSrc;
      script.onload = () => {
        setTimeout(async () => {
          // Script loaded, let's initialize the player element and play
          // @ts-ignore
          await window.__stream.initElement(this.player);
          // @ts-ignore
          await window.dyte_hls.play();
          this.playerState = PlayerState.PLAYING;
          resolve(true);
        }, 200);
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
          {this.livestreamState === 'LIVESTREAMING' && this.livestreamId ? (
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
                  await this.loadPlayerAndPlayLivestream();
                }}
                cmcd
                autoplay
                controls
                force-flavor="llhls"
                customer-domain-prefix="customer-s8oj0c1n5ek8ah1e"
              ></stream>
            </div>
          ) : null}
          {this.audioPlaybackError && (
            <div class="unmute-popup">
              <h3>{this.t('audio_playback.title')}</h3>
              <p>{this.t('audio_playback.description')}</p>
              <dyte-button
                kind="wide"
                onClick={() => {
                  this.player.muted = false;
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
