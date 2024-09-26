import { Component, Host, h, Prop } from '@stencil/core';
import { defaultConfig, DyteUIKitStore, IconPack, UIConfig } from '../../exports';
import { DyteI18n } from '../../lib/lang';
import { Render } from '../../lib/render';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { updateComponentProps } from '../../utils/component-props';

/**
 * Controlbar component provides you with various designs as variants.
 *
 * @slot - Default slot
 */
@Component({
  tag: 'dyte-controlbar',
  styleUrl: 'dyte-controlbar.css',
  shadow: true,
})
export class DyteControlbar {
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: 'solid' | 'boxed' = 'solid';

  /** Whether to render the default UI */
  @Prop() disableRender = false;

  /** Meeting */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** States */
  @Prop() states: States;

  /** Icon Pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Size */
  @Prop({ reflect: true }) size: Size;

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
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      t: this.t,
      iconPack: this.iconPack,
      size: this.size,
    };

    return (
      <Host>
        {!this.disableRender && (
          <Render element="dyte-controlbar" defaults={defaults} onlyChildren />
        )}
        <slot />
      </Host>
    );
  }
}
