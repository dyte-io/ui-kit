import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { getPreference, setPreference } from '../../utils/user-prefs';
import { DyteUIKitStore } from '../../lib/store';

/**
 * A component which lets to manage your audio devices and audio preferences.
 *
 * Emits `dyteStateUpdate` event with data for muting notification sounds:
 * ```ts
 * {
 *  prefs: {
 *    muteNotificationSounds: boolean
 *  }
 * }
 * ```
 */
@Component({
  tag: 'dyte-settings-audio',
  styleUrl: 'dyte-settings-audio.css',
  shadow: true,
})
export class DyteSettingsAudio {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Event updated state */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  render() {
    if (this.meeting == null) return null;

    const defaults = {
      meeting: this.meeting,
      states: this.states || DyteUIKitStore.state,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };

    const states = this.states || DyteUIKitStore.state;
    const initialNotificationSoundsPreference =
      states?.prefs?.muteNotificationSounds === true ||
      getPreference('mute-notification-sounds') === 'true';

    return (
      <Host>
        <dyte-microphone-selector {...defaults}>
          <dyte-audio-visualizer
            participant={this.meeting?.self}
            iconPack={this.iconPack}
            t={this.t}
            slot="indicator"
          />
        </dyte-microphone-selector>

        <dyte-speaker-selector {...defaults} />
        <div class="group" part="notification-toggle">
          <div class="row">
            <label htmlFor="notification-toggle">{this.t('settings.notification_sound')}</label>
            <dyte-switch
              id="notification-toggle"
              checked={!initialNotificationSoundsPreference}
              onDyteChange={(e: CustomEvent<boolean>) => {
                const { checked } = e.target as HTMLDyteSwitchElement;
                const muteNotificationSounds = !checked;
                this.stateUpdate.emit({ prefs: { muteNotificationSounds } });
                DyteUIKitStore.state.prefs = {
                  ...(DyteUIKitStore.state.prefs ?? {}),
                  muteNotificationSounds,
                };
                setPreference('mute-notification-sounds', muteNotificationSounds);
              }}
              iconPack={this.iconPack}
              t={this.t}
            />
          </div>
        </div>
      </Host>
    );
  }
}
