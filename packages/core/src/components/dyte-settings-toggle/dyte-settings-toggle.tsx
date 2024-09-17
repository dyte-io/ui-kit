import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import storeState from '../../lib/store';

/**
 * A button which toggles visibility of settings module.
 *
 * When clicked it emits a `dyteStateUpdate` event with the data:
 *
 * ```ts
 * { activeSettings: boolean; }
 * ```
 */
@Component({
  tag: 'dyte-settings-toggle',
  styleUrl: 'dyte-settings-toggle.css',
  shadow: true,
})
export class DyteSettingsToggle {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private toggleSettings() {
    this.stateUpdate.emit({
      activeSettings: !this.states?.activeSettings,
      activeMoreMenu: false,
    });
    storeState.activeSettings = !storeState.activeSettings;
    storeState.activeMoreMenu = false;
  }

  render() {
    const text = this.t('settings');

    return (
      <Host title={text}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={() => this.toggleSettings()}
          icon={this.iconPack.settings}
          label={text}
          variant={this.variant}
        />
      </Host>
    );
  }
}
