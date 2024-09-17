import { Component, Prop, h } from '@stencil/core';
import { IconPack, defaultIconPack, DyteI18n, useLanguage } from '../../exports';

@Component({
  tag: 'dyte-emoji-picker-button',
  styleUrl: 'dyte-emoji-picker-button.css',
  shadow: true,
})
export class DyteEmojiPickerButton {
  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Active state indicator */
  @Prop() isActive: boolean;

  render() {
    const uiProps = { iconPack: this.iconPack, t: this.t };
    return (
      <dyte-tooltip label={this.t('chat.send_emoji')} {...uiProps}>
        <dyte-button
          variant="ghost"
          kind="icon"
          class={{ active: this.isActive }}
          title={this.t('chat.send_emoji')}
          iconPack={this.iconPack}
          t={this.t}
        >
          <dyte-icon icon={this.iconPack.emoji_multiple} />
        </dyte-button>
      </dyte-tooltip>
    );
  }
}
