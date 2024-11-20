import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import storeState from '../../lib/store';
import { Meeting } from '../../types/dyte-client';

@Component({
  tag: 'dyte-debugger-toggle',
  styleUrl: 'dyte-debugger-toggle.css',
  shadow: true,
})
export class DyteDebuggerToggle {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  private toggleDebugger() {
    this.stateUpdate.emit({
      activeDebugger: !this.states?.activeDebugger,
      activeMoreMenu: false,
    });
    storeState.activeDebugger = !storeState.activeDebugger;
    storeState.activeMoreMenu = false;
  }

  render() {
    return (
      <Host title={this.t('Troubleshooting')}>
        <dyte-controlbar-button
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={() => this.toggleDebugger()}
          icon={this.iconPack.debug}
          label={this.t('Troubleshooting')}
          variant={this.variant}
        />
      </Host>
    );
  }
}
