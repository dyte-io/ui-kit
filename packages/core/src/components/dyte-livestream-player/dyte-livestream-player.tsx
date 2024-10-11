import type { LivestreamState } from '@dytesdk/web-core';
import { Component, h, Host, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Size, DyteI18n, IconPack, defaultIconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { showLivestream, PlayerEventType, PlayerState } from '../../utils/livestream';

const sdkScriptLocation = 'https://embed.cloudflarestream.com/embed/sdk.latest.js';

const safelyAccessStreamSDK = () => {
  if (typeof window === 'undefined') return undefined;
  return window['Stream'];
};

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

  @State() audioPlaybackError: boolean = false;

  @State() streamSDK: any = undefined;

  @State() streamInstance: any = undefined;

  private playerElement: HTMLIFrameElement;

  /**
   * Emit API error events
   */
  @Event({ bubbles: true, composed: true }) dyteAPIError: EventEmitter<{
    trace: string;
    message: string;
  }>;

  private livestreamUpdateListener = (state: LivestreamState) => {
    console.log('Livestream state updated', state);
    this.livestreamState = state;
  };

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
    if (!this.meeting.livestream.playbackUrl) {
      isError = true;
      errorMessage = this.t('livestream.error.not_found');
    }
    if (this.playerError) {
      isError = true;
      errorMessage = this.t(this.playerError?.message ?? 'livestream.error.unknown');
    }
    return { isError, errorMessage };
  };

  initializeStreamInstance = async () => {
    if (this.streamSDK && this.playerElement && !this.streamInstance) {
      const player = new this.streamSDK(this.playerElement);
      this.streamInstance = player;

      player.addEventListener('play', () => {
        this.playerState = PlayerState.PLAYING;
      });

      player.addEventListener('error', (error) => {
        this.playerError = error;
        this.playerState = PlayerEventType.ERROR;
      });
    }
  };

  setupStreamSDK = async () => {
    const streamSDK = safelyAccessStreamSDK();
    if (streamSDK) {
      this.streamSDK = streamSDK;
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src='${sdkScriptLocation}']`
    );
    const script = existingScript ?? document.createElement('script');
    script.addEventListener('load', () => {
      this.streamSDK = safelyAccessStreamSDK();
      this.initializeStreamInstance();
    });
    if (!existingScript) {
      script.src = sdkScriptLocation;
      document.head.appendChild(script);
    }
  };

  cleanupStreamSDK = () => {
    const script = document.querySelector<HTMLScriptElement>(`script[src='${sdkScriptLocation}']`);
    if (script) {
      script.remove();
    }
  };

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.setupStreamSDK();
  }

  disconnectedCallback() {
    this.meeting.livestream.removeListener('livestreamUpdate', this.livestreamUpdateListener);
    this.player = undefined;
    this.cleanupStreamSDK();
  }

  @Watch('meeting')
  meetingChanged(meeting) {
    if (meeting == null) return;
    this.livestreamState = this.meeting.livestream.state;
    this.meeting.livestream.on('livestreamUpdate', this.livestreamUpdateListener);
  }

  render() {
    if (!showLivestream(this.meeting)) return;
    const { isError, errorMessage } = this.getErrorState();
    const { isLoading, loadingMessage, showIcon } = this.getLoadingState();

    return (
      <Host>
        <div class="player-container">
          {this.livestreamState === 'LIVESTREAMING' ? (
            <iframe
              src={this.meeting.livestream.playbackUrl.replace(
                '/manifest/video.m3u8',
                '/iframe?autoplay=true'
              )}
              allowFullScreen
              allowTransparency
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              style={{
                border: 'none',
                position: 'absolute',
                top: '0',
                height: '100%',
                width: '100%',
              }}
              class={'player z-10'}
              ref={(el) => {
                this.playerElement = el;
                this.initializeStreamInstance();
              }}
            ></iframe>
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
