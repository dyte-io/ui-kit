import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';
import { sanitizeLink } from '../../utils/string';
import { downloadFile } from '../../utils/file';

/**
 * A component which renders an image message.
 */
@Component({
  tag: 'dyte-image-message-view',
  styleUrl: 'dyte-image-message-view.css',
  shadow: true,
})
export class DyteImageMessageView {
  /** Url of the image */
  @Prop() url!: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** preview event */
  @Event({ eventName: 'preview' }) onPreview: EventEmitter<string>;

  @State() status: 'loading' | 'loaded' | 'errored' = 'loading';

  render() {
    return (
      <div class={{ image: true, loaded: this.status === 'loaded' }}>
        <img
          src={sanitizeLink(this.url)}
          onLoad={() => {
            this.status = 'loaded';
          }}
          onError={() => {
            this.status = 'errored';
          }}
          onClick={() => {
            if (this.status === 'loaded') {
              this.onPreview.emit(this.url);
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
                this.onPreview.emit(this.url);
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
              onClick={() => downloadFile(this.url, { fallbackName: 'image' })}
              iconPack={this.iconPack}
              t={this.t}
            >
              <dyte-icon icon={this.iconPack.download} iconPack={this.iconPack} t={this.t} />
            </dyte-button>
          </div>
        )}
      </div>
    );
  }
}
