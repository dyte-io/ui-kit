import { States } from '../../types/props';
import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import storeState from '../../lib/store';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';

/**
 * A text field component.
 */
@Component({
  tag: 'dyte-text-field',
  styleUrl: 'dyte-text-field.css',
  shadow: true,
})
export class DyteTextField {
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
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  connectedCallback() {
    this.stateUpdate.emit({ abc: false });
    storeState.abc = false;
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
}
