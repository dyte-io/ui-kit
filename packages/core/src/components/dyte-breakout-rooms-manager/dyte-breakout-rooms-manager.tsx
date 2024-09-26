import { Component, h, Host, Prop, Event, EventEmitter, State, Watch, Listen } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { States } from '../../types/props';

import { Meeting } from '../../types/dyte-client';
import { participantIdentifier, resetRoomCount } from '../../utils/breakout-rooms';
import { DytePermissionsPreset } from '@dytesdk/web-core';
import BreakoutRoomsManager, { DraftMeeting } from '../../utils/breakout-rooms-manager';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

export type BreakoutManagerState = 'room-config' | 'participants-config';
export type BreakoutRoomConfig = {
  rooms: number; // Number of rooms to be created.
  step: BreakoutManagerState; // State in which manger is.
  mode: 'edit' | 'create'; // Mode in which the modal is used.
  applyingChanges: boolean; // Flag, true when changes are being applied.
};

const MIN_ROOMS = 1;

@Component({
  tag: 'dyte-breakout-rooms-manager',
  styleUrl: 'dyte-breakout-rooms-manager.css',
  shadow: true,
})
export class DyteBreakoutRoomsManager {
  private componentPropsCleanupFn: () => void = () => {};
  private selectorRef: HTMLDivElement;

  private permissions: DytePermissionsPreset['connectedMeetings'];

  /** Flag to indicate busy state */
  @State() loading: boolean = false;

  /** Breakout room config object */
  @State() roomConfig: BreakoutRoomConfig = {
    rooms: 2,
    step: 'room-config',
    mode: 'create',
    applyingChanges: false,
  };

  private stateManager: BreakoutRoomsManager;

  /** draft state */
  @State() draftState: {
    parentMeeting: DraftMeeting;
    meetings: DraftMeeting[];
  };

  /** List of assigned participants */
  // @State() unassignedParticipants: string[] = [];

  /** Flag that tells if participants are being assigned or not */
  @State() assigningParticipants: boolean = false;

  /** List of selected peers */
  @State() selectedParticipants: string[] = [];

  /** update about room changes */
  @State() ephemeralStatusText: string = '';

  /** Flag that tells if participants are being dragged */
  @State() isDragMode: boolean = false;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<Partial<States>>;

  @Watch('selectedParticipants')
  onSelectedParticipantsChanged(participants) {
    if (participants.length > 0) this.assigningParticipants = true;
    else this.assigningParticipants = false;
  }

  connectedCallback() {
    this.permissionsUpdateListener();

    this.meeting.connectedMeetings.on('stateUpdate', this.updateLocalState);
    this.meeting.connectedMeetings.on('changingMeeting', this.close);
    this.meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);

    this.stateManager = new BreakoutRoomsManager();

    this.fetchRoomState();
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.meeting.connectedMeetings.off('stateUpdate', this.updateLocalState);
    this.meeting.connectedMeetings.off('changingMeeting', this.close);
    this.meeting.self.permissions.off('permissionsUpdate', this.permissionsUpdateListener);

    this.componentPropsCleanupFn();
  }

  private permissionsUpdateListener = () => {
    this.permissions = this.meeting.self.permissions.connectedMeetings;
  };

  private async fetchRoomState() {
    this.loading = true;
    await this.meeting.connectedMeetings.getConnectedMeetings();
    this.loading = false;
  }

  private updateLocalState = (payload) => {
    this.stateManager.updateCurrentState(payload);
    this.draftState = this.stateManager.currentState;
    if (this.meeting.connectedMeetings.isActive) {
      this.roomConfig = { ...this.roomConfig, mode: 'edit' };
    }
    if (this.roomConfig.mode === 'create' && !this.meeting.connectedMeetings.isActive) {
      resetRoomCount();
    }

    if (['edit', 'view'].includes(this.roomConfig.mode)) {
      this.roomConfig = {
        ...this.roomConfig,
        rooms: payload.meetings.length,
        step: 'participants-config',
      };
      this.selectedParticipants = [];
    }
  };

  private setEphemeralStatus(text: string) {
    this.ephemeralStatusText = text;
    setTimeout(() => {
      this.ephemeralStatusText = '';
    }, 3000);
  }

  private onCreateRooms() {
    this.selectedParticipants = [];

    this.stateManager.addNewMeetings(this.roomConfig.rooms);
    this.draftState = this.stateManager.currentState;

    // move to next step -> participants-config
    this.roomConfig = { ...this.roomConfig, step: 'participants-config' };
  }

  private onAddNewRoom = () => {
    this.stateManager.addNewMeeting();
    this.draftState = this.stateManager.currentState;
    this.selectorRef.scrollTo({ top: this.selectorRef.scrollHeight, behavior: 'smooth' });
  };

  private onRoomUpdate = (event: CustomEvent) => {
    const { detail } = event;
    this.stateManager.updateMeetingTitle(detail.id, detail.title);
    this.draftState = this.stateManager.currentState;
  };

  private onRoomDelete = (id: string) => {
    const toDelete = this.stateManager.allConnectedMeetings.find((meeting) => meeting.id === id);
    if (toDelete) {
      this.stateManager.deleteMeeting(id);
      this.draftState = this.stateManager.currentState;
    }
  };

  @Listen('participantDelete')
  onParticipantDelete(event: CustomEvent) {
    const { detail } = event;

    const id = participantIdentifier(detail);
    if (id == null) return;

    this.unassignParticipant(id);
  }

  @Listen('participantsDragging')
  toggleDragMode(e: CustomEvent) {
    this.isDragMode = e.detail;
  }

  private assignParticipantsRandomly() {
    if (this.stateManager.unassignedParticipants.length === 0) return;
    this.stateManager.assignParticipantsRandomly();
    this.draftState = this.stateManager.currentState;
    this.setEphemeralStatus(
      this.t('breakout_rooms.ephemeral_status.participants_assigned_randomly')
    );
  }

  private unassignParticipant = (id: string) => {
    this.stateManager.unassignParticipants([id]);
    this.draftState = this.stateManager.currentState;
  };

  private onUnassignAll = () => {
    this.stateManager.unassignAllParticipants();
    this.draftState = this.stateManager.currentState;
  };

  private assignParticipantsToRoom = (destinationMeetingId: string) => {
    if (this.selectedParticipants.length === 0 || this.assigningParticipants == false) return;

    this.stateManager.assignParticipantsToMeeting(this.selectedParticipants, destinationMeetingId);
    this.draftState = this.stateManager.currentState;
    this.selectedParticipants = [];
    this.assigningParticipants = false;
    this.setEphemeralStatus(this.t('breakout_rooms.ephemeral_status.participants_assigned'));
  };

  private async joinRoom(destinationMeetingId: string) {
    const participantId = participantIdentifier(this.meeting.self);
    this.stateManager.assignParticipantsToMeeting([participantId], destinationMeetingId);
    await this.applyChanges();
  }

  private async closeBreakout() {
    this.stateManager.allConnectedMeetings.forEach((meeting) =>
      this.stateManager.deleteMeeting(meeting.id)
    );
    await this.applyChanges();
  }

  private handleClose = (stateUpdate: EventEmitter<Partial<States>>, store: States) => {
    stateUpdate.emit({
      activeBreakoutRoomsManager: {
        active: true,
      },
    });
    store.activeBreakoutRoomsManager = {
      active: true,
    };
  };

  private enableConfirmationModal = (
    modalType: 'start-breakout' | 'close-breakout' = 'start-breakout'
  ) => {
    let activeConfirmationModal: States['activeConfirmationModal'] = {
      active: true,
      header: 'breakout_rooms.confirm_modal.start_breakout.header',
      content: 'breakout_rooms.confirm_modal.start_breakout.content',
      variant: 'primary',
      cancelText: 'breakout_rooms.confirm_modal.start_breakout.cancelText',
      ctaText: 'breakout_rooms.confirm_modal.start_breakout.ctaText',
      onClick: () => this.applyChanges(),
      onClose: this.handleClose,
    };
    if (modalType === 'close-breakout') {
      activeConfirmationModal = {
        active: true,
        header: 'breakout_rooms.confirm_modal.close_breakout.header',
        content: 'breakout_rooms.confirm_modal.close_breakout.content',
        variant: 'danger',
        cancelText: 'cancel',
        ctaText: 'breakout_rooms.confirm_modal.close_breakout.ctaText',
        onClick: () => this.closeBreakout(),
        onClose: this.handleClose,
      };
    }

    this.stateUpdate.emit({
      activeBreakoutRoomsManager: { active: false },
      activeConfirmationModal,
    });
    DyteUIKitStore.state.activeBreakoutRoomsManager = { active: false };
    DyteUIKitStore.state.activeConfirmationModal = activeConfirmationModal;
  };

  private close = () => {
    this.stateManager.discardChanges();
    this.stateUpdate?.emit({
      activeBreakoutRoomsManager: {
        active: false,
      },
    });
    DyteUIKitStore.state.activeBreakoutRoomsManager = { active: false };
  };

  private applyChanges = async () => {
    this.roomConfig = { ...this.roomConfig, applyingChanges: true };
    await this.stateManager.applyChanges(this.meeting);
    this.close();
    this.roomConfig = { ...this.roomConfig, applyingChanges: false };
  };

  @Listen('selectedParticipantsUpdate')
  updateSelectedParticipants(e: CustomEvent) {
    this.selectedParticipants = e.detail;
  }

  @Listen('allParticipantsToggleUpdate')
  updateAllParticipants(e: CustomEvent) {
    this.selectedParticipants = e.detail;
  }

  private getStatusText() {
    if (this.ephemeralStatusText !== '') return this.ephemeralStatusText;
    let statusText = '';

    if (this.roomConfig.mode === 'create') {
      statusText = this.t('breakout_rooms.status.assign_multiple');
      if (this.selectedParticipants.length !== 0) {
        statusText = this.t('breakout_rooms.status.select_room');
      }
    }

    return statusText;
  }

  private getApproxDistribution() {
    const num =
      this.stateManager.unassignedParticipants.length / (this.roomConfig.rooms || MIN_ROOMS);
    return Math.max(MIN_ROOMS, Math.round(num));
  }

  private deselectAll() {
    this.selectedParticipants = [];
  }

  private async discardChanges() {
    this.stateManager.discardChanges();
    await this.fetchRoomState();
    this.setEphemeralStatus(this.t('breakout_rooms.ephemeral_status.changes_discarded'));
  }

  private shouldShowOnlyRoomSwitcher() {
    return this.permissions.canAlterConnectedMeetings === false;
  }

  private getPermittedRooms() {
    if (this.permissions.canAlterConnectedMeetings || this.permissions.canSwitchConnectedMeetings) {
      return this.stateManager.allConnectedMeetings;
    }
    return this.stateManager.allConnectedMeetings.filter(
      (cMeeting) => cMeeting.id === this.meeting.meta.meetingId
    );
  }

  private renderMainRoomMaybe() {
    if (!(this.meeting.connectedMeetings.isActive && this.permissions.canSwitchToParentMeeting)) {
      return null;
    }

    return (
      <dyte-breakout-room-manager
        key={this.stateManager.currentState.parentMeeting['id']}
        assigningParticipants={this.assigningParticipants}
        isDragMode={this.isDragMode}
        meeting={this.meeting}
        mode={this.roomConfig.mode}
        onParticipantsAdd={() =>
          this.assignParticipantsToRoom(this.stateManager.currentState.parentMeeting['id'])
        }
        onRoomJoin={() => this.joinRoom(this.stateManager.currentState.parentMeeting['id'])}
        onUpdate={this.onRoomUpdate}
        states={this.states}
        room={{ ...this.stateManager.currentState.parentMeeting }}
        iconPack={this.iconPack}
        t={this.t}
      />
    );
  }

  private renderRoomSwitcher() {
    return (
      <Host>
        <div class="room-switcher-container">
          <header>
            <dyte-icon icon={this.iconPack.breakout_rooms} />
            <span>{this.t('breakout_rooms.join_breakout_header')}</span>
          </header>
          <div class="rooms" ref={(el) => (this.selectorRef = el)}>
            {this.renderMainRoomMaybe()}
            {this.getPermittedRooms().map((room, idx) => {
              return (
                <dyte-breakout-room-manager
                  key={room['id']}
                  assigningParticipants={this.assigningParticipants}
                  isDragMode={this.isDragMode}
                  defaultExpanded={idx === 0}
                  meeting={this.meeting}
                  mode={this.roomConfig.mode}
                  onDelete={() => this.onRoomDelete(room['id'])}
                  onParticipantsAdd={() => this.assignParticipantsToRoom(room['id'])}
                  onRoomJoin={() => this.joinRoom(room['id'])}
                  states={this.states}
                  room={{ ...room }} // NOTE(ravindra-dyte): this prevents cache
                  iconPack={this.iconPack}
                  t={this.t}
                  allowDelete={false}
                />
              );
            })}
          </div>
        </div>
      </Host>
    );
  }

  private renderLoading() {
    return (
      <Host>
        <div class="loading-content">
          <dyte-spinner size="xl" />
        </div>
      </Host>
    );
  }

  private renderRoomConfig() {
    return (
      <Host>
        <div class="room-config">
          <header>
            <dyte-icon icon={this.iconPack.breakout_rooms} />
            <span>{this.t('breakout_rooms.room_config_header')}</span>
          </header>
          <div class="create-room">
            <p>{this.t('breakout_rooms.num_of_rooms')}</p>
            <dyte-counter
              value={this.roomConfig.rooms}
              minValue={MIN_ROOMS}
              iconPack={this.iconPack}
              t={this.t}
              onValueChange={(val) => {
                this.roomConfig = {
                  ...this.roomConfig,
                  rooms: Math.max(+val.detail, MIN_ROOMS),
                };
              }}
            />
          </div>
          <span class="distribution-hint">
            {`${this.t('breakout_rooms.approx')}${' '}`}{' '}
            <em>
              {this.getApproxDistribution()} {this.t('breakout_rooms.participants_per_room')}
            </em>{' '}
            {this.t('breakout_rooms.division_text')}
          </span>
          <footer>
            <dyte-button
              kind="button"
              iconPack={this.iconPack}
              t={this.t}
              size="lg"
              title={this.t('create')}
              disabled={this.roomConfig.rooms === 0}
              onClick={() => this.onCreateRooms()}
            >
              {this.t('create')}
            </dyte-button>
          </footer>
        </div>
      </Host>
    );
  }

  render() {
    if (this.loading) {
      return this.renderLoading();
    }

    if (this.shouldShowOnlyRoomSwitcher()) {
      return this.renderRoomSwitcher();
    }

    if (this.roomConfig.step === 'room-config') {
      return this.renderRoomConfig();
    }

    // participant config
    return (
      <Host>
        <div class="participant-config-wrapper">
          <div class="participant-config">
            <aside part="menu">
              <header>{this.t('breakout_rooms.assign_participants')}</header>
              <dyte-breakout-room-participants
                meeting={this.meeting}
                iconPack={this.iconPack}
                t={this.t}
                participantIds={this.stateManager.unassignedParticipants.map(participantIdentifier)}
                selectedParticipantIds={this.selectedParticipants}
              >
                <dyte-tooltip
                  label={this.t('breakout_rooms.shuffle_participants')}
                  iconPack={this.iconPack}
                  t={this.t}
                  slot="shuffle-button"
                >
                  <dyte-button
                    disabled={
                      this.roomConfig.mode === 'edit' ||
                      this.stateManager.unassignedParticipants.length === 0
                    }
                    iconPack={this.iconPack}
                    t={this.t}
                    kind="button"
                    variant="secondary"
                    size="md"
                    onClick={() => this.assignParticipantsRandomly()}
                    class="shuffle-button br-primary-btn"
                  >
                    <dyte-icon icon={this.iconPack.shuffle} iconPack={this.iconPack} t={this.t} />
                  </dyte-button>
                </dyte-tooltip>
              </dyte-breakout-room-participants>
              {this.selectedParticipants.length !== 0 && (
                <div class="participants-assign-actions">
                  <span>{`${this.selectedParticipants.length} ${this.t(
                    'breakout_rooms.selected'
                  )}`}</span>
                  <dyte-button
                    disabled={this.roomConfig.mode === 'edit'}
                    iconPack={this.iconPack}
                    t={this.t}
                    kind="button"
                    variant="ghost"
                    size="md"
                    onClick={() => this.deselectAll()}
                    class="deselect-button color-danger"
                  >
                    {this.t('breakout_rooms.deselect')}
                  </dyte-button>
                </div>
              )}
            </aside>

            <div class="assign-rooms">
              <div class="row">
                <p class="row-header">
                  {this.t('breakout_rooms.rooms')} ({this.stateManager.allConnectedMeetings.length})
                </p>

                {!this.assigningParticipants && (
                  <div class="cta-buttons">
                    <dyte-button
                      kind="button"
                      variant="secondary"
                      iconPack={this.iconPack}
                      t={this.t}
                      class="br-primary-btn"
                    >
                      <div onClick={this.onAddNewRoom}>
                        <dyte-icon icon={this.iconPack.add} iconPack={this.iconPack} t={this.t} />
                        {this.t('breakout_rooms.add_room')}
                      </div>
                    </dyte-button>
                    {this.stateManager.allConnectedMeetings.flatMap((m) => m.participants)
                      .length !== 0 && (
                      <dyte-button
                        kind="button"
                        variant="ghost"
                        onClick={this.onUnassignAll}
                        iconPack={this.iconPack}
                        t={this.t}
                      >
                        {this.t('breakout_rooms.unassign_all')}
                      </dyte-button>
                    )}
                  </div>
                )}
              </div>

              <div class="rooms" ref={(el) => (this.selectorRef = el)}>
                {this.renderMainRoomMaybe()}
                {this.getPermittedRooms().map((room, idx) => {
                  return (
                    <dyte-breakout-room-manager
                      key={room['id']}
                      assigningParticipants={this.assigningParticipants}
                      isDragMode={this.isDragMode}
                      defaultExpanded={idx === 0}
                      meeting={this.meeting}
                      mode={this.roomConfig.mode}
                      onDelete={() => this.onRoomDelete(room['id'])}
                      onParticipantsAdd={() => this.assignParticipantsToRoom(room['id'])}
                      onRoomJoin={() => this.joinRoom(room['id'])}
                      onUpdate={this.onRoomUpdate}
                      states={this.states}
                      room={{ ...room }} // NOTE(ravindra-dyte): this prevents cache
                      iconPack={this.iconPack}
                      t={this.t}
                      allowDelete={this.stateManager.allConnectedMeetings.length > MIN_ROOMS}
                    />
                  );
                })}
                <dyte-button
                  kind="button"
                  variant="secondary"
                  iconPack={this.iconPack}
                  t={this.t}
                  onClick={this.onAddNewRoom}
                  class="add-room-jumbo-btn br-secondary-btn"
                >
                  <div>
                    <dyte-icon icon={this.iconPack.add} iconPack={this.iconPack} t={this.t} />
                    <span>{this.t('breakout_rooms.add_room_brief')}</span>
                  </div>
                </dyte-button>
              </div>
            </div>
          </div>
          <div class="participant-config-actions">
            <div
              class={{ 'status-bar': true, 'ephemeral-status': this.ephemeralStatusText !== '' }}
            >
              {this.ephemeralStatusText !== '' && (
                <dyte-icon icon={this.iconPack.checkmark} iconPack={this.iconPack} t={this.t} />
              )}
              {this.getStatusText()}
            </div>
            <div class="breakout-actions">
              {this.roomConfig.mode === 'create' && this.permissions.canAlterConnectedMeetings && (
                <dyte-button
                  size="md"
                  iconPack={this.iconPack}
                  t={this.t}
                  class="start-breakout-button"
                  onClick={() => this.enableConfirmationModal('start-breakout')}
                >
                  {this.t('breakout_rooms.start_breakout')}
                </dyte-button>
              )}
              {this.roomConfig.mode === 'edit' &&
                this.stateManager.hasLocalChanges &&
                this.permissions.canAlterConnectedMeetings && (
                  <dyte-button
                    size="md"
                    iconPack={this.iconPack}
                    t={this.t}
                    class="color-danger"
                    variant="ghost"
                    onClick={() => this.discardChanges()}
                  >
                    {this.t('breakout_rooms.discard_changes')}
                  </dyte-button>
                )}
              {this.roomConfig.mode === 'edit' &&
                this.stateManager.hasLocalChanges &&
                this.permissions.canAlterConnectedMeetings && (
                  <dyte-button
                    size="md"
                    iconPack={this.iconPack}
                    t={this.t}
                    class="update-breakout-button"
                    onClick={this.applyChanges}
                  >
                    {this.t('breakout_rooms.update_breakout')}
                  </dyte-button>
                )}
              {this.roomConfig.mode === 'edit' &&
                !this.stateManager.hasLocalChanges &&
                this.permissions.canAlterConnectedMeetings && (
                  <dyte-button
                    size="md"
                    iconPack={this.iconPack}
                    t={this.t}
                    class="close-breakout-button"
                    onClick={() => this.enableConfirmationModal('close-breakout')}
                  >
                    {this.t('breakout_rooms.close_breakout')}
                  </dyte-button>
                )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
