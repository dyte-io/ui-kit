import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { SyncWithStore } from '../../utils/sync-with-store';

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
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    if (this.states.activeOverlayModal.timeout) {
      setTimeout(() => {
        this.stateUpdate.emit({ activeOverlayModal: { active: false } });
      }, this.states.activeOverlayModal.timeout);
    }
  }

  render() {
    return (
      <Host>
        <dyte-icon icon={this.states.activeOverlayModal.icon} />
        <h2>{this.states.activeOverlayModal.title}</h2>
        <p>{this.states.activeOverlayModal.description}</p>
      </Host>
    );
  }
}
