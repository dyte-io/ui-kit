import { IconPack } from '../../lib/icons';
import { Meeting } from '../../types/dyte-client';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { DyteI18n } from '../../lib/lang';
import { getAllConnectedParticipants, participantIdentifier } from '../../utils/breakout-rooms';
import type { DyteConnectedMeetings } from '@dytesdk/web-core';
import { formatName, shorten } from '../../utils/string';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

type ConnectedPeer = DyteConnectedMeetings['parentMeeting']['participants'][number];

/**
 * A component which lists all participants, with ability to
 * run privileged actions on each participant according to your permissions.
 */
@Component({
  tag: 'dyte-breakout-room-participants',
  styleUrl: 'dyte-breakout-room-participants.css',
  shadow: true,
})
export class DyteBreakoutRoomParticipants {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Participant ids */
  @Prop() participantIds: string[] = [];

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() search: string = '';

  @State() participantsToShow: ConnectedPeer[] = [];

  /** Emits an event when selected participants are updated */
  @Event({ eventName: 'selectedParticipantsUpdate' }) onSelectedParticipantsUpdate: EventEmitter<
    string[]
  >;

  /** Emits an event when all participants are selected or deselected */
  @Event({ eventName: 'allParticipantsToggleUpdate' }) onAllToggled: EventEmitter<string[]>;

  /** Emits an event when participants are dragged */
  @Event({ eventName: 'participantsDragging' }) onParticipantsDragging: EventEmitter<boolean>;

  /** selected participants */
  @Prop() selectedParticipantIds: string[] = [];

  @State() isDragging: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.searchChanged(this.search);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    if (this.meeting == null) return;

    this.componentPropsCleanupFn();
  }

  private updateSelectedParticipants(participant: ConnectedPeer, selected: boolean) {
    const id = participantIdentifier(participant);
    let selectedParticipants = [];
    if (selected && !this.selectedParticipantIds.includes(id)) {
      selectedParticipants = [...this.selectedParticipantIds, id];
    } else {
      selectedParticipants = [...this.selectedParticipantIds.filter((x) => x !== id)];
    }
    this.onSelectedParticipantsUpdate.emit(selectedParticipants);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    this.getParticipants(this.search);
  }

  @Watch('participantIds')
  participantsChanged() {
    this.getParticipants(this.search);
  }

  @Watch('search')
  searchChanged(search: string) {
    this.getParticipants(search);
  }

  private getParticipants(search: string) {
    const allParticipants = getAllConnectedParticipants(this.meeting);

    this.participantsToShow = allParticipants.filter((participant) => {
      return (
        this.participantIds.includes(participantIdentifier(participant)) &&
        (participant.displayName ?? '').toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  private onSearchInput = (e: KeyboardEvent) => {
    this.search = (e.target as HTMLInputElement).value;
  };

  private onDragStart = (participant: ConnectedPeer) => {
    this.isDragging = true;
    this.onParticipantsDragging.emit(true);
    this.updateSelectedParticipants(participant, true);
  };

  private onDragEnd = (participant: ConnectedPeer) => {
    this.isDragging = false;
    this.onParticipantsDragging.emit(false);
    this.updateSelectedParticipants(participant, false);
  };

  private onClick = (participant: ConnectedPeer) => {
    const selected = this.selectedParticipantIds.includes(participantIdentifier(participant));
    this.updateSelectedParticipants(participant, !selected);
  };

  private onToggleAll = (checked: boolean) => {
    const selectedParticipants = checked ? this.participantsToShow.map(participantIdentifier) : [];
    this.onAllToggled.emit(selectedParticipants);
  };

  private renderPeer(participant: ConnectedPeer) {
    const name = formatName(participant.displayName || '');
    return (
      <div class="peer-ui-container">
        <dyte-avatar
          participant={{
            name: participant.displayName,
            picture: participant.displayPictureUrl,
          }}
          size="sm"
        />
        <p class="name" title={name}>
          {shorten(name, 16)}
          {this.meeting.self.userId === participant.id && ` (${this.t('you')})`}
        </p>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div class="search-wrapper">
          <div class="search" part="search">
            <dyte-icon
              icon={this.iconPack.search}
              part="search-icon"
              iconPack={this.iconPack}
              t={this.t}
              class="search-icon"
            />
            <input
              type="search"
              autocomplete="off"
              placeholder={this.t('search')}
              onInput={this.onSearchInput}
              part="search-input"
            />
          </div>
          <slot name="shuffle-button" />
        </div>
        <div class="header">
          <div class="title-wrapper">
            <span>{this.t('breakout_rooms.main_room')}</span>
            <span class="participant-count">
              (<dyte-icon icon={this.iconPack.people} iconPack={this.iconPack} t={this.t} />
              {this.participantsToShow.length})
            </span>
          </div>
          {this.selectedParticipantIds.length !== 0 && (
            <dyte-tooltip
              label={this.t('breakout_rooms.select_all')}
              iconPack={this.iconPack}
              t={this.t}
            >
              <input
                type="checkbox"
                checked={this.selectedParticipantIds.length === this.participantsToShow.length}
                onChange={(e: any) => this.onToggleAll(!!e.target.checked)}
              />
            </dyte-tooltip>
          )}
        </div>
        <div class="ctr scrollbar" part="container">
          {this.participantsToShow.length > 0 && (
            <ul class="participants" part="participants">
              {this.participantsToShow.map((participant) => (
                <li
                  class={{ 'participant-item': true, dragging: this.isDragging }}
                  onClick={() => this.onClick(participant)}
                  onDragStart={() => this.onDragStart(participant)}
                  onDragEnd={() => this.onDragEnd(participant)}
                  draggable={this.selectedParticipantIds.length === 0}
                  role="listitem"
                  key={participant.id}
                >
                  {this.renderPeer(participant)}
                  {!this.isDragging && (
                    <input
                      type="checkbox"
                      class={{
                        'hide-checkbox': this.selectedParticipantIds.length === 0,
                      }}
                      checked={this.selectedParticipantIds.includes(
                        participantIdentifier(participant)
                      )}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
          {this.participantsToShow.length === 0 && this.search.length > 0 && (
            <div class="empty-message">{this.t('participants.errors.empty_results')}</div>
          )}
          {this.participantsToShow.length === 0 && this.search.length === 0 && (
            <div class="empty-room">
              <dyte-icon
                icon={this.iconPack.people_checked}
                part="search-icon"
                iconPack={this.iconPack}
                t={this.t}
                class="search-icon"
              />
              <p>{this.t('breakout_rooms.all_assigned')}</p>
              <span>{this.t('breakout_rooms.empty_main_room')}</span>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
