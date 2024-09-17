import { Component, Host, h, Prop } from '@stencil/core';
import type { FileMessage } from '@dytesdk/web-core';
import { ChatHead } from '../dyte-chat/components/ChatHead';
import { sanitizeLink } from '../../utils/string';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { downloadFile, getExtension, getFileSize } from '../../utils/file';
import { useLanguage, DyteI18n } from '../../lib/lang';

/**
 * A component which renders a file message from chat.
 */
@Component({
  tag: 'dyte-file-message',
})
export class DyteFileMessage {
  /** Text message object */
  @Prop() message!: FileMessage;

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
    const link = sanitizeLink(this.message.link);

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
          <div class="file">
            <div class="file-data">
              <div class="name">{this.message.name}</div>
              <div class="file-data-split">
                <div class="ext">{getExtension(this.message.name)}</div>
                <span class="divider"></span>
                <div class="size">{getFileSize(this.message.size)}</div>
              </div>
            </div>
            <dyte-button
              variant="secondary"
              kind="icon"
              iconPack={this.iconPack}
              t={this.t}
              onClick={() => downloadFile(link, { name: this.message.name, fallbackName: 'file' })}
              part="button"
            >
              <dyte-icon icon={this.iconPack.download} iconPack={this.iconPack} t={this.t} />
            </dyte-button>
          </div>
        </div>
      </Host>
    );
  }
}
