import { Size } from '../../types/props';
import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { updateComponentProps } from '../../utils/component-props';
import { DyteUIKitStore } from '../..';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type ButtonKind = 'button' | 'icon' | 'wide';

/**
 * A button that follows Dyte's Design System.
 *
 * @slot - Default slot
 * @slot start - Content placed to the start of the button, i.e; left.
 * @slot end - Content placed to the end of the button, i.e; right.
 */
@Component({
  tag: 'dyte-button',
  styleUrl: 'dyte-button.css',
  shadow: true,
})
export class DyteButton {
  private componentPropsCleanupFn: () => void = () => {};
  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Button variant */
  @Prop({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Button type */
  @Prop({ reflect: true }) kind: ButtonKind = 'button';

  /** Whether to reverse order of children */
  @Prop({ reflect: true }) reverse: boolean = false;

  /** Where the button is disabled or not */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Button type */
  @Prop({ reflect: true }) type: HTMLButtonElement['type'] = 'button';

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

  render() {
    return (
      <Host>
        <button part="button" type={this.type} disabled={this.disabled}>
          <span class="start">
            <slot name="start" />
          </span>
          <span class="content" part="content">
            <slot />
          </span>
          <span class="end">
            <slot name="end" />
          </span>
        </button>
      </Host>
    );
  }
}
