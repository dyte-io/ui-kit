import { Component, Host, h, Prop } from '@stencil/core';
import { defaultConfig, defaultIconPack, IconPack, UIConfig } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import { Meeting } from '../../types/dyte-client';
import { SyncWithStore } from '../../utils/sync-with-store';
import { Size, States } from '../../types/props';

/**
 * A component that houses all the header components.
 *
 * @slot - Default slot
 */
@Component({
  tag: 'dyte-header',
  styleUrl: 'dyte-header.css',
  shadow: true,
})
export class DyteHeader {
  /** Variant */
  @Prop({ reflect: true }) variant: 'solid' | 'boxed' = 'solid';

  /** Whether to render the default UI */
  @Prop() disableRender = false;

  /** Meeting */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** States */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Icon Pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

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
        {!this.disableRender && <Render element="dyte-header" defaults={defaults} onlyChildren />}
        <slot />
      </Host>
    );
  }
}
