import { Component, Event, EventEmitter, h, Listen, Prop, State, Watch } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { DyteI18n, IconPack, States } from '../../exports';
import { uiState, uiStore } from '../../utils/sync-with-store/ui-store';
import deepMerge from 'lodash-es/merge';

@Component({
  tag: 'dyte-ui-provider',
})
export class DyteUiProvider {
  /** Meeting */
  @Prop()
  meeting: Meeting;

  /** Icon pack */
  @Prop()
  iconPack: IconPack;

  /** Language utility */
  @Prop()
  t: DyteI18n;

  /**
   * Do not render children until meeting is initialized
   * @default false
   */
  @Prop() noRenderUntilMeeting: boolean = false;

  @State() states: States;

  /** States */
  @Event({ eventName: 'dyteStatesUpdate' }) statesUpdate: EventEmitter<States>;

  @Listen('dyteStateUpdate')
  listenState(e: CustomEvent<States>) {
    this.updateStates(e.detail);
  }

  private updateStates(states: Partial<States>) {
    const newStates = Object.assign({}, uiState.states);
    uiState.states = deepMerge(newStates, states);
    this.statesUpdate.emit(uiState.states);
  }

  connectedCallback() {
    this.onMeetingChange(this.meeting);
    this.onIconPackChange(this.iconPack);
    this.onTChange(this.t);
  }

  @Watch('meeting')
  onMeetingChange(newMeeting: Meeting) {
    uiStore.state.meeting = newMeeting;
  }

  @Watch('iconPack')
  onIconPackChange(newIconPack: IconPack) {
    uiStore.state.iconPack = newIconPack;
  }

  @Watch('t')
  onTChange(newT: DyteI18n) {
    uiStore.state.t = newT;
  }

  render() {
    if (this.noRenderUntilMeeting && !this.meeting) {
      return null;
    }

    return <slot />;
  }
}
