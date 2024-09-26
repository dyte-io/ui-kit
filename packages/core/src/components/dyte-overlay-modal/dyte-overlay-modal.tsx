import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import { DyteI18n } from '../../lib/lang';
import { IconPack } from '../../lib/icons';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A confirmation modal.
 */
@Component({
  tag: 'dyte-overlay-modal',
  styleUrl: 'dyte-overlay-modal.css',
  shadow: true,
})
export class DyteOverlayModal {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    if (this.states.activeOverlayModal.timeout) {
      setTimeout(() => {
        this.stateUpdate.emit({ activeOverlayModal: { active: false } });
        DyteUIKitStore.state.activeOverlayModal = { active: false };
      }, this.states.activeOverlayModal.timeout);
    }
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  componentDidLoad() {}

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

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
