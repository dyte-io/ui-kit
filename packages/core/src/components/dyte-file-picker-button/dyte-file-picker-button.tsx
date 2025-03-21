import { Component, Event, Prop, h, EventEmitter } from '@stencil/core';
import { SyncWithStore } from '../../utils/sync-with-store';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';

@Component({
  tag: 'dyte-file-picker-button',
  styleUrl: 'dyte-file-picker-button.css',
  shadow: true,
})
export class DyteFilePickerButton {
  /** File type filter to open file picker with */
  @Prop() filter: string;

  /** Label for tooltip */
  @Prop() label: string;

  /** Icon */
  @Prop() icon: keyof IconPack = 'attach';

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Event when a file is selected for upload */
  @Event({ eventName: 'fileChange' }) onFileChange: EventEmitter<File>;

  private fileInputField: HTMLInputElement;

  connectedCallback() {
    this.fileInputField = document.createElement('input');
  }

  disconnectedCallback() {
    // For GC
    this.fileInputField = undefined;
  }

  private uploadFile = () => {
    const input = this.fileInputField;
    input.type = 'file';

    if (this.filter) {
      input.accept = this.filter;
    }

    input.onchange = (e: InputEvent) => {
      const {
        validity,
        files: [file],
      } = e.target as HTMLInputElement;
      if (validity.valid) {
        this.onFileChange.emit(file);
      }
    };
    input.click();
  };

  render() {
    const label = this.label || this.t('chat.send_file');
    const icon = this.iconPack[this.icon];
    return (
      <dyte-tooltip label={label}>
        <dyte-button variant="ghost" kind="icon" onClick={() => this.uploadFile()} title={label}>
          <dyte-icon icon={icon} />
        </dyte-button>
      </dyte-tooltip>
    );
  }
}
