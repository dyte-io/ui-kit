import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { elapsedDuration, formatDateTime } from '../../utils/date';
import { IconPack, defaultIconPack } from '../../exports';

export interface MessageAction {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  tag: 'dyte-message-view',
  styleUrl: 'dyte-message-view.css',
  shadow: true,
})
export class DyteMessageView {
  /** List of actions to show in menu */
  @Prop() actions: MessageAction[] = [];

  /** Appearance */
  @Prop() variant: 'plain' | 'bubble' = 'bubble';

  /** Render */
  @Prop() viewType: 'incoming' | 'outgoing' = 'outgoing';

  /** Avatar image url */
  @Prop() avatarUrl: string;

  /** Hides avatar */
  @Prop() hideAvatar: boolean = false;

  /** Author display label */
  @Prop() authorName: string;

  /** Hides author display label */
  @Prop() hideAuthorName: boolean = false;

  /** Hides metadata (time) */
  @Prop() hideMetadata: boolean = false;

  /** Time when message was sent */
  @Prop() time: Date;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** action event */
  @Event({ eventName: 'action' }) onAction: EventEmitter<string>;

  private renderActions() {
    return (
      <dyte-menu placement="top-end" offset={1}>
        <button slot="trigger" class="actions">
          <dyte-icon icon={this.iconPack.chevron_down} />
        </button>
        <dyte-menu-list>
          {this.actions.map((action) => (
            <dyte-menu-item onClick={() => this.onAction.emit(action.id)}>
              {action.icon && <dyte-icon icon={action.icon} slot="start" />}
              {action.label}
            </dyte-menu-item>
          ))}
        </dyte-menu-list>
      </dyte-menu>
    );
  }

  render() {
    return (
      <Host>
        <div class={{ 'message-wrapper': true, [this.viewType]: true }}>
          {!this.hideAvatar && (
            <aside class="avatar" part="avatar">
              <dyte-avatar
                participant={{ name: this.authorName, picture: this.avatarUrl }}
                size="sm"
              />
            </aside>
          )}
          <div class="message" part="message">
            {!this.hideAuthorName && <div class="header">{this.authorName}</div>}
            <div class={{ body: true, bubble: this.variant === 'bubble' }}>
              <slot></slot>
              {!this.hideMetadata && !!this.time && (
                <div class="metadata" title={formatDateTime(this.time)}>
                  {elapsedDuration(this.time, new Date(Date.now()))}
                </div>
              )}
              {this.actions.length !== 0 && this.renderActions()}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
