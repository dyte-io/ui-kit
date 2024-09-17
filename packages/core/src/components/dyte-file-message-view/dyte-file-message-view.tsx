import { Component, Prop, h } from '@stencil/core';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';
import { sanitizeLink } from '../../utils/string';
import { downloadFile, getExtension, getFileSize } from '../../utils/file';

/**
 * A component which renders a file message.
 */
@Component({
  tag: 'dyte-file-message-view',
  styleUrl: 'dyte-file-message-view.css',
  shadow: true,
})
export class DyteFileMessageView {
  /** Name of the file */
  @Prop() name!: string;

  /** Size of the file */
  @Prop() size!: number;

  /** Url of the file */
  @Prop() url!: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <div class="file">
        <dyte-button
          variant="secondary"
          kind="icon"
          iconPack={this.iconPack}
          t={this.t}
          onClick={() =>
            downloadFile(sanitizeLink(this.url), { name: this.name, fallbackName: 'file' })
          }
          part="button"
        >
          <dyte-icon icon={this.iconPack.download} iconPack={this.iconPack} t={this.t} />
        </dyte-button>
        <div class="file-data">
          <div class="name">{this.name}</div>
          <div class="file-data-split">
            <div class="ext">{getExtension(this.name)}</div>
            <span class="divider"></span>
            <div class="size">{getFileSize(this.size)}</div>
          </div>
        </div>
      </div>
    );
  }
}
