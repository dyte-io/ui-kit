import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { getPreference, setPreference } from '../../utils/user-prefs';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

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
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

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

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
