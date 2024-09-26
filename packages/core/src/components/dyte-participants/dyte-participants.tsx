import { IconPack } from '../../lib/icons';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { DyteI18n } from '../../lib/lang';
import { Render } from '../../lib/render';

import { defaultConfig, DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

export type ParticipantsViewMode = 'sidebar';
/**
 * A component which lists all participants, with ability to
 * run privileged actions on each participant according to your permissions.
 */
@Component({
  tag: 'dyte-participants',
  styleUrl: 'dyte-participants.css',
  shadow: true,
})
export class DyteParticipants {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() search: string = '';

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    if (this.meeting == null) return;

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
  }

  private onSearchInput = (e: KeyboardEvent) => {
    this.search = (e.target as HTMLInputElement).value;
  };

  render() {
    const defaults = {
      meeting: this.meeting,
      states: this.states || DyteUIKitStore.state,
      config: this.config,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };
    return (
      <Host>
        <div class="search" part="search">
          <dyte-icon
            icon={this.iconPack.search}
            part="search-icon"
            iconPack={this.iconPack}
            t={this.t}
          />
          <input
            type="search"
            autocomplete="off"
            placeholder={this.t('search')}
            onInput={this.onSearchInput}
            part="search-input"
          />
        </div>
        <slot name="start" />
        <div class="ctr scrollbar" part="container">
          <Render element="dyte-participants-waiting-list" defaults={defaults} />
          <Render element="dyte-participants-stage-queue" defaults={defaults} />
          <Render
            element="dyte-participants-stage-list"
            defaults={defaults}
            props={{ search: this.search }}
          />
          <Render
            element="dyte-participants-viewer-list"
            defaults={defaults}
            props={{ search: this.search }}
          />
        </div>
        <slot name="end" />
      </Host>
    );
  }
}
