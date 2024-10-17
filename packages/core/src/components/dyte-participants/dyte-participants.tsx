import { defaultIconPack, IconPack } from '../../lib/icons';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import storeState from '../../lib/store';
import { defaultConfig } from '../../exports';

export type ParticipantsViewMode = 'sidebar';

export type ParticipantsTabedViews = 'requests' | 'stage-list' | 'viewer-list';
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
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Default section */
  @Prop() defaultSection: ParticipantsTabedViews = 'stage-list';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() currentTab: ParticipantsTabedViews = this.defaultSection;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() search: string = '';

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (this.meeting == null) return;
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
  }

  private onSearchInput = (e: KeyboardEvent) => {
    this.search = (e.target as HTMLInputElement).value;
  };

  private shouldShowViewersTab = () => {
    return (
      this.meeting?.self?.permissions?.stageEnabled && this.meeting?.meta?.viewType !== 'LIVESTREAM'
    );
  };

  private shouldShowRequestsTab = () => {
    let shouldShowWaitlist = false;
    if (this.meeting.meta.viewType === 'LIVESTREAM') {
      shouldShowWaitlist = false;
    } else {
      shouldShowWaitlist = this.meeting.self.permissions.acceptWaitingRequests;
    }

    return (
      (this.meeting.self.permissions.stageEnabled &&
        this.meeting.self.permissions.acceptStageRequests) ||
      shouldShowWaitlist
    );
  };

  private getTabs = () => {
    const tabs = [];
    if (this.shouldShowRequestsTab()) {
      tabs.push({
        id: 'requests',
        name: 'Requests',
      });
    }
    tabs.push({
      id: 'stage-list',
      name: 'Stage',
    });

    if (this.shouldShowViewersTab()) {
      tabs.push({
        id: 'viewer-list',
        name: 'Viewers',
      });
    }
    return tabs;
  };

  private viewSection = (section: ParticipantsTabedViews) => {
    this.currentTab = section;
    this.stateUpdate.emit({
      participantsTabedView: section,
    });
    storeState.participantsTabedView = this.currentTab;
  };

  render() {
    const defaults = {
      meeting: this.meeting,
      states: this.states || storeState,
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
        <div
          class={`ctr scrollbar ${this.currentTab !== 'requests' ? 'virtualised' : ''}`}
          part="container"
        >
          <dyte-sidebar-ui
            tabs={this.getTabs()}
            currentTab={this.currentTab}
            view="full-screen"
            hideHeader={true}
            hideCloseAction={true}
            style={{ position: 'relative' }}
            onTabChange={(e) => {
              this.viewSection(e.detail as ParticipantsTabedViews);
              e.stopPropagation();
            }}
          >
            {(!defaults.states.participantsTabedView ||
              defaults.states.participantsTabedView === 'stage-list') && (
              <div slot="stage-list" style={{ marginTop: '10px', height: '100%' }}>
                <Render
                  element="dyte-participants-stage-list"
                  defaults={defaults}
                  props={{
                    search: this.search,
                  }}
                />
              </div>
            )}
            {defaults.states.participantsTabedView === 'requests' && (
              <div slot="requests" style={{ marginTop: '10px', height: '100%' }}>
                <Render element="dyte-participants-stage-queue" defaults={defaults} />
                <Render element="dyte-participants-waiting-list" defaults={defaults} />
              </div>
            )}
            {defaults.states.participantsTabedView === 'viewer-list' && (
              <div slot="viewer-list" style={{ marginTop: '10px', height: '100%' }}>
                <Render
                  element="dyte-participants-viewer-list"
                  defaults={defaults}
                  props={{
                    search: this.search,
                    slot: 'viewer-list',
                  }}
                />
              </div>
            )}
          </dyte-sidebar-ui>
        </div>
        <slot name="end" />
      </Host>
    );
  }
}
