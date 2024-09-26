import {
  Component,
  Host,
  h,
  Prop,
  Watch,
  State,
  writeTask,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting, Peer } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import {
  exitFullSreen,
  isFullScreenEnabled,
  isFullScreenSupported,
  requestFullScreen,
} from '../../utils/full-screen';
import { DyteParticipant, DyteSelf } from '@dytesdk/web-core';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which plays a participant's screenshared video.
 *
 * It also allows for placement of other components similar to `dyte-participant-tile`.
 *
 * This component will not render anything if the participant hasn't start screensharing.
 */
@Component({
  tag: 'dyte-screenshare-view',
  styleUrl: 'dyte-screenshare-view.css',
  shadow: true,
})
export class DyteScreenshareView {
  private componentPropsCleanupFn: () => void = () => {};
  private videoEl: HTMLVideoElement;
  private screenShareListener: (
    data: Pick<Peer, 'screenShareEnabled' | 'screenShareTracks'>
  ) => void;

  private fullScreenListener = () => {
    this.isFullScreen = isFullScreenEnabled();
  };

  private participantScreenshareUpdate = (p: Peer) => {
    if (p.id !== this.participant.id) return;
    this.screenShareListener(p);
  };

  @Element() host: HTMLDyteScreenshareViewElement;

  /** Hide full screen button */
  @Prop() hideFullScreenButton: boolean = false;

  /** Position of name tag */
  @Prop({ reflect: true }) nameTagPosition:
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'top-left'
    | 'top-right'
    | 'top-center' = 'bottom-left';

  /** Participant object */
  @Prop() participant!: Peer;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Variant */
  @Prop({ reflect: true }) variant: 'solid' | 'gradient' = 'solid';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() videoExpanded: boolean = false;

  @State() screenShareEnabled: boolean = false;

  @State() isFullScreen: boolean = false;

  @State() remoteControlInfo: string;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Emits when video playback happens successfully */
  @Event({ eventName: 'screensharePlay' }) play: EventEmitter<{
    participant: Peer;
    screenshareParticipant: Peer;
  }>;

  connectedCallback() {
    window?.addEventListener('fullscreenchange', this.fullScreenListener);
    window?.addEventListener('webkitfullscreenchange', this.fullScreenListener);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  componentDidLoad() {
    this.participantChanged(this.participant);
  }

  disconnectedCallback() {
    if (!this.meeting) return;

    const { self } = this.meeting;
    if (this.participant.id === self.id && this.screenShareListener)
      (this.participant as DyteParticipant).removeListener(
        'screenShareUpdate',
        this.screenShareListener
      );
    else
      this.meeting.participants.joined.removeListener(
        'screenShareUpdate',
        this.participantScreenshareUpdate
      );

    window?.removeEventListener('fullscreenchange', this.fullScreenListener);
    window?.removeEventListener('webkitfullscreenchange', this.fullScreenListener);
    this.componentPropsCleanupFn();
  }

  @Watch('participant')
  participantChanged(participant: Peer) {
    if (participant != null && this.meeting) {
      const { self } = this.meeting;
      this.screenShareListener = ({ screenShareEnabled, screenShareTracks }) => {
        const enabled = screenShareEnabled && screenShareTracks.video != null;

        writeTask(() => {
          this.screenShareEnabled = enabled;
        });

        if (enabled) {
          const stream = new MediaStream();
          stream.addTrack(screenShareTracks.video);
          if (this.videoEl != null) {
            this.videoEl.srcObject = stream;
            this.videoEl.play();
          }
        } else if (this.videoEl != null) {
          this.videoEl.srcObject = undefined;
        }
      };
      this.screenShareListener(participant);

      if (participant.id === self.id)
        (participant as DyteSelf).addListener('screenShareUpdate', this.screenShareListener);
      else
        this.meeting.participants.joined.addListener(
          'screenShareUpdate',
          this.participantScreenshareUpdate
        );
    }
  }

  private toggleFullScreen = () => {
    if (!this.isFullScreen) {
      requestFullScreen(this.host);
      this.isFullScreen = true;
    } else {
      exitFullSreen();
      this.isFullScreen = false;
    }
  };

  render() {
    const isSelf = this.participant?.id === this.meeting?.self.id;

    const text = this.isFullScreen ? this.t('full_screen.exit') : this.t('full_screen');
    const icon = this.isFullScreen
      ? this.iconPack.full_screen_minimize
      : this.iconPack.full_screen_maximize;

    return (
      <Host class={{ isSelf }}>
        <div key="video-container" id="video-container" class={{ expand: this.videoExpanded }}>
          <video
            ref={(el) => (this.videoEl = el)}
            class={{
              visible: this.screenShareEnabled,
              'fit-in-container': this.participant.supportsRemoteControl,
            }}
            playsInline
            onPlay={() => {
              this.play.emit({
                screenshareParticipant: this.participant,
                participant: this.meeting.self,
              });
            }}
            autoPlay
            muted
            id={`screen-share-video-${this.participant.id}`}
          />
        </div>

        {/* Screen share controls */}
        <div id="controls" key="controls">
          {/* Full screen button */}
          {!this.hideFullScreenButton && !isSelf && isFullScreenSupported() && (
            <dyte-tooltip label={text} iconPack={this.iconPack} t={this.t}>
              <dyte-button
                id="full-screen-btn"
                kind="icon"
                onClick={this.toggleFullScreen}
                title={text}
                iconPack={this.iconPack}
                t={this.t}
              >
                <dyte-icon
                  icon={icon}
                  aria-hidden={true}
                  tabIndex={-1}
                  iconPack={this.iconPack}
                  t={this.t}
                />
              </dyte-button>
            </dyte-tooltip>
          )}
        </div>

        {/* Self screen share view */}
        {isSelf && (
          <div id="self-message" key="self-message">
            <h3>{this.t('screenshare.shared')}</h3>
            <div class="actions">
              {this.meeting != null && (
                <dyte-button
                  variant="danger"
                  onClick={() => {
                    this.meeting.self.disableScreenShare();
                  }}
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-icon
                    icon={this.iconPack.share_screen_stop}
                    slot="start"
                    iconPack={this.iconPack}
                    t={this.t}
                  />
                  {this.t('screenshare.stop')}
                </dyte-button>
              )}
              <dyte-button
                variant="secondary"
                id="expand-btn"
                iconPack={this.iconPack}
                t={this.t}
                onClick={() => {
                  this.videoExpanded = !this.videoExpanded;
                }}
              >
                <dyte-icon
                  icon={
                    this.videoExpanded
                      ? this.iconPack.full_screen_minimize
                      : this.iconPack.full_screen_maximize
                  }
                  slot="start"
                  iconPack={this.iconPack}
                  t={this.t}
                />
                {this.videoExpanded
                  ? this.t('screenshare.min_preview')
                  : this.t('screenshare.max_preview')}
              </dyte-button>
            </div>
          </div>
        )}
        <slot />
      </Host>
    );
  }
}
