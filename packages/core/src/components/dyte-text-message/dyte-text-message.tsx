import type { TextMessage } from '@dytesdk/web-core';
import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { hasOnlyEmojis } from '../../utils/string';
import { ChatHead } from '../dyte-chat/components/ChatHead';
import { TextMessageView } from './components/TextMessage';

/**
 * A component which renders a text message from chat.
 */
@Component({
  tag: 'dyte-text-message',
})
export class DyteTextMessage {
  /** Text message object */
  @Prop() message!: TextMessage;

  /** Date object of now, to calculate distance between dates */
  @Prop() now: Date = new Date();

  /** Whether the message is continued by same user */
  @Prop({ reflect: true }) isContinued: boolean = false;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** show message in bubble */
  @Prop() showBubble: boolean = false;

  render() {
    return (
      <Host>
        {!this.isContinued && (
          <ChatHead name={this.message.displayName} time={this.message.time} now={this.now} />
        )}
        <div
          class={{
            body: true,
            bubble: this.showBubble,
          }}
          part="body"
        >
          <div class={{ text: true, emoji: hasOnlyEmojis(this.message.message) }}>
            <TextMessageView message={this.message.message} />
          </div>
        </div>
      </Host>
    );
  }
}
