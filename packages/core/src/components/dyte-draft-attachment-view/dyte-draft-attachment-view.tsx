import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { DyteI18n, DyteUIKitStore, IconPack } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which renders the draft attachment to send
 */
@Component({
  tag: 'dyte-draft-attachment-view',
  styleUrl: 'dyte-draft-attachment-view.css',
  shadow: true,
})
export class DyteDraftAttachmentView {
  private componentPropsCleanupFn: () => void = () => {};
  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Attachment to display */
  @Prop() attachment: {
    type: 'image' | 'file';
    file: File;
  } = null;

  @State() filePreview: string = null;

  /** Event triggered when the attachment is deleted */
  @Event({ eventName: 'deleteAttachment' }) onDeleteAttachment: EventEmitter;

  private fileReader: FileReader = new FileReader();

  @Watch('attachment')
  onAttachmentChange() {
    this.generatePreview();
  }

  connectedCallback() {
    this.fileReader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        this.filePreview = e.target.result;
      }
    };
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
    // this.fileReader.onloadstart = () => {};
    // this.fileReader.onloadend = () => {};
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

  componentWillLoad() {
    this.onAttachmentChange();
  }

  private generatePreview = () => {
    if (this.attachment.type === 'image') {
      this.fileReader.readAsDataURL(this.attachment.file);
    } else if (this.attachment.type === 'file') {
      this.filePreview = this.attachment.file.name;
    }
  };

  private onDeleteClickHandler = () => {
    this.filePreview = null;
    this.onDeleteAttachment.emit();
  };

  render() {
    return (
      <Host>
        <div class="preview-overlay">
          <div class="preview">
            <dyte-tooltip label={this.t('chat.cancel_upload')}>
              <dyte-button variant="secondary" kind="icon" onClick={this.onDeleteClickHandler}>
                <dyte-icon icon={this.iconPack.dismiss} />
              </dyte-button>
            </dyte-tooltip>
            {this.attachment.type === 'image' ? (
              <img class="preview-image" src={this.filePreview} />
            ) : (
              <div class="preview-file">
                <span>{this.filePreview}</span>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
