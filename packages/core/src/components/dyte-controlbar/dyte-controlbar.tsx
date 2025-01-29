import { Component, Host, h, Prop } from '@stencil/core';
import { defaultConfig, defaultIconPack, IconPack, UIConfig } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import { DyteClient } from '../../types/dyte-client';
import { Size, States } from '../../types/props';

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
  /** Variant */
  @Prop({ reflect: true }) variant: 'solid' | 'boxed' = 'solid';

  /** Whether to render the default UI */
  @Prop() disableRender = false;

  /** Meeting */
  @Prop() meeting: DyteClient;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** States */
  @Prop() states: States;

  /** Icon Pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

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
