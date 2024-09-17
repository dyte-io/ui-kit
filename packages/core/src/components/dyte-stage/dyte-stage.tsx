import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { States } from '../../types/props';

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
  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
