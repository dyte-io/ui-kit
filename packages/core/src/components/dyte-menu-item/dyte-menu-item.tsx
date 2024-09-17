import { Size } from '../../types/props';
import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';

/**
 * A menu item component.
 *
 * @slot - Default slot
 * @slot start - Slot for content you want at the start
 * @slot end - Slot for content you want at the end
 */
@Component({
  tag: 'dyte-menu-item',
  styleUrl: 'dyte-menu-item.css',
  shadow: true,
})
export class DyteMenuItem {
  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot name="start" />
        <slot></slot>
        <slot name="end" />
      </Host>
    );
  }
}
