import { Component, Event, EventEmitter, Prop, State, h, Host, writeTask } from '@stencil/core';
import { DyteI18n, DyteUIKitStore, IconPack, defaultIconPack, useLanguage } from '../../exports';
import gracefulStorage from '../../utils/graceful-storage';
import { MAX_TEXT_LENGTH } from '../../utils/chat';
import { updateComponentProps } from '../../utils/component-props';

export type NewMessageEvent =
  | {
      type: 'text';
      message: string;
    }
  | {
      type: 'file';
      file: File;
    }
  | {
      type: 'image';
      image: File;
    };

const messageLimits = {
  messagesSent: 0,
  startTime: 0,
};

/**
 * A component which renders a chat composer
 */
@Component({
  tag: 'dyte-chat-composer-view',
  styleUrl: 'dyte-chat-composer-view.css',
  shadow: true,
})
export class DyteChatComposerView {
  private componentPropsCleanupFn: () => void = () => {};
  /** Whether user can send text messages */
  @Prop() canSendTextMessage = true;

  /** Whether user can send file messages */
  @Prop() canSendFiles = true;

  /** Message to be pre-populated */
  @Prop() message: string = '';

  /** Quote message to be displayed */
  @Prop() quotedMessage: string = '';

  /** Key for storing message in localStorage */
  @Prop() storageKey: string = 'dyte-text-message';

  /** Placeholder for text input */
  @Prop() inputTextPlaceholder: string = 'Enter your message';

  /** Sets composer to edit mode */
  @Prop() isEditing: boolean = false;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Max length for text input */
  @Prop() maxLength: number;

  /** Whether to show emoji picker */
  @Prop() disableEmojiPicker? = false;

  /** Rate limits */
  @Prop() rateLimits = {
    period: 60,
    maxInvocations: 60,
  };

  @State() fileToUpload = null;

  @State() isEmojiPickerOpen = false;

  @State() disableSendButton = false;

  @State() rateLimitsBreached = false;

  /** Event emitted when new message is submitted */
  @Event({ eventName: 'newMessage' }) onNewMessage: EventEmitter<NewMessageEvent>;

  /** Event emitted when message is edited */
  @Event({ eventName: 'editMessage' }) onEditMessage: EventEmitter<string>;

  /** Event emitted when message editing is cancelled */
  @Event({ eventName: 'editCancel' }) onEditCancel: EventEmitter<void>;

  /** Event emitted when quoted message is dismissed */
  @Event({ eventName: 'quotedMessageDismiss' }) onQuotedMessageDismiss: EventEmitter<void>;

  private textMessage: string = '';

  private $textComposer: HTMLDyteTextComposerViewElement;

  constructor() {
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
  }

  connectedCallback() {
    this.textMessage = this.message || gracefulStorage.getItem(this.storageKey) || '';
    this.checkRateLimitBreached(Date.now());
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
  componentWillUpdate() {
    this.textMessage = this.message || gracefulStorage.getItem(this.storageKey) || '';
  }

  componentDidLoad() {
    if (this.message) {
      writeTask(() => this.$textComposer.setText(this.message, true));
    }
  }

  private sendFile = () => {
    if (!this.canSendFiles) {
      return;
    }

    if (this.fileToUpload.type === 'image') {
      this.onNewMessage.emit({
        type: 'image',
        image: this.fileToUpload.file,
      });
    } else {
      this.onNewMessage.emit({ type: 'file', file: this.fileToUpload.file });
    }

    this.fileToUpload = null;
  };

  private handleSendMessage = () => {
    if (!this.canSendTextMessage || this.rateLimitsBreached) {
      return;
    }
    if (this.fileToUpload !== null) {
      this.sendFile();
      return;
    }

    const message = this.textMessage;
    const currentTime = Date.now();
    if (currentTime - messageLimits.startTime > this.rateLimits.period * 1000) {
      messageLimits.startTime = currentTime;
      messageLimits.messagesSent = 0;
    }

    messageLimits.messagesSent += 1;
    this.checkRateLimitBreached(currentTime);

    if (message.length > 0) {
      if (this.quotedMessage.length !== 0) {
        this.onNewMessage.emit({
          type: 'text',
          message,
        });
      } else {
        this.onNewMessage.emit({ type: 'text', message });
      }

      this.cleanup();
    }
  };

  private checkRateLimitBreached(currentTime: number) {
    // Check if the function call is within limits
    if (messageLimits.messagesSent >= this.rateLimits.maxInvocations) {
      this.disableSendButton = true;
      this.rateLimitsBreached = true;
      const timeRemainingForReset =
        currentTime - messageLimits.startTime + this.rateLimits.period * 1000;
      setTimeout(() => {
        messageLimits.messagesSent = 0;
        messageLimits.startTime = Date.now();
        this.disableSendButton = false;
        this.rateLimitsBreached = false;
      }, timeRemainingForReset);
    }
  }

  private handleEditMessage = () => {
    this.onEditMessage.emit(this.textMessage);
    this.cleanup();
  };

  private handleEditCancel = () => {
    this.onEditCancel.emit();
    this.cleanup();
  };

  private onTextChangeHandler = (event: CustomEvent) => {
    this.textMessage = event.detail;
    if (this.textMessage.length >= (this.maxLength ?? MAX_TEXT_LENGTH)) {
      this.disableSendButton = true;
    } else if (this.disableSendButton) {
      this.disableSendButton = false;
    }
    gracefulStorage.setItem(this.storageKey, event.detail);
  };

  private onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey) {
      return;
    }
    if (this.disableSendButton) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.isEditing) {
        this.handleEditMessage();
      } else {
        this.handleSendMessage();
      }
    }
  };

  private onFileUploadHandler = (type: string, file: File) => {
    this.fileToUpload = { type, file };
  };

  private onQuotedMessageDismissHandler = () => {
    this.onQuotedMessageDismiss.emit();
  };

  private cleanup = () => {
    this.textMessage = '';
    this.fileToUpload = null;
    gracefulStorage.setItem(this.storageKey, '');
    this.$textComposer.setText('', true);
    this.isEmojiPickerOpen = false;
  };

  render() {
    const uiProps = { iconPack: this.iconPack, t: this.t };
    return (
      <Host>
        {this.canSendTextMessage && this.isEmojiPickerOpen && (
          <dyte-emoji-picker
            part="emoji-picker"
            onPickerClose={() => {
              this.isEmojiPickerOpen = false;
            }}
            onDyteEmojiClicked={(e) => {
              this.textMessage += e.detail;
              this.$textComposer.setText(this.textMessage, true);
            }}
            {...uiProps}
          />
        )}
        <slot name="chat-addon"></slot>
        {this.quotedMessage && this.quotedMessage.length !== 0 && (
          <div class="quoted-message-container" part="quoted-message-container">
            <div class="quoted-message scrollbar">
              <dyte-text-message-view text={this.quotedMessage} isMarkdown></dyte-text-message-view>
            </div>
            <div>
              <dyte-icon
                aria-label={this.t('dismiss')}
                class="dismiss"
                icon={this.iconPack.dismiss}
                onClick={this.onQuotedMessageDismissHandler}
                {...uiProps}
              />
            </div>
          </div>
        )}
        <div class="composer-container">
          <div class="composers">
            {this.fileToUpload && (
              <dyte-draft-attachment-view
                {...uiProps}
                attachment={this.fileToUpload}
                onDeleteAttachment={() => (this.fileToUpload = null)}
              ></dyte-draft-attachment-view>
            )}
            {!this.fileToUpload && (
              <dyte-text-composer-view
                value={this.textMessage}
                placeholder={this.inputTextPlaceholder}
                onTextChange={this.onTextChangeHandler}
                keyDownHandler={this.onKeyDownHandler}
                maxLength={this.maxLength ?? MAX_TEXT_LENGTH}
                rateLimitBreached={this.rateLimitsBreached}
                t={this.t}
                iconPack={this.iconPack}
                ref={(el) => (this.$textComposer = el)}
              ></dyte-text-composer-view>
            )}
          </div>

          <div class="chat-buttons" part="chat-buttons">
            <div class="left" part="chat-buttons-left">
              {!this.fileToUpload && !this.isEditing && (
                <div>
                  {this.canSendFiles && [
                    <dyte-file-picker-button
                      {...uiProps}
                      onFileChange={(event) => this.onFileUploadHandler('file', event.detail)}
                    ></dyte-file-picker-button>,
                    <dyte-file-picker-button
                      filter="image/*"
                      label={this.t('chat.send_img')}
                      icon="image"
                      onFileChange={(event) => this.onFileUploadHandler('image', event.detail)}
                      {...uiProps}
                    ></dyte-file-picker-button>,
                  ]}
                  {this.canSendTextMessage && !this.disableEmojiPicker && (
                    <dyte-emoji-picker-button
                      isActive={this.isEmojiPickerOpen}
                      onClick={() => {
                        this.isEmojiPickerOpen = !this.isEmojiPickerOpen;
                      }}
                      {...uiProps}
                    ></dyte-emoji-picker-button>
                  )}
                  <slot name="chat-buttons"></slot>
                </div>
              )}
            </div>
            <div class="right" part="chat-buttons-right">
              {!this.isEditing && (
                <dyte-tooltip
                  variant="primary"
                  label={this.t('chat.send_msg')}
                  delay={2000}
                  {...uiProps}
                >
                  <dyte-button
                    kind="icon"
                    disabled={this.disableSendButton}
                    onClick={() => this.handleSendMessage()}
                    title={this.t('chat.send_msg')}
                    {...uiProps}
                  >
                    <dyte-icon icon={this.iconPack.send} />
                  </dyte-button>
                </dyte-tooltip>
              )}
              {this.isEditing && (
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
                      {...uiProps}
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
                      {...uiProps}
                    >
                      <dyte-icon icon={this.iconPack.checkmark} />
                    </dyte-button>
                  </dyte-tooltip>
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
