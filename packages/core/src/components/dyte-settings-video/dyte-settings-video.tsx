import { Component, Host, h, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';
import { Meeting, Peer } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { getPreference, setPreference } from '../../utils/user-prefs';
import { SyncWithStore } from '../../utils/sync-with-store';
import storeState from '../../lib/store';

/**
 * A component which lets to manage your camera devices and your video preferences.
 *
 * Emits `dyteStateUpdate` event with data for toggling mirroring of self video:
 * ```ts
 * {
 *  prefs: {
 *    mirrorVideo: boolean
 *  }
 * }
 * ```
 */
@Component({
  tag: 'dyte-settings-video',
  styleUrl: 'dyte-settings-video.css',
  shadow: true,
})
export class DyteSettingsVideo {
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  @State() videoEnabled: boolean;

  /** Emits updated state */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  componentDidLoad() {
    this.meetingChanged(this.meeting);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    this.videoEnabled = meeting.self.videoEnabled;
    meeting.self?.addListener('videoUpdate', this.onVideoUpdate);
  }

  disconnectedCallback() {
    this.meeting.self?.removeListener('videoUpdate', this.onVideoUpdate);
  }

  private onVideoUpdate = (videoState: Pick<Peer, 'videoEnabled'>) => {
    this.videoEnabled = videoState.videoEnabled;
  };

  render() {
    if (this.meeting == null) return null;

    const defaults = {
      meeting: this.meeting,
      states: this.states || storeState,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };

    const states = this.states || storeState;
    const initialMirrorPreference =
      states?.prefs?.mirrorVideo === true || getPreference('mirror-video') === 'true';

    return (
      <Host>
        <div class="section" part="tile-preview">
          <div class="group" part="tile-preview">
            {this.videoEnabled === true ? (
              <dyte-participant-tile
                meeting={this.meeting}
                participant={this.meeting?.self}
                iconPack={this.iconPack}
                t={this.t}
                states={states}
                size={this.size}
                isPreview
              />
            ) : (
              <div class="camera-off-helper">
                <dyte-participant-tile
                  meeting={this.meeting}
                  participant={this.meeting?.self}
                  size={this.size}
                >
                  <div>
                    <dyte-icon
                      id="icon"
                      icon={this.iconPack.video_off}
                      tabIndex={-1}
                      aria-hidden={true}
                    />
                    <div>{this.t('settings.camera_off')}</div>
                  </div>
                </dyte-participant-tile>
              </div>
            )}
          </div>
        </div>
        <dyte-camera-selector {...defaults} />
        <div class="group" part="mirror-toggle">
          <div class="row">
            <label htmlFor="mirror-toggle">{this.t('settings.mirror_video')}</label>
            <dyte-switch
              checked={initialMirrorPreference}
              iconPack={this.iconPack}
              t={this.t}
              onDyteChange={(e) => {
                const { checked } = e.target as HTMLDyteSwitchElement;
                this.stateUpdate.emit({ prefs: { mirrorVideo: checked } });
                storeState.prefs = { ...(storeState.prefs ?? {}), mirrorVideo: checked };
                setPreference('mirror-video', checked);
              }}
            />
          </div>
        </div>
      </Host>
    );
  }
}
