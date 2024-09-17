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
  tag: 'dyte-overlay-modal',
  styleUrl: 'dyte-overlay-modal.css',
  shadow: true,
})
export class DyteOverlayModal {
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
    if (this.states.activeOverlayModal.timeout) {
      setTimeout(() => {
        this.stateUpdate.emit({ activeOverlayModal: { active: false } });
        storeState.activeOverlayModal = { active: false };
      }, this.states.activeOverlayModal.timeout);
    }
  }

  componentDidLoad() {}

  disconnectedCallback() {}

  render() {
    return (
      <Host>
        <dyte-icon icon={this.states.activeOverlayModal.icon} iconPack={this.iconPack} t={this.t} />
        <h2>{this.states.activeOverlayModal.title}</h2>
        <p>{this.states.activeOverlayModal.description}</p>
      </Host>
    );
  }
}
