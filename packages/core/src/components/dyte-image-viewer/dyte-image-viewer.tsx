import type { ImageMessage } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size } from '../../types/props';
import { downloadFile } from '../../utils/file';
import { SyncWithStore } from '../../utils/sync-with-store';
import { formatName, shorten } from '../../utils/string';

/**
 * A component which shows an image sent via chat.
 */
@Component({
  tag: 'dyte-image-viewer',
  styleUrl: 'dyte-image-viewer.css',
  shadow: true,
})
export class DyteImageViewer {
  /** Image message */
  @Prop() image!: ImageMessage;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Emitted when viewer should be closed */
  @Event() close: EventEmitter<void>;

  connectedCallback() {
    document.addEventListener('keydown', this.keypressListener);
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keypressListener);
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private keypressListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close.emit();
    }
  };

  private handleOutsideClick = () => this.close.emit();

  render() {
    return (
      <Host class="scrollbar" onClick={(e) => e.stopPropagation()}>
        <div class="header">
          <div class="shared-by-user">
            {this.t('chat.img.shared_by')}{' '}
            <span class="displayName">{formatName(shorten(this.image.displayName))}</span>
          </div>
          <div class="actions">
            <dyte-button onClick={() => downloadFile(this.image.link, { fallbackName: 'image' })}>
              <dyte-icon icon={this.iconPack.download} slot="start" />
              Download
            </dyte-button>
            <dyte-button kind="icon" variant="secondary" onClick={() => this.close.emit()}>
              <dyte-icon icon={this.iconPack.dismiss} />
            </dyte-button>
          </div>
        </div>
        <div class="image-ctr">
          <img src={this.image.link} />
        </div>
      </Host>
    );
  }
}
