import { States } from '../../types/props';
import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A text field component.
 */
@Component({
  tag: 'dyte-text-field',
  styleUrl: 'dyte-text-field.css',
  shadow: true,
})
export class DyteTextField {
  private componentPropsCleanupFn: () => void = () => {};
  private input: HTMLInputElement;

  /** Input type */
  @Prop() type: string = 'text';

  /** Placeholder text */
  @Prop() placeholder: string = '';

  /** Disabled */
  @Prop() disabled: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  connectedCallback() {
    this.stateUpdate.emit({ abc: false });
    DyteUIKitStore.state.abc = false;
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  get value() {
    return this.input.value;
  }

  render() {
    return (
      <Host>
        <input
          ref={(el) => (this.input = el)}
          type={this.type}
          placeholder={this.placeholder}
          disabled={this.disabled}
        />
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
