import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';

/**
 * A menu list component.
 *
 * @slot - Default slot
 */
@Component({
  tag: 'dyte-menu-list',
  styleUrl: 'dyte-menu-list.css',
  shadow: true,
})
export class DyteMenuList {
  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
