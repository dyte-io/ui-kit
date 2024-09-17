import { Component, Host, h, Prop, State, Element, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, DyteI18n, IconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Size } from '../../types/props';
import type { Message } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-chat-message',
  styleUrl: 'dyte-chat-message.css',
  shadow: true,
})
export class DyteChatMessage {
  @Element() $el: HTMLDyteChatMessageElement;

  /**
   * message item
   */
  @Prop() message: Message;

  /**
   * is continued
   */
  @Prop() isContinued: boolean;

  /**
   * Child
   */
  @Prop() child: HTMLElement;

  /**
   * is unread
   */
  @Prop() isUnread: boolean;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** if sender is self */
  @Prop() isSelf = false;

  /** can edit message */
  @Prop() canEdit = false;

  /** can delete message */
  @Prop() canDelete = false;

  /** can quote reply this message */
  @Prop() canReply = false;

  /** can pin this message */
  @Prop() canPin = false;

  /** disables controls */
  @Prop() disableControls = false;

  /** aligns message to right */
  @Prop() alignRight: boolean = false;

  /** sender display picture url */
  @Prop() senderDisplayPicture: string;

  /** hides avatar */
  @Prop() hideAvatar: boolean = false;

  @State() now: Date = new Date();

  /** Event for when edit is clicked on a message */
  @Event() edit: EventEmitter<Message>;

  /** Event for when reply is clicked on a message */
  @Event() reply: EventEmitter<Message>;

  /** Event for when pin is clicked on a message */
  @Event() pin: EventEmitter<Message>;

  /** Event for when edit is clicked on a message */
  @Event() delete: EventEmitter<Message>;

  /** Whether to left align the chat bubbles */
  @Prop() leftAlign = false;

  private renderMessage = () => {
    switch (this.message.type) {
      case 'text':
        return (
          <div is-continued={this.isContinued} key={this.message.id}>
            {this.isUnread && (
              <div class="new-chat-marker" part="new-chat-marker">
                {this.t('chat.new')}
              </div>
            )}
            <dyte-text-message
              message={this.message}
              now={this.now}
              isContinued={this.isContinued}
              data-timestamp={this.message.time.getTime()}
              iconPack={this.iconPack}
              t={this.t}
              showBubble={true}
            />
          </div>
        );
      case 'image':
        return (
          <div is-continued={this.isContinued} key={this.message.id}>
            {this.isUnread && (
              <div class="new-chat-marker" part="new-chat-marker">
                {this.t('chat.new')}
              </div>
            )}
            <dyte-image-message
              message={this.message}
              now={this.now}
              isContinued={this.isContinued}
              iconPack={this.iconPack}
              data-timestamp={this.message.time.getTime()}
              t={this.t}
              showBubble={true}
            />
          </div>
        );
      case 'file':
        return (
          <div is-continued={this.isContinued} key={this.message.id}>
            {this.isUnread && (
              <div class="new-chat-marker" part="new-chat-marker">
                {this.t('chat.new')}
              </div>
            )}
            <dyte-file-message
              message={this.message}
              now={this.now}
              isContinued={this.isContinued}
              iconPack={this.iconPack}
              t={this.t}
              data-timestamp={this.message.time.getTime()}
              showBubble={true}
            />
          </div>
        );
      case 'custom':
        this.child.setAttribute('message', JSON.stringify(this.message));
        const node = this.child.cloneNode(true);
        return (
          <div
            is-continued={this.isContinued}
            key={this.message.id}
            ref={(el) => el.appendChild(node)}
          ></div>
        );
    }
  };

  private onReply = () => {
    this.reply.emit(this.message);
  };

  private onPinned = () => {
    this.pin.emit(this.message);
  };

  private onDelete = () => {
    this.delete.emit(this.message);
  };

  private onEdit = async () => {
    this.edit.emit(this.message);
  };

  private isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  private renderControls() {
    if (this.disableControls) return;
    return (
      <dyte-menu placement={this.alignRight ? 'bottom-end' : 'bottom-start'}>
        <button slot="trigger" class="actions">
          <dyte-icon icon={this.iconPack.chevron_down} />
        </button>
        <dyte-menu-list>
          {this.canReply && (
            <dyte-menu-item onClick={this.onReply}>
              <dyte-icon icon={this.iconPack.back} slot="start" />
              {this.t('chat.reply')}
            </dyte-menu-item>
          )}
          {this.canPin && (
            <dyte-menu-item onClick={this.onPinned}>
              <dyte-icon icon={this.iconPack.pin} slot="start" />
              {this.t('pin')}
            </dyte-menu-item>
          )}
          {this.canEdit && (
            <dyte-menu-item onClick={this.onEdit}>
              <dyte-icon icon={this.iconPack.edit} slot="start" />
              {this.t('chat.edit_msg')}
            </dyte-menu-item>
          )}
          {this.canDelete && (
            <dyte-menu-item onClick={this.onDelete}>
              <dyte-icon icon={this.iconPack.delete} slot="start" />
              {this.t('chat.delete_msg')}
            </dyte-menu-item>
          )}
        </dyte-menu-list>
      </dyte-menu>
    );
  }

  private renderAvatar() {
    if (this.hideAvatar) return;

    if (this.isContinued) {
      return <div class="avatar"></div>;
    }

    return (
      <div class="avatar">
        <dyte-avatar
          size="sm"
          participant={{
            name: this.message.displayName,
            picture: this.senderDisplayPicture,
          }}
        ></dyte-avatar>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'message-wrapper': true,
            'align-right': this.alignRight,
            'left-align': this.leftAlign,
          }}
          is-continued={this.isContinued}
        >
          {this.renderAvatar()}
          <div
            class={{
              message: true,
              'show-on-hover': !this.isTouchDevice(),
            }}
            is-continued={this.isContinued}
          >
            {this.renderMessage()}
            {this.renderControls()}
          </div>
        </div>
      </Host>
    );
  }
}
