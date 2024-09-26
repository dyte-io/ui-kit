import { Component, Prop, h } from '@stencil/core';
import { IconPack, DyteI18n, DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-emoji-picker-button',
  styleUrl: 'dyte-emoji-picker-button.css',
  shadow: true,
})
export class DyteEmojiPickerButton {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

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

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
