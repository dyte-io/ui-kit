import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import type { ImageMessage } from '@dytesdk/web-core';
import { ChatHead } from '../dyte-chat/components/ChatHead';
import { sanitizeLink } from '../../utils/string';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { downloadFile } from '../../utils/file';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { States } from '../../types/props';
import storeState from '../../lib/store';

/**
 * A component which renders an image message from chat.
 */
@Component({
  tag: 'dyte-image-message',
  styleUrl: 'dyte-image-message.css',
})
export class DyteImageMessage {
  /** Text message object */
  @Prop() message!: ImageMessage;

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

  @State() status: 'loading' | 'loaded' | 'errored' = 'loading';

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

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
          <div class={{ image: true, loaded: this.status === 'loaded' }}>
            <img
              src={sanitizeLink(this.message.link)}
              onLoad={() => {
                this.status = 'loaded';
              }}
              onError={() => {
                this.status = 'errored';
              }}
              onClick={() => {
                if (this.status === 'loaded') {
                  this.stateUpdate.emit({ image: this.message });
                  storeState.image = this.message;
                }
              }}
            />
            {this.status === 'loading' && (
              <div
                class="image-spinner"
                title={this.t('chat.img.loading')}
                aria-label={this.t('chat.img.loading')}
              >
                <dyte-spinner iconPack={this.iconPack} t={this.t} />
              </div>
            )}
            {this.status === 'errored' && (
              <div
                class="image-errored"
                title={this.t('chat.error.img_not_found')}
                aria-label={this.t('chat.error.img_not_found')}
              >
                <dyte-icon icon={this.iconPack.image_off} iconPack={this.iconPack} t={this.t} />
              </div>
            )}
            {this.status === 'loaded' && (
              <div class="actions">
                <dyte-button
                  class="action"
                  variant="secondary"
                  kind="icon"
                  onClick={() => {
                    this.stateUpdate.emit({ image: this.message });
                    storeState.image = this.message;
                  }}
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-icon icon={this.iconPack.full_screen_maximize} />
                </dyte-button>
                <dyte-button
                  class="action"
                  variant="secondary"
                  kind="icon"
                  onClick={() => downloadFile(this.message.link, { fallbackName: 'image' })}
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-icon icon={this.iconPack.download} iconPack={this.iconPack} t={this.t} />
                </dyte-button>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
