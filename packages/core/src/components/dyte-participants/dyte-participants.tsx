import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteClient } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import storeState from '../../lib/store';
import { defaultConfig } from '../../exports';
import { debounce } from 'lodash-es';

export type ParticipantsViewMode = 'sidebar';

export type ParticipantsTabId = 'requests' | 'stage-list' | 'viewer-list';

export type Tab = {
  id: ParticipantsTabId;
  name: string | HTMLElement;
};

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
  @Prop() meeting!: DyteClient;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Default section */
  @Prop() defaultParticipantsTabId: ParticipantsTabId = 'stage-list';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() currentParticipantsTabId: ParticipantsTabId = this.defaultParticipantsTabId;

  @State() tabs: Tab[] = [];

  @State() hasRequests: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() search: string = '';

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (this.meeting == null) return;
    this.meeting.participants.joined.off('participantJoined', this.updateParticipantCountsInTabs);
    this.meeting.participants.joined.off('participantsUpdate', this.updateParticipantCountsInTabs);
    this.meeting.participants.joined.off('participantLeft', this.updateParticipantCountsInTabs);
    this.meeting.participants.joined.off('stageStatusUpdate', this.updateParticipantCountsInTabs);
    this.meeting.stage.off('stageStatusUpdate', this.updateParticipantCountsInTabs);
    this.meeting.participants.waitlisted.off(
      'participantJoined',
      this.updateParticipantCountsInTabs
    );
    this.meeting.participants.waitlisted.off('participantLeft', this.updateParticipantCountsInTabs);
    this.meeting.participants.waitlisted.off(
      'stageStatusUpdate',
      this.updateParticipantCountsInTabs
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: DyteClient) {
    if (meeting == null) return;
    meeting.participants.joined.on('participantJoined', this.updateParticipantCountsInTabs);
    meeting.participants.joined.on('participantsUpdate', this.updateParticipantCountsInTabs);
    meeting.participants.joined.on('participantLeft', this.updateParticipantCountsInTabs);
    meeting.participants.joined.on('stageStatusUpdate', this.updateParticipantCountsInTabs);
    meeting.stage.on('stageStatusUpdate', this.updateParticipantCountsInTabs);
    meeting.participants.waitlisted.on('participantJoined', this.updateParticipantCountsInTabs);
    meeting.participants.waitlisted.on('participantLeft', this.updateParticipantCountsInTabs);
    meeting.participants.waitlisted.on('stageStatusUpdate', this.updateParticipantCountsInTabs);
    this.updateParticipantCountsInTabs();
  }

  @Watch('currentParticipantsTabId')
  currentParticipantsTabIdChanged() {
    storeState.participantsTabId = this.currentParticipantsTabId;
    this.stateUpdate.emit({
      participantsTabId: this.currentParticipantsTabId,
    });
    this.updateParticipantCountsInTabs();
  }

  private updateParticipantCountsInTabs = debounce(() => {
    // totalRequests consist of stage requests & waitlisted ones
    let totalRequests = this.meeting.participants.waitlisted?.size || 0;
    let totalOnStage = 0;
    let totalViewers = 0;

    this.meeting.participants.joined.toArray().forEach((participant) => {
      if (participant.stageStatus === 'ON_STAGE') {
        totalOnStage++;
      }
      if (participant.stageStatus === 'OFF_STAGE') {
        totalViewers++;
      }
      if (participant.stageStatus === 'REQUESTED_TO_JOIN_STAGE') {
        totalRequests++;
        totalViewers++;
      }
      if (participant.stageStatus === 'ACCEPTED_TO_JOIN_STAGE') {
        totalViewers++;
      }
    });

    if (this.meeting.self.stageStatus === 'ON_STAGE') {
      totalOnStage++;
    }
    if (this.meeting.self.stageStatus === 'OFF_STAGE') {
      totalViewers++;
    }
    if (this.meeting.self.stageStatus === 'REQUESTED_TO_JOIN_STAGE') {
      totalRequests++;
      totalViewers++;
    }
    if (this.meeting.self.stageStatus === 'ACCEPTED_TO_JOIN_STAGE') {
      totalViewers++;
    }

    const tabs = [];
    if (this.shouldShowRequestsTab()) {
      tabs.push({
        id: 'requests',
        name: (
          <span>
            {this.t('requests')}&nbsp;
            <span
              class={`tab-participant-count-badge ${totalRequests > 0 ? 'requests-pending' : ''} ${
                this.currentParticipantsTabId === 'requests' ? 'selected-tab' : ''
              }`}
            >
              {totalRequests}
            </span>
          </span>
        ),
      });
    }
    tabs.push({
      id: 'stage-list',
      name: (
        <span>
          {this.t('participants')}&nbsp;
          <span
            class={`tab-participant-count-badge ${
              this.currentParticipantsTabId === 'stage-list' ? 'selected-tab' : ''
            }`}
          >
            {totalOnStage}
          </span>
        </span>
      ),
    });

    if (this.shouldShowViewersTab()) {
      tabs.push({
        id: 'viewer-list',
        name: (
          <span>
            {this.t('viewers')}&nbsp;
            <span
              class={`tab-participant-count-badge ${
                this.currentParticipantsTabId === 'viewer-list' ? 'selected-tab' : ''
              }`}
            >
              {totalViewers}
            </span>
          </span>
        ),
      });
    }
    this.tabs = tabs;
    this.hasRequests = totalRequests > 0;
  });

  private onSearchInput = (e: InputEvent) => {
    this.search = (e.target as HTMLInputElement).value;
  };

  private shouldShowViewersTab = () => {
    return this.meeting?.self?.permissions?.stageEnabled;
  };

  private shouldShowRequestsTab = () => {
    let shouldShowWaitlist = false;
    if (this.meeting.meta.viewType === 'LIVESTREAM') {
      shouldShowWaitlist = false;
    } else {
      shouldShowWaitlist =
        this.meeting.self.config.waitingRoom?.isEnabled &&
        this.meeting.self.permissions.acceptWaitingRequests;
    }

    return (
      (this.meeting.self.permissions.stageEnabled &&
        this.meeting.self.permissions.acceptStageRequests) ||
      shouldShowWaitlist
    );
  };

  private viewSection = (section: ParticipantsTabId) => {
    this.currentParticipantsTabId = section;
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
          class={`ctr scrollbar ${
            this.currentParticipantsTabId !== 'requests' ? 'virtualised' : ''
          }`}
          part="container"
        >
          <dyte-sidebar-ui
            tabs={this.tabs}
            currentTab={this.currentParticipantsTabId}
            view="full-screen"
            hideHeader={true}
            hideCloseAction={true}
            style={{ position: 'relative' }}
            onTabChange={(e) => {
              this.viewSection(e.detail as ParticipantsTabId);
              e.stopPropagation();
            }}
          >
            {(!this.currentParticipantsTabId || this.currentParticipantsTabId === 'stage-list') && (
              <div slot="stage-list" style={{ marginTop: '10px', height: '100%' }}>
                <Render
                  element="dyte-participants-stage-list"
                  defaults={defaults}
                  props={{
                    search: this.search,
                    hideHeader: true,
                  }}
                />
              </div>
            )}
            {this.currentParticipantsTabId === 'requests' && (
              <div slot="requests" style={{ marginTop: '10px', height: '100%' }}>
                {!this.hasRequests && (
                  <div class="no-pending-requests">
                    {this.t('participants.no_pending_requests')}
                  </div>
                )}
                <Render element="dyte-participants-stage-queue" defaults={defaults} />
                <Render element="dyte-participants-waiting-list" defaults={defaults} />
              </div>
            )}
            {this.currentParticipantsTabId === 'viewer-list' && (
              <div slot="viewer-list" style={{ marginTop: '10px', height: '100%' }}>
                <Render
                  element="dyte-participants-viewer-list"
                  defaults={defaults}
                  props={{
                    search: this.search,
                    hideHeader: true,
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
