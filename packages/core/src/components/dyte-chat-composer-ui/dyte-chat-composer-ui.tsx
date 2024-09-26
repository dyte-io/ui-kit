import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  writeTask,
  Watch,
} from '@stencil/core';
import { defaultIconPack, DyteUIKitStore, IconPack, Size } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import {
  handleFilesDataTransfer,
  reverse,
  replyBlockPattern,
  extractReplyBlock,
  stripOutReplyBlock,
  MAX_TEXT_LENGTH,
} from '../../utils/chat';
import gracefulStorage from '../../utils/graceful-storage';
import type { DyteBasicParticipant, TextMessage } from '@dytesdk/web-core';
import { updateComponentProps } from '../../utils/component-props';

interface DyteText {
  type: 'text';
  message: string;
  replyTo?: TextMessage;
}
interface DyteImage {
  type: 'image';
  image: File;
  /** @deprecated use 'image' instead */
  file: File;
}
interface DyteFile {
  type: 'file';
  file: File;
}
export type DyteNewMessageEvent = DyteText | DyteImage | DyteFile;

const MENTION_CHAR = '@';
@Component({
  tag: 'dyte-chat-composer-ui',
  styleUrl: 'dyte-chat-composer-ui.css',
  shadow: true,
})
export class DyteChatComposerUi {
  private componentPropsCleanupFn: () => void = () => {};
  private $textArea: HTMLTextAreaElement;

  /** Whether user can send text messages */
  @Prop() canSendTextMessage = false;

  /** Whether user can send file messages */
  @Prop() canSendFiles = false;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Whether to show emoji picker */
  @Prop() disableEmojiPicker? = false;

  /** prefill the composer */
  @Prop() prefill: {
    suggestedReplies?: string[];
    editMessage?: TextMessage;
    replyMessage?: TextMessage;
  } = {};

  /** list of members that can be mentioned */
  @Prop() members?: DyteBasicParticipant[] = [];

  /** channel id */
  @Prop() channelId?: string;

  @State() emojiPickerActive = false;

  @State() mentionQuery: string = '';

  @State() focusedMemberIndex = 0;

  @State() filePreview: string = null;

  /** Event emitted when new message is submitted */
  @Event({ eventName: 'dyteNewMessage' }) onNewMessage: EventEmitter<DyteNewMessageEvent>;

  /** Event emitted when message is edited */
  @Event({ eventName: 'dyteEditMessage' }) onEditMessage: EventEmitter<{
    id: string;
    message: string;
    channelId?: string;
  }>;

  /** Event emitted when message editing is cancelled */
  @Event({ eventName: 'dyteEditCancelled' }) onEditCancelled: EventEmitter;

  private fileReader: FileReader = new FileReader();

  private fileToUpload: DyteImage | DyteFile = null;

  connectedCallback() {
    this.fileReader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        this.filePreview = e.target.result;
      }
    };
    // this.fileReader.onloadstart = () => {};
    // this.fileReader.onloadend = () => {};
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

  @Watch('channelId')
  onChannelChanged() {
    this.mentionQuery = '';
    this.focusedMemberIndex = 0;
    const message = gracefulStorage.getItem(this.storageKey) || '';
    this.$textArea.value = message;
    this.emojiPickerActive = false;
  }

  componentDidRender() {
    if (this.prefill.editMessage || this.prefill.replyMessage) {
      writeTask(() => this.$textArea.focus());
    }
  }

  get storageKey() {
    if (this.channelId) {
      return `dyte-text-message-${this.channelId}`;
    }
    return 'dyte-text-message';
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === MENTION_CHAR && [undefined, ' '].includes(this.$textArea.value.at(-1))) {
      // [undefined, ' '] checks if mention is start of text or start of new word
      this.mentionQuery = MENTION_CHAR;
    }
    if (e.key === 'ArrowDown') {
      this.focusedMemberIndex = Math.min(
        this.focusedMemberIndex + 1,
        this.getFilteredMembers().length - 1
      );
    }
    if (e.key === 'ArrowUp') {
      this.focusedMemberIndex = Math.max(0, this.focusedMemberIndex - 1);
    }
    if (e.key === 'Escape' || (e.key === 'Backspace' && this.mentionQuery === MENTION_CHAR)) {
      this.mentionQuery = '';
    }
    if (['Enter', 'Tab', ' '].includes(e.key) && this.mentionQuery !== '') {
      const member = this.getFilteredMembers()[this.focusedMemberIndex];
      this.onMemberSelect(member);
      e.preventDefault();
      return;
    }
    // slack like typing experience
    if (e.key === 'Enter' && e.shiftKey) {
      const height = this.$textArea.clientHeight;
      if (height < 200) {
        this.$textArea.style.height = this.$textArea.clientHeight + 20 + 'px';
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.prefill.editMessage) {
        this.handleEditMessage();
      } else {
        this.handleSendMessage();
      }
    } else if (e.key === 'Backspace') {
      if (this.$textArea.value.endsWith('\n')) {
        this.$textArea.style.height = this.$textArea.clientHeight - 20 + 'px';
      } else if (this.$textArea.value === '') {
        this.$textArea.style.height = 'auto';
      }
    }
  };

  private handleKeyUp = (_e: KeyboardEvent) => {
    if (this.mentionQuery !== '') {
      const reversed = reverse(this.$textArea.value.trim());
      const query = reversed.substring(0, reversed.indexOf(MENTION_CHAR));
      this.mentionQuery = `${MENTION_CHAR}${reverse(query)}`;
    }
  };

  private onPaste = (e: ClipboardEvent) => {
    const data: DataTransfer = e.clipboardData || (e as any).originalEvent.clipboardData;

    writeTask(() => {
      if (data && data.items && data.items.length > 0) {
        handleFilesDataTransfer(data.items, this.generateFilePreview);
        this.$textArea.value = '';
      }
    });
  };

  private generateFilePreview = (type: 'file' | 'image', file: File) => {
    this.fileToUpload = { type, image: file, file };
    if (type === 'image') {
      this.fileReader.readAsDataURL(file);
    } else if (type === 'file') {
      this.filePreview = file.name;
    }
  };

  private sendFile = () => {
    if (!this.canSendFiles) {
      return;
    }
    if (this.fileToUpload.type === 'image') {
      this.onNewMessage.emit({
        type: 'image',
        file: this.fileToUpload.image,
        image: this.fileToUpload.image,
      });
    } else {
      this.onNewMessage.emit({ type: 'file', file: this.fileToUpload.file });
    }
    this.cleanUpFileUpload();
  };

  private handleSendMessage = () => {
    if (!this.canSendTextMessage) {
      return;
    }
    if (this.fileToUpload !== null) {
      this.sendFile();
      return;
    }

    const message = this.$textArea.value.trim();
    if (message.length > 0) {
      if (this.prefill.replyMessage) {
        this.onNewMessage.emit({
          type: 'text',
          message,
          replyTo: this.prefill.replyMessage,
        });
      } else {
        this.onNewMessage.emit({ type: 'text', message });
      }

      this.cleanup();
    }
  };

  private cleanup = () => {
    this.mentionQuery = '';
    this.focusedMemberIndex = 0;
    this.$textArea.value = '';
    this.$textArea.style.height = 'auto';
    gracefulStorage.setItem(this.storageKey, '');
  };

  private handleEditMessage = () => {
    let editedMessage = this.$textArea.value.trim();
    if (
      this.prefill.editMessage?.message &&
      replyBlockPattern.test(this.prefill.editMessage.message)
    ) {
      // add back the reply block which we stripped out for editing
      const replyBlock = extractReplyBlock(this.prefill.editMessage.message);

      editedMessage = `${replyBlock}\n\n${editedMessage}`;
    }
    this.onEditMessage.emit({
      id: this.prefill.editMessage.id,
      message: editedMessage,
      channelId: this.prefill.editMessage.channelId,
    });
    this.cleanup();
  };

  private handleEditCancel = () => {
    this.onEditCancelled.emit();
    this.cleanup();
  };

  private uploadFile(type: 'file' | 'image') {
    const input = document.createElement('input');
    input.type = 'file';

    if (type === 'image') {
      input.accept = 'image/*';
    }

    input.onchange = (e: InputEvent) => {
      const {
        validity,
        files: [file],
      } = e.target as HTMLInputElement;
      if (validity.valid) {
        this.generateFilePreview(type, file);
      }
    };
    input.click();
  }

  private initializeTextField = (el: HTMLTextAreaElement) => {
    this.$textArea = el;
    const message = gracefulStorage.getItem(this.storageKey) || '';
    this.$textArea.value = message;
  };

  private onMemberSelect = (member: DyteBasicParticipant) => {
    const reversedQuery = reverse(this.mentionQuery);
    const reversed = reverse(this.$textArea.value.trim()).replace(reversedQuery, '');
    this.$textArea.value = reverse(reversed) + `${MENTION_CHAR}${member.name} `;
    this.mentionQuery = '';
    this.focusedMemberIndex = 0;
    writeTask(() => this.$textArea.focus());
  };

  private getFilteredMembers = () => {
    const query = this.mentionQuery.replace(MENTION_CHAR, '');
    return this.members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()));
  };

  private cleanUpFileUpload = () => {
    this.filePreview = null;
    this.fileToUpload = null;
  };

  private renderFilePreview() {
    if (typeof this.filePreview !== 'string') return;
    return (
      <div class="preview-overlay">
        <div class="file-preview">
          <dyte-tooltip label={this.t('chat.cancel_upload')}>
            <dyte-button variant="secondary" kind="icon" onClick={this.cleanUpFileUpload}>
              <dyte-icon icon={this.iconPack.dismiss} />
            </dyte-button>
          </dyte-tooltip>
          {this.fileToUpload.type === 'image' ? (
            <img class="preview-image" src={this.filePreview} />
          ) : (
            <div class="preview-file">
              <span>{this.filePreview}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  private renderSuggestedReplies = () => {
    if (!this.prefill.suggestedReplies) return;
    if (this.prefill.suggestedReplies.length === 0) return;
    return (
      <ul class="suggested-replies scrollbar">
        {this.prefill.suggestedReplies.map((reply) => (
          <dyte-tooltip label={this.t('chat.click_to_send')}>
            <li onClick={() => this.onNewMessage.emit({ type: 'text', message: reply })}>
              {reply}
            </li>
          </dyte-tooltip>
        ))}
      </ul>
    );
  };

  private renderMenu = () => {
    if (this.mentionQuery.length === 0) return;
    const filteredMembers = this.getFilteredMembers();
    if (filteredMembers.length === 0) return;
    return (
      <ul class="member-list scrollbar">
        {filteredMembers.map((member, index) => (
          <li
            class={{ member: true, selected: index === this.focusedMemberIndex }}
            onClick={() => this.onMemberSelect(member)}
            ref={($li) => {
              if (index === this.focusedMemberIndex) {
                writeTask(() => {
                  if ($li)
                    $li.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                });
              }
            }}
          >
            <dyte-avatar
              participant={{
                name: member.name,
                picture: member.picture,
              }}
              size="sm"
            />
            <span>{member.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const uiProps = { iconPack: this.iconPack, t: this.t, size: this.size };
    let defaultValue = '';
    if (this.prefill.editMessage?.message) {
      defaultValue = stripOutReplyBlock(this.prefill.editMessage.message);
    }

    return (
      <Host>
        {this.canSendTextMessage && this.emojiPickerActive && (
          <dyte-emoji-picker
            part="emoji-picker"
            onPickerClose={() => {
              this.emojiPickerActive = false;
            }}
            onDyteEmojiClicked={(e) => {
              this.$textArea.value += e.detail;
              this.$textArea.focus();
            }}
            t={this.t}
          />
        )}
        {this.renderSuggestedReplies()}
        <slot name="chat-addon"></slot>
        <slot name="quote-block"></slot>
        <div class="chat-input" part="chat-input">
          {this.renderMenu()}
          {this.canSendTextMessage && (
            <textarea
              class="scrollbar"
              part="textarea"
              ref={this.initializeTextField}
              autoFocus={true}
              placeholder={this.fileToUpload ? '' : this.t('chat.message_placeholder')}
              value={defaultValue}
              onPaste={this.onPaste}
              maxLength={MAX_TEXT_LENGTH}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
              onInput={(e) => {
                gracefulStorage.setItem(this.storageKey, (e.target as any).value);
              }}
              disabled={!!this.filePreview}
            ></textarea>
          )}
          <div class="chat-buttons" part="chat-buttons">
            <div class="left" part="chat-buttons-left">
              {!this.prefill.editMessage &&
                this.canSendFiles && [
                  <dyte-tooltip label={this.t('chat.send_file')} {...uiProps}>
                    <dyte-button
                      variant="ghost"
                      kind="icon"
                      onClick={() => this.uploadFile('file')}
                      title={this.t('chat.send_file')}
                      iconPack={this.iconPack}
                      t={this.t}
                    >
                      <dyte-icon icon={this.iconPack.attach} />
                    </dyte-button>
                  </dyte-tooltip>,
                  <dyte-tooltip label={this.t('chat.send_img')} {...uiProps}>
                    <dyte-button
                      variant="ghost"
                      kind="icon"
                      onClick={() => this.uploadFile('image')}
                      title={this.t('chat.send_img')}
                      iconPack={this.iconPack}
                      t={this.t}
                    >
                      <dyte-icon icon={this.iconPack.image} />
                    </dyte-button>
                  </dyte-tooltip>,
                ]}
              {!this.prefill.editMessage && this.canSendTextMessage && !this.disableEmojiPicker && (
                <dyte-tooltip label={this.t('chat.send_emoji')} {...uiProps}>
                  <dyte-button
                    variant="ghost"
                    kind="icon"
                    class={{ active: this.emojiPickerActive }}
                    title={this.t('chat.send_emoji')}
                    iconPack={this.iconPack}
                    t={this.t}
                    onClick={() => {
                      this.emojiPickerActive = !this.emojiPickerActive;
                    }}
                  >
                    <dyte-icon icon={this.iconPack.emoji_multiple} />
                  </dyte-button>
                </dyte-tooltip>
              )}
            </div>
            {!!this.filePreview && this.renderFilePreview()}
            {this.canSendTextMessage && (
              <div class="right" part="chat-buttons-right">
                {!this.prefill.editMessage && (
                  <dyte-tooltip
                    variant="primary"
                    label={this.t('chat.send_msg')}
                    delay={2000}
                    {...uiProps}
                  >
                    <dyte-button
                      kind="icon"
                      onClick={() => this.handleSendMessage()}
                      title={this.t('chat.send_msg')}
                      iconPack={this.iconPack}
                      t={this.t}
                    >
                      <dyte-icon icon={this.iconPack.send} />
                    </dyte-button>
                  </dyte-tooltip>
                )}
                {this.prefill.editMessage && (
                  <div class="edit-buttons">
                    <dyte-tooltip
                      variant="secondary"
                      label={this.t('cancel')}
                      delay={2000}
                      {...uiProps}
                    >
                      <dyte-button
                        kind="icon"
                        variant="secondary"
                        onClick={() => this.handleEditCancel()}
                        title={this.t('cancel')}
                        iconPack={this.iconPack}
                        t={this.t}
                      >
                        <dyte-icon icon={this.iconPack.dismiss} />
                      </dyte-button>
                    </dyte-tooltip>
                    <dyte-tooltip
                      variant="primary"
                      label={this.t('chat.update_msg')}
                      delay={2000}
                      {...uiProps}
                    >
                      <dyte-button
                        kind="icon"
                        onClick={() => this.handleEditMessage()}
                        title={this.t('chat.send_msg')}
                        iconPack={this.iconPack}
                        t={this.t}
                      >
                        <dyte-icon icon={this.iconPack.checkmark} />
                      </dyte-button>
                    </dyte-tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
