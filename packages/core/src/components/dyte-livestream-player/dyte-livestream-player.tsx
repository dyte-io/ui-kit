import type { LivestreamState } from '@dytesdk/web-core';
import { Component, h, Host, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Size, DyteI18n, IconPack, defaultIconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import {
  awsIvsPlayerEventsToIgnore,
  isIvsPlayerCallStatsEvent,
  showLivestream,
  PlayerEventType,
  PlayerState,
} from '../../utils/livestream';

@Component({
  tag: 'dyte-livestream-player',
  styleUrl: 'dyte-livestream-player.css',
  shadow: true,
})
export class DyteLivestreamPlayer {
  private player: HTMLVideoElement;
  private ivsPlayer: any;
  private showLatencyIndicator: boolean = false;
  private updateLatency: any;
  private sendLatencyToCallStats: any;

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

  /**
   * Emit API error events
   */
  @Event({ bubbles: true, composed: true }) dyteAPIError: EventEmitter<{
    trace: string;
    message: string;
  }>;

  private AddPlayerListeners(player: any = this.ivsPlayer) {
    Object.values({
      ...PlayerEventType,
      ...PlayerState,
    }).forEach((key: PlayerState | PlayerEventType) => {
      if (awsIvsPlayerEventsToIgnore.includes(key as PlayerEventType)) return;
      player?.addEventListener(key, (event: any) => {
        if (
          key === PlayerState.IDLE ||
          key === PlayerState.PLAYING ||
          key === PlayerEventType.ERROR ||
          key === PlayerState.READY
        )
          this.playerState = key;
        if (key === PlayerEventType.ERROR) {
          this.playerError = event;
        }
        if (key === PlayerState.IDLE && player.isPaused()) {
          player.play();
        }
        if (key === PlayerEventType.AUDIO_BLOCKED) {
          this.audioPlaybackError = true;
        }
        if (
          this.playerState === PlayerState.PLAYING &&
          !this.meeting.__internals__?.browserSpecs?.isIOSMobile()
        ) {
          this.showLatencyIndicator = true;
        } else this.showLatencyIndicator = false;
        this.meeting.__internals__.logger.info(`IVS.Player.${key}`, event);

        // Send selected data to CallStats
        if (isIvsPlayerCallStatsEvent.includes(key as PlayerEventType)) {
          this.meeting.__internals__.callStats?.ivsPlayerEvent(key, event);
        }
      });
    });
  }

  private LoadPlayer = (player: any = this.ivsPlayer) => {
    if (this.player && player) {
      player.attachHTMLVideoElement(this.player);
      player.setAutoplay(true);
      player.setVolume(1);
    }
  };

  private getPlaybackUrl(player: any = this.ivsPlayer) {
    this.playbackUrl = this.meeting.livestream.playbackUrl;
    if (this.playbackUrl && player) {
      player.load(this.playbackUrl);
      player.play();
    }
  }

  private livestreamUpdateListener = (state: LivestreamState) => {
    this.livestreamState = state;
    if (state === 'LIVESTREAMING') {
      this.LoadPlayer();
      this.getPlaybackUrl();
      if (!this.meeting.__internals__?.browserSpecs?.isIOSMobile()) {
        this.fetchLatency();
        this.updateLatency = setInterval(this.fetchLatency, 2000);
      }
      this.meeting.participants.pip?.enableSource('livestream-player');
    } else {
      this.showLatencyIndicator = false;
      if (this.updateLatency) clearInterval(this.updateLatency);
      this.meeting.participants.pip?.disableSource('livestream-player');
    }
  };

  private onPlayerRef(el: HTMLVideoElement) {
    this.player = el;
    this.meeting.participants.pip?.addSource(
      'livestream-player',
      this.player,
      this.playbackUrl ? true : false
    );
    if (this.playbackUrl) this.meeting.participants.pip?.enableSource('livestream-player');
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

  private fetchLatency = () => {
    if (this.ivsPlayer) {
      this.latency = this.ivsPlayer.getLiveLatency();
      this.meeting.__internals__.logger.info('IVS.Player.LivestreamLatency', {
        livestream: {
          latency: this.latency,
        },
      });
    }
  };

  // private stopRebuffer = (latency: number) => {
  //   this.ivsPlayer.setRebufferToLive(false);
  //   this.latency = latency;
  //   clearInterval(this.updateLatency);
  //   this.updateLatency = setInterval(this.fetchLatency, 2000);
  // };

  // private resetSyncLivestream = () => {
  //   const latency = this.ivsPlayer.getLiveLatency();
  //   this.stopRebuffer(latency);
  //   this.dyteAPIError.emit({
  //     trace: this.t('livestreamPlayer.rebuffer.error'),
  //     message: this.t('livestream.error.sync'),
  //   });
  // };

  // private syncLiveStream = () => {
  //   clearInterval(this.updateLatency);
  //   // set latency to -1, to show loading icon
  //   this.latency = -1;
  //   this.ivsPlayer.setRebufferToLive(true);

  //   // Reset after 15 seconds
  //   const resetTimeout = setTimeout(this.resetSyncLivestream, 15000);

  //   this.updateLatency = setInterval(() => {
  //     const latency = this.ivsPlayer.getLiveLatency();
  //     if (latency < 10) {
  //       // Stop dropping frames
  //       this.stopRebuffer(latency);
  //       clearTimeout(resetTimeout);
  //     }
  //   }, 1000);
  // };

  connectedCallback() {
    this.meetingChanged(this.meeting);
    (window as any).onDyteLivestreamPlayer = (player) => {
      if (player) {
        this.isSupported = true;
        this.ivsPlayer = player;
        this.AddPlayerListeners(player);
        this.LoadPlayer(player);
        this.getPlaybackUrl(player);
      } else this.isSupported = false;
    };

    this.sendLatencyToCallStats = setInterval(() => {
      this.fetchLatency();
      this.meeting.__internals__.callStats?.livestreamLatency(this.latency);
    }, 10000);
  }

  disconnectedCallback() {
    (window as any).onDyteLivestreamPlayer = undefined;
    this.meeting.livestream.removeListener('livestreamUpdate', this.livestreamUpdateListener);
    clearInterval(this.sendLatencyToCallStats);
    this.ivsPlayer.load('');
    this.ivsPlayer = undefined;
    this.player = undefined;
  }

  async componentDidLoad() {
    const IVSPlayerImport = `
    import IVSPlayer from 'https://cdn.jsdelivr.net/npm/amazon-ivs-player@1.16.0/+esm'
    let player = undefined;
    if (IVSPlayer.isPlayerSupported) {
      player = IVSPlayer.create({
        wasmBinary:
          'https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.wasm',
        wasmWorker:
          'https://unpkg.com/amazon-ivs-player@1.11.0/dist/assets/amazon-ivs-wasmworker.min.js',
      });
    }
    window.onDyteLivestreamPlayer && window.onDyteLivestreamPlayer(player);
    `;
    const pScript = document.createElement('script');
    pScript.type = 'module';
    pScript.innerHTML = IVSPlayerImport;
    document.body.appendChild(pScript);
  }

  @Watch('meeting')
  meetingChanged(meeting) {
    if (meeting == null) return;
    this.livestreamState = this.meeting.livestream.state;
    if (this.livestreamState === 'LIVESTREAMING') {
      this.LoadPlayer();
      this.getPlaybackUrl();
      this.meeting.participants.pip?.enableSource('livestream-player');
    }
    this.meeting.livestream.on('livestreamUpdate', this.livestreamUpdateListener);
  }

  render() {
    if (!showLivestream(this.meeting)) return;
    const { isError, errorMessage } = this.getErrorState();
    const { isLoading, loadingMessage, showIcon } = this.getLoadingState();

    return (
      <Host>
        <div class="player-container">
          <video ref={(el) => this.onPlayerRef(el)} playsInline></video>
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
          {this.livestreamState === 'LIVESTREAMING' && this.showLatencyIndicator && (
            <div class="latency-controls">
              {/* {(this.latency > 10 || this.latency < 0) && (
                <div class="sync-live-stream" onClick={this.syncLiveStream}>
                  {this.latency === -1 ? (
                    <dyte-spinner
                      id="icon"
                      part="spinner"
                      iconPack={this.iconPack}
                      t={this.t}
                      size="sm"
                    />
                  ) : (
                    this.t('livestream.skip')
                  )}
                </div>
              )} */}
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
