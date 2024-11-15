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
import { Meeting } from '../../types/dyte-client';
import { showLivestream, PlayerEventType, PlayerState } from '../../utils/livestream';

@Component({
  tag: 'dyte-livestream-player',
  styleUrl: 'dyte-livestream-player.css',
  shadow: true,
})
export class DyteLivestreamPlayer {
  private videoRef: HTMLVideoElement;

  private progressBarRef: HTMLInputElement;

  @Element() el: HTMLDyteLivestreamPlayerElement; // This gives you a reference to the root DOM element

  private hls: Hls;

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

  @State() livestreamId: string = null;

  @State() audioPlaybackError: boolean = false;

  @State() volume: number = 1;

  @State() qualityLevels: Array<{ level: number; resolution: string }> = [];

  @State() selectedQuality: number = -1; // -1 for auto

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
      // Update progress bar on playback progress
      this.videoRef.addEventListener('timeupdate', () => {
        if (this.videoRef.duration && this.progressBarRef) {
          const progress = (this.videoRef.currentTime / this.videoRef.duration) * 100;
          console.log(
            'Current time:: ',
            this.videoRef.currentTime,
            ' duration:: ',
            this.videoRef.duration
          );
          this.progressBarRef.value = Math.round(progress).toString();
        }
      });
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

  private setVolume = (e: Event) => {
    const volume = (e.target as HTMLInputElement).valueAsNumber;
    this.videoRef.volume = volume;
    this.volume = volume;
  };

  private changeQuality = (level: number) => {
    this.selectedQuality = level;
    if (this.hls) {
      if (level === -1) {
        // Auto
        this.hls.currentLevel = -1;
      } else {
        this.hls.currentLevel = level;
      }
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
            console.error('Fatal error:', data);
          } else {
            console.warn('Non-fatal error:', data);
          }
        });

        // Listen for manifest parsed to populate quality levels
        this.hls.on(Hls.Events.MANIFEST_PARSED, async (_, data) => {
          this.meeting.__internals__.logger.info(`dyte-livestream-player:: HLS manifest parsed`);
          this.qualityLevels = data.levels.map((level, index) => ({
            level: index,
            resolution: level.height ? `${level.height}p` : 'auto',
          }));

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
    this.videoRef = null;
    if (this.hls) {
      this.hls.destroy();
    }
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
          <div class="video-container flex h-full max-h-full min-h-full w-full min-w-full max-w-full flex-col items-center justify-center pb-20">
            <video
              ref={async (el) => {
                this.videoRef = el;
                await this.conditionallyStartLivestreamViewer();
              }}
              class="h-full max-h-full min-h-full w-full min-w-full max-w-full"
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
              <div class="control-bar">
                {/* <!-- Play/Pause Button --> */}
                <button id="playPause" class="control-btn" onClick={this.togglePlay}>
                  <dyte-icon
                    icon={
                      this.playerState === PlayerState.PLAYING
                        ? this.iconPack.pause
                        : this.iconPack.play
                    }
                  />
                </button>

                {/* <!-- Progress Bar --> */}
                <input
                  type="range"
                  id="progress"
                  ref={(el) => {
                    this.progressBarRef = el;
                  }}
                  onInput={(event) => {
                    const progressPercentage = (event.target as HTMLInputElement).valueAsNumber;
                    const newTime = progressPercentage * this.videoRef.duration;
                    this.videoRef.currentTime = newTime;
                  }}
                  class="progress-bar"
                  value="0"
                  max="100"
                  step="0.1"
                />

                {/* <!-- Volume Control --> */}
                <div class="volume-control-holder">
                  <dyte-icon icon={this.iconPack.speaker} />
                  <input
                    type="range"
                    id="volume"
                    class="volume-bar"
                    max="1"
                    step="0.1"
                    value={this.volume}
                    onInput={this.setVolume}
                  />
                </div>

                {/* <!-- Quality --> */}
                <select
                  class="level-select"
                  onChange={(e) =>
                    this.changeQuality(parseInt((e.target as HTMLSelectElement).value))
                  }
                >
                  <option value={-1} selected={this.selectedQuality === -1}>
                    Auto
                  </option>
                  {this.qualityLevels.map((level) => (
                    <option value={level.level} selected={this.selectedQuality === level.level}>
                      {level.resolution}
                    </option>
                  ))}
                </select>

                {/* <!-- Fullscreen Button --> */}
                <dyte-fullscreen-toggle
                  id="fullscreen"
                  class="control-btn"
                  targetElement={this.el}
                  size="sm"
                  iconPack={this.iconPack}
                  t={this.t}
                />
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
