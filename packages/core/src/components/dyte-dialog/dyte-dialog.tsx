import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultConfig } from '../../lib/default-ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';

/**
 * A dialog component.
 */
@Component({
  tag: 'dyte-dialog',
  styleUrl: 'dyte-dialog.css',
  shadow: true,
})
export class DyteDialog {
  /** Whether to show the close button */
  @Prop() hideCloseButton: boolean = false;

  /** Whether Escape key can close the modal */
  @Prop() disableEscapeKey = false;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** UI Config */
  @Prop() config: UIConfig = defaultConfig;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Whether a dialog is open or not */
  @Prop({ reflect: true, mutable: true }) open: boolean = true;

  /** Event emitted when dialog is closed */
  @Event({ eventName: 'dyteDialogClose' }) onClose: EventEmitter;

  connectedCallback() {
    document.addEventListener('keydown', this.keydownListener);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownListener);
  }

  private close = () => {
    this.open = false;
    this.onClose.emit();
  };

  private keydownListener = (e: KeyboardEvent) => {
    if (!this.disableEscapeKey && e.key === 'Escape' && this.open) {
      this.close();
    }
  };

  render() {
    if (!this.open) {
      return null;
    }

    return (
      <Host>
        <div id="dialog" part="container" role="dialog" aria-modal="true">
          <slot />
          {!this.hideCloseButton && (
            <dyte-button
              part="close-button"
              id="dismiss-btn"
              kind="icon"
              variant="ghost"
              onClick={() => this.close()}
              iconPack={this.iconPack}
              t={this.t}
              type="button"
              aria-label={this.t('dialog.close')}
              role="button"
            >
              <dyte-icon icon={this.iconPack.dismiss} iconPack={this.iconPack} t={this.t} />
            </dyte-button>
          )}
        </div>
      </Host>
    );
  }
}
