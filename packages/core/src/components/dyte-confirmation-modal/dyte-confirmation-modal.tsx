import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import storeState from '../../lib/store';

/**
 * A confirmation modal.
 */
@Component({
  tag: 'dyte-confirmation-modal',
  styleUrl: 'dyte-confirmation-modal.css',
  shadow: true,
})
export class DyteConfirmationModal {
  private keyPressListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    document.addEventListener('keydown', this.keyPressListener);
  }

  componentDidLoad() {}

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keyPressListener);
  }

  private close = () => {
    this.states.activeConfirmationModal.onClose(this.stateUpdate, storeState, this.meeting);
    this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
    storeState.activeConfirmationModal = { active: false };
  };

  private onConfirmation = async () => {
    this.states.activeConfirmationModal.onClick(this.stateUpdate, storeState, this.meeting);
    this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
    storeState.activeConfirmationModal = { active: false };
  };

  render() {
    const state = this.states.activeConfirmationModal;

    return (
      <Host>
        <div class="leave-modal">
          <div class="header">
            <h2 class="title">
              {state.header ? this.t(state.header) : this.t('cta.confirmation')}
            </h2>
          </div>
          <p class="message">{state.content ? this.t(state.content) : ''}</p>
          <div class="content">
            <div class="leave-meeting">
              <dyte-button
                variant="secondary"
                title={state.cancelText ? this.t(state.cancelText) : this.t('cancel')}
                onClick={this.close}
                iconPack={this.iconPack}
                t={this.t}
                class="br-secondary-btn"
              >
                {state.cancelText ? this.t(state.cancelText) : this.t('cancel')}
              </dyte-button>
              <dyte-button
                onClick={() => this.onConfirmation()}
                variant={this.states.activeConfirmationModal?.variant ?? 'danger'}
                title={state.ctaText ? this.t(state.ctaText) : this.t('yes')}
                iconPack={this.iconPack}
                t={this.t}
              >
                {state.ctaText ? this.t(state.ctaText) : this.t('yes')}
              </dyte-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
