import { Component, Prop, h } from '@stencil/core';
import { SyncWithStore } from '../../utils/sync-with-store';
import { IconPack, defaultIconPack, DyteI18n, useLanguage } from '../../exports';

@Component({
  tag: 'dyte-emoji-picker-button',
  styleUrl: 'dyte-emoji-picker-button.css',
  shadow: true,
})
export class DyteEmojiPickerButton {
  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Active state indicator */
  @Prop() isActive: boolean;

  render() {
    return (
      <dyte-tooltip label={this.t('chat.send_emoji')}>
        <dyte-button
          variant="ghost"
          kind="icon"
          class={{ active: this.isActive }}
          title={this.t('chat.send_emoji')}
        >
          <dyte-icon icon={this.iconPack.emoji_multiple} />
        </dyte-button>
      </dyte-tooltip>
    );
  }
}
