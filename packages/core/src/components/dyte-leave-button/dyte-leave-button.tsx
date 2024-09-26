import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { States, Size } from '../../types/props';
import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A button which toggles visilibility of the leave confirmation dialog.
 */
@Component({
  tag: 'dyte-leave-button',
  styleUrl: 'dyte-leave-button.css',
  shadow: true,
})
export class DyteLeaveButton {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private leave = () => {
    this.stateUpdate.emit({ activeLeaveConfirmation: true });
    DyteUIKitStore.state.activeLeaveConfirmation = true;
  };

  render() {
    const text = this.t('leave');

    return (
      <Host label={text}>
        <dyte-controlbar-button
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          class="leave red-icon"
          onClick={this.leave}
          icon={this.iconPack.call_end}
          label={text}
          variant={this.variant}
          part="controlbar-button"
        />
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
