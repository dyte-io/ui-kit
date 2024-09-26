import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { States } from '../../types/props';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component used as a stage that commonly houses
 * the `grid` and `sidebar` components.
 *
 *  @slot - Default slot
 */
@Component({
  tag: 'dyte-stage',
  styleUrl: 'dyte-stage.css',
  shadow: true,
})
export class DyteStage {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
