import type { LivestreamState } from '@dytesdk/web-core';
import Hls from 'hls.js';
import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';
import { Size, DyteI18n, IconPack, defaultIconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { DyteClient } from '../../types/dyte-client';
import {
  showLivestream,
  PlayerEventType,
  PlayerState,
  getLivestreamViewerAllowedQualityLevels,
} from '../../utils/livestream';
import { formatSecondsToHHMMSS } from '../../utils/time';

@Component({
  tag: 'dyte-livestream-player',
  styleUrl: 'dyte-livestream-player.css',
  shadow: true,
})
export class DyteLivestreamPlayer {
  private videoRef: HTMLVideoElement;

  private videoContainerRef: HTMLDivElement;

  @Element() el: HTMLDyteLivestreamPlayerElement;

  private hls: Hls;

  private statsIntervalTimer = null;

  /** Meeting object */
  @Prop() meeting!: DyteClient;

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

  @State() livestreamId: string = null;

  @State() audioPlaybackError: boolean = false;

  @State() qualityLevels: Array<{ level: number; resolution: string }> = [];

  @State() selectedQuality: number = -1; // -1 for auto

  @State() currentTime: number = 0;

  @State() duration: number = 0;

  /**
   * Emit API error events
   */
  @Event({ bubbles: true, composed: true }) dyteAPIError: EventEmitter<{
    trace: string;
    message: string;
  }>;

  private livestreamUpdateListener = (state: LivestreamState) => {
    this.playbackUrl = this.meeting.livestream.playbackUrl;
    this.livestreamState = state;
  };

  private updateProgress = () => {
    this.currentTime = this.videoRef.currentTime;
  };

  private updateHlsStatsPeriodically = () => {
    // Total duration is where video is + the latency that is there
    this.duration = (this.videoRef?.currentTime || 0) + (this.hls?.latency || 0);
  };

  private fastForwardToLatest = () => {
    this.videoRef.currentTime = this.duration - 1; // Move to the latest time
  };

  @Watch('livestreamState')
  // @ts-ignore
  private async updateLivestreamId() {
    const url = this.meeting.livestream.playbackUrl;
    if (!url || this.livestreamState !== 'LIVESTREAMING') {
      this.livestreamId = null;
      return;
    }

    const parts = url.split('/');
    const manifestIndex = parts.findIndex((part) => part === 'manifest');
    const streamId = parts[manifestIndex - 1];
    this.livestreamId = streamId;
    await this.conditionallyStartLivestreamViewer();
  }

  private async conditionallyStartLivestreamViewer() {
    if (this.videoRef && this.playbackUrl && !this.hls) {
      await this.initialiseAndPlayStream();
    }
  }

  private togglePlay = () => {
    if (this.videoRef.paused) {
      this.videoRef.play();
      this.playerState = PlayerState.PLAYING;
    } else {
      this.videoRef.pause();
      this.playerState = PlayerState.IDLE;
    }
  };

  private changeQuality = (level: number) => {
    this.selectedQuality = level;
    if (this.hls) {
      this.hls.currentLevel = level;
    }
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
        if (this.playerState !== PlayerState.PLAYING && this.playerState !== PlayerState.PAUSED) {
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

  private initialiseAndPlayStream = async () => {
    try {
      this.meeting.__internals__.logger.info(
        `dyte-livestream-player:: About to initialise HLS. VideoRef? ${!!this
          .videoRef} playbackUrl: ${this.playbackUrl}`
      );
      if (Hls.isSupported()) {
        this.meeting.__internals__.logger.info(
          `dyte-livestream-player:: Initialising HLS. HLS is Supported`
        );

        this.hls = new Hls({
          lowLatencyMode: false,
        });

        (window as any).dyte_hls = this.hls;

        this.meeting.__internals__.logger.info(`dyte-livestream-player:: Loading source`);
        this.hls.loadSource(this.playbackUrl);
        this.meeting.__internals__.logger.info(
          `dyte-livestream-player:: Attaching video element to HLS`
        );
        this.hls.attachMedia(this.videoRef);

        this.meeting.__internals__.logger.info(
          `dyte-livestream-player:: Waiting async for HLS manifest parsing`
        );

        this.hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            this.meeting.__internals__.logger.error('dyte-livestream-player:: fatal error:', data);
          } else {
            this.meeting.__internals__.logger.warn(
              'dyte-livestream-player:: non-fatal error:',
              data
            );
          }
        });

        // Listen for manifest parsed to populate quality levels
        this.hls.on(Hls.Events.MANIFEST_PARSED, async (_, data) => {
          this.meeting.__internals__.logger.info(`dyte-livestream-player:: HLS manifest parsed`);
          const { levels: levelsToUse, autoLevelChangeAllowed } =
            getLivestreamViewerAllowedQualityLevels({
              meeting: this.meeting,
              hlsLevels: data.levels,
            });

          this.qualityLevels = levelsToUse.map((level, index) => ({
            level: index,
            resolution: level.height ? `${level.height}p` : 'auto',
          }));
          if (autoLevelChangeAllowed) {
            this.qualityLevels = [{ level: -1, resolution: 'Auto' }, ...this.qualityLevels];
          }
          // Set a reasonable starting quality
          this.hls.currentLevel = this.qualityLevels[0].level;

          try {
            this.meeting.__internals__.logger.info(
              'dyte-livestream-player:: About to start video.'
            );
            await this.videoRef.play(); // Starts playing the video after it is ready
            this.meeting.__internals__.logger.info(
              'dyte-livestream-player:: Video has started playing.'
            );
            this.playerState = PlayerState.PLAYING;
          } catch (error) {
            this.audioPlaybackError = true;
            this.meeting.__internals__.logger.error(
              `dyte-livestream-player:: Video couldn't start. Trying with user gesture again.`,
              {
                error,
              }
            );
          }
        });

        // Setup listeners to show current time and total duration
        this.videoRef.addEventListener('timeupdate', this.updateProgress);
        this.statsIntervalTimer = setInterval(this.updateHlsStatsPeriodically, 1000);
      } else {
        this.isSupported = false;
      }
    } catch (error) {
      this.meeting.__internals__.logger.error(`dyte-livestream-player:: HLS couldn't initialise.`, {
        error,
      });
      // Retry with user gesture
    }
  };

  async connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting.livestream.removeListener('livestreamUpdate', this.livestreamUpdateListener);
    this.videoRef.removeEventListener('timeupdate', this.updateProgress);
    clearInterval(this.statsIntervalTimer);
    this.videoRef = null;
    if (this.hls) {
      this.hls.destroy();
    }
    (window as any).dyte_hls = null;
  }

  @Watch('meeting')
  meetingChanged(meeting) {
    if (meeting == null) return;
    this.playbackUrl = this.meeting.livestream.playbackUrl;
    this.livestreamState = this.meeting.livestream.state;
    this.meeting.livestream.on('livestreamUpdate', this.livestreamUpdateListener);
  }

  render() {
    if (!showLivestream(this.meeting)) return;
    const { isError, errorMessage } = this.getErrorState();
    const { isLoading, loadingMessage, showIcon } = this.getLoadingState();

    return (
      <Host>
        <div class="player-container h-full max-h-full min-h-full w-full min-w-full max-w-full">
          <div
            ref={async (el) => {
              this.videoContainerRef = el;
            }}
            class="video-container relative flex h-full w-full flex-col items-center justify-center pb-20"
          >
            <video
              ref={async (el) => {
                this.videoRef = el;
                await this.conditionallyStartLivestreamViewer();
              }}
              id="livestream-video"
              style={{ height: `${this.el?.clientHeight}px` }}
              controls={false} // Custom controls
              onPlay={() => {
                if (this.playerState === PlayerState.PAUSED) {
                  this.playerState = PlayerState.PLAYING;
                }
              }}
              onPause={() => (this.playerState = PlayerState.PAUSED)}
            ></video>
            {this.playerState !== PlayerState.IDLE && (
              // <!-- Control Bar -->
              <div class="control-bar" style={{ width: `${this.videoRef?.clientWidth}px` }}>
                <div class="control-groups">
                  {/* <!-- Play/Pause Button --> */}
                  <dyte-icon
                    id="playPause"
                    onClick={this.togglePlay}
                    size="lg"
                    class="control-btn"
                    icon={
                      this.playerState === PlayerState.PLAYING
                        ? this.iconPack.pause
                        : this.iconPack.play
                    }
                  />

                  <dyte-icon
                    size="lg"
                    class="control-btn"
                    icon={this.iconPack.fastForward}
                    onClick={this.fastForwardToLatest}
                  />
                  <span class="timings">
                    {formatSecondsToHHMMSS(this.currentTime)} /{' '}
                    {formatSecondsToHHMMSS(this.duration)}
                  </span>
                </div>

                <div class="control-groups">
                  {/* <!-- Quality --> */}
                  <select
                    class="level-select"
                    onChange={(e) =>
                      this.changeQuality(parseInt((e.target as HTMLSelectElement).value))
                    }
                  >
                    {this.qualityLevels.map((level) => (
                      <option value={level.level} selected={this.selectedQuality === level.level}>
                        {level.resolution}
                      </option>
                    ))}
                  </select>

                  {/* <!-- Fullscreen Button --> */}
                  <dyte-fullscreen-toggle
                    id="fullscreen"
                    class="control-btn fullscreen-btn"
                    targetElement={this.videoContainerRef}
                    size="sm"
                    iconPack={this.iconPack}
                    t={this.t}
                    ref={(fullScreenToggle) => {
                      // Create a <style> element
                      const style = document.createElement('style');

                      // Add CSS rules
                      style.textContent = `
                        dyte-controlbar-button {
                          display: contents;
                          background-color: var(--bg-brand-500);
                          color: var(--text-text-on-brand);
                        }
                      `;

                      // Append the <style> to the Shadow DOM
                      fullScreenToggle.shadowRoot.appendChild(style);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {this.audioPlaybackError && (
            <div class="unmute-popup">
              <h3>{this.t('audio_playback.title')}</h3>
              <p>{this.t('audio_playback.description')}</p>
              <dyte-button
                kind="wide"
                onClick={() => {
                  this.audioPlaybackError = false;
                  if (this.videoRef) {
                    this.videoRef.muted = false;
                    this.videoRef.play();
                    this.playerState = PlayerState.PLAYING;
                  }
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
