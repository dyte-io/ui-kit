import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { SyncWithStore } from '../../utils/sync-with-store';
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
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
