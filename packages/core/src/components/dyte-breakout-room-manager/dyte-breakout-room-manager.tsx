import { Component, h, Host, Prop, Event, EventEmitter, State, writeTask } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { ConnectedMeetingParticipant, States } from '../../types/props';
import { Meeting } from '../../types/dyte-client';
import { getAllConnectedParticipants, participantIdentifier } from '../../utils/breakout-rooms';
import type { DyteConnectedMeetings, DytePermissionsPreset } from '@dytesdk/web-core';
import { formatName, shorten } from '../../utils/string';
import { SyncWithStore } from '../../utils/sync-with-store';
import { DraftMeeting } from '../../utils/breakout-rooms-manager';

const ROOM_TITLE_MIN_CHARS = 3;

@Component({
  tag: 'dyte-breakout-room-manager',
  styleUrl: 'dyte-breakout-room-manager.css',
  shadow: true,
})
export class DyteBreakoutRoomManager {
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Enable updating participants */
  @Prop() assigningParticipants: boolean;

  /** Mode in which selector is used */
  @Prop() mode: 'edit' | 'create';

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** allow room delete */
  @Prop() allowDelete: boolean = true;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Drag mode */
  @Prop() isDragMode: boolean = false;

  /** Connected Room Config Object */
  @Prop() room: DraftMeeting;

  /** display expanded card by default */
  @Prop() defaultExpanded: boolean = false;

  @State() editingTitleRoomId: string = null;

  @State() newTitle: string = null;

  @State() showExpandedCard: boolean = false;

  @State() glowingCard: boolean = false;

  /** Event for adding a participant */
  @Event({ eventName: 'participantsAdd' }) onParticipantsAdd: EventEmitter<null>;

  /** On Delete event emitter */
  @Event({ eventName: 'participantDelete' }) onParticipantDelete: EventEmitter<{
    customParticipantId: string;
  }>;

  /** Event for joining a room */
  @Event({ eventName: 'roomJoin' }) onRoomJoin: EventEmitter<null>;

  /** Event for deleting room */
  @Event({ eventName: 'delete' }) deleteRoom: EventEmitter<string>;

  /** Event for updating room details */
  @Event({ eventName: 'update' }) updateRoom: EventEmitter<{
    title: string | undefined;
    id: string;
  }>;

  private allParticipants: DyteConnectedMeetings['parentMeeting']['participants'];

  private permissions: DytePermissionsPreset['connectedMeetings'];

  private roomTitle: string;

  private canEditMeetingTitle: boolean;

  private inputTextEl: HTMLInputElement;

  connectedCallback() {
    this.allParticipants = getAllConnectedParticipants(this.meeting);
    this.permissionsUpdateListener();
    this.showExpandedCard = this.defaultExpanded;
    this.roomTitle = this.room.isParent ? this.t('breakout_rooms.main_room') : this.room?.title;
    this.canEditMeetingTitle =
      this.permissions.canAlterConnectedMeetings &&
      !this.room.isParent &&
      !this.meeting.connectedMeetings.isActive; // TODO: remove this once socket supports update meetings

    this.meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);
  }

  disconnectedCallback() {
    this.meeting.self.permissions.off('permissionsUpdate', this.permissionsUpdateListener);
  }

  private permissionsUpdateListener = () => {
    this.permissions = this.meeting.self.permissions.connectedMeetings;
  };

  private reset = () => {
    this.editingTitleRoomId = null;
    this.newTitle = null;
  };

  private onEditClick = () => {
    if (this.editingTitleRoomId) {
      if (this.newTitle.length < ROOM_TITLE_MIN_CHARS) return;
      this.roomTitle = this.newTitle;
      this.updateRoom.emit({
        title: this.newTitle,
        id: this.editingTitleRoomId,
      });
      this.glowCard();
      this.reset();
    } else {
      this.editingTitleRoomId = this.room.id;
      writeTask(() => {
        this.inputTextEl.focus();
        this.inputTextEl.select();
      });
    }
  };

  private onDrop = (e: DragEvent) => {
    if (e.currentTarget instanceof HTMLParagraphElement) {
      e.currentTarget.classList.remove('drop-zone-active');
      this.onAssign();
    }
  };

  private onDragOver = (e: DragEvent) => {
    if (e.currentTarget instanceof HTMLParagraphElement) {
      e.currentTarget.classList.add('drop-zone-active');
      e.preventDefault();
    }
  };

  private onDragLeave(e: DragEvent) {
    if (e.currentTarget instanceof HTMLParagraphElement) {
      e.currentTarget.classList.remove('drop-zone-active');
    }
  }

  private getAssignmentHint() {
    if (this.assigningParticipants && this.isDragMode) {
      return this.t('breakout_rooms.drag_drop_participants');
    }
    if (this.assigningParticipants) {
      return this.t('breakout_rooms.click_drop_participants');
    }
    if (this.room.participants.length === 0) {
      return this.t('breakout_rooms.none_assigned');
    }
  }

  private toggleCardDisplay() {
    this.showExpandedCard = !this.showExpandedCard;
  }

  private glowCard() {
    this.glowingCard = true;
    setTimeout(() => {
      this.glowingCard = false;
    }, 2000);
  }

  private onAssign() {
    this.onParticipantsAdd.emit();
    this.glowCard();
  }

  private onJoin() {
    this.onRoomJoin.emit();
  }
  private onTitleChanged(e) {
    if (e.key === 'Enter') {
      this.newTitle = (e.target as HTMLInputElement).value;
      this.onEditClick();
    }
  }

  private renderPeer(participant: ConnectedMeetingParticipant) {
    const { displayPictureUrl: picture } = this.allParticipants.find(
      (p) => participantIdentifier(p) === participantIdentifier(participant)
    );
    const name = formatName(participant.displayName || '');
    return (
      <div class="peer-ui-container">
        <dyte-avatar participant={{ name, picture }} size="sm" />
        <p class="name" title={name}>
          {shorten(name, 16)}
          {this.meeting.self.userId === participant.id && ` (${this.t('you')})`}
        </p>
      </div>
    );
  }

  private renderExpandedCardMaybe() {
    if (!this.showExpandedCard) return;
    if (this.room.isParent) return;
    if (!this.getAssignmentHint()) return;
    if (!this.permissions.canAlterConnectedMeetings) return;

    return (
      <div class="message-container">
        <p
          class={{ 'compact-height': this.room.participants.length !== 0 }}
          onClick={() => this.onAssign()}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        >
          {this.getAssignmentHint()}
        </p>
      </div>
    );
  }

  private renderParticipantsMaybe() {
    if (!this.showExpandedCard) return;
    if (this.room.isParent) return;
    if (this.room.participants.length === 0) return;

    return (
      <div
        class="participant-list"
        onClick={() => {
          this.onAssign();
        }}
      >
        {this.room.participants.map((participant) => (
          <div class="participant-item" role="listitem" key={participant.id}>
            {this.renderPeer(participant)}
            {this.permissions.canAlterConnectedMeetings && (
              <dyte-icon
                class="show-on-hover"
                icon={this.iconPack.dismiss}
                iconPack={this.iconPack}
                t={this.t}
                onClick={() => {
                  this.onParticipantDelete.emit(participant);
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'assign-mode': this.assigningParticipants,
            'selector-mode': !this.assigningParticipants,
            'glowing-card': this.glowingCard,
          }}
        >
          <div class="header">
            <input
              ref={(el) => (this.inputTextEl = el)}
              placeholder={this.t('breakout_rooms.room_name')}
              disabled={!(this.editingTitleRoomId === this.room.id)}
              value={this.roomTitle}
              minlength={ROOM_TITLE_MIN_CHARS}
              onChange={(e) => {
                this.newTitle = (e.target as HTMLInputElement).value;
              }}
              onKeyPress={(e) => this.onTitleChanged(e)}
              class={{ 'editing-enabled': this.editingTitleRoomId === this.room.id }}
              style={{ width: `${this.roomTitle.length + 1}ch` }}
            />
            {this.editingTitleRoomId !== this.room.id && (
              <span class="participant-count">
                (<dyte-icon icon={this.iconPack.people} iconPack={this.iconPack} t={this.t} />
                {this.room?.participants?.length ?? '0'})
              </span>
            )}
            {this.canEditMeetingTitle && (
              <dyte-tooltip
                label={
                  this.editingTitleRoomId === this.room.id
                    ? this.t('breakout_rooms.save_room_name')
                    : this.t('breakout_rooms.edit_room_name')
                }
                iconPack={this.iconPack}
                t={this.t}
              >
                <dyte-icon
                  icon={
                    this.editingTitleRoomId === this.room.id
                      ? this.iconPack.checkmark
                      : this.iconPack.edit
                  }
                  iconPack={this.iconPack}
                  t={this.t}
                  class="show-on-hover"
                  onClick={this.onEditClick}
                />
              </dyte-tooltip>
            )}

            <div class="rooms-container">
              {this.permissions.canAlterConnectedMeetings &&
                !this.room.isParent &&
                this.allowDelete && (
                  <dyte-tooltip
                    label={this.t('breakout_rooms.delete')}
                    class="danger"
                    iconPack={this.iconPack}
                    t={this.t}
                  >
                    <dyte-icon
                      icon={this.iconPack.delete}
                      class="show-on-hover"
                      iconPack={this.iconPack}
                      t={this.t}
                      onClick={() => {
                        this.deleteRoom.emit();
                      }}
                    />
                  </dyte-tooltip>
                )}
              {this.assigningParticipants &&
                this.permissions.canAlterConnectedMeetings &&
                !this.room.isParent && (
                  <dyte-button
                    iconPack={this.iconPack}
                    t={this.t}
                    kind="button"
                    variant="ghost"
                    class="assign-button"
                    size="md"
                    onClick={() => this.onAssign()}
                  >
                    {this.t('breakout_rooms.assign')}
                  </dyte-button>
                )}
              {this.mode === 'edit' &&
                !this.assigningParticipants &&
                this.permissions.canSwitchConnectedMeetings && (
                  <dyte-button
                    iconPack={this.iconPack}
                    t={this.t}
                    kind="button"
                    variant="ghost"
                    class="assign-button"
                    size="md"
                    disabled={this.room.id === this.meeting.meta.meetingId}
                    onClick={() => this.onJoin()}
                  >
                    {this.room.id === this.meeting.meta.meetingId
                      ? this.t('joined')
                      : this.t('join')}
                  </dyte-button>
                )}
              {!this.room.isParent && (
                <dyte-icon
                  icon={
                    this.showExpandedCard ? this.iconPack.chevron_up : this.iconPack.chevron_down
                  }
                  iconPack={this.iconPack}
                  t={this.t}
                  onClick={() => this.toggleCardDisplay()}
                />
              )}
            </div>
          </div>
          {this.renderExpandedCardMaybe()}
          {this.renderParticipantsMaybe()}
        </div>
      </Host>
    );
  }
}
