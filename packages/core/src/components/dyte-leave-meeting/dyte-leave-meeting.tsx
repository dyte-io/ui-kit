import { Component, Host, h, Prop, EventEmitter, Event, State, Watch } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import { DyteI18n } from '../../lib/lang';
import { IconPack } from '../../lib/icons';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which allows you to leave a meeting or
 * end meeting for all, if you have the permission.
 */
@Component({
  tag: 'dyte-leave-meeting',
  styleUrl: 'dyte-leave-meeting.css',
  shadow: true,
})
export class DyteLeaveMeeting {
  private componentPropsCleanupFn: () => void = () => {};
  private keyPressListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() canEndMeeting: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private isBreakoutRoomsActive: boolean = false;

  private isChildMeeting: boolean = false;

  private canJoinMainRoom: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    document.addEventListener('keydown', this.keyPressListener);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keyPressListener);
    this.meeting?.self.permissions.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.isBreakoutRoomsActive =
        this.meeting.connectedMeetings.supportsConnectedMeetings &&
        this.meeting.connectedMeetings.isActive;

      this.isChildMeeting =
        this.meeting.connectedMeetings.supportsConnectedMeetings &&
        this.meeting.connectedMeetings.meetings.some(
          (cMeet) => cMeet.id === meeting.meta.meetingId
        );

      this.meeting.self.permissions.addListener(
        'permissionsUpdate',
        this.permissionsUpdateListener
      );
      this.permissionsUpdateListener();
    }
  }

  private permissionsUpdateListener = () => {
    this.canEndMeeting = this.meeting.self.permissions.kickParticipant;
    this.canJoinMainRoom = this.meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;
  };

  private close = () => {
    this.stateUpdate.emit({ activeLeaveConfirmation: false });
    DyteUIKitStore.state.activeLeaveConfirmation = false;
  };

  private handleLeave = () => {
    this.meeting?.leaveRoom();
    this.close();
  };

  private handleJoinMainRoom = () => {
    this.meeting.connectedMeetings.moveParticipants(
      this.meeting.meta.meetingId,
      this.meeting.connectedMeetings.parentMeeting.id,
      [this.meeting.self.userId]
    );
    this.close();
  };

  private handleEndMeeting = () => {
    this.meeting?.participants.kickAll();
    this.close();
  };

  render() {
    return (
      <Host>
        <div class="leave-modal">
          <div class="header">
            <h2 class="title">{this.t('leave')}</h2>
          </div>
          <p class="message">
            {this.isBreakoutRoomsActive && this.isChildMeeting
              ? this.t('breakout_rooms.leave_confirmation')
              : this.t('leave_confirmation')}
          </p>
          <div class="content">
            <dyte-button
              variant="secondary"
              onClick={this.close}
              iconPack={this.iconPack}
              class="secondary-btn"
              t={this.t}
            >
              {this.t('cancel')}
            </dyte-button>
            {this.isBreakoutRoomsActive && this.isChildMeeting && this.canJoinMainRoom && (
              <dyte-button
                variant="secondary"
                onClick={this.handleJoinMainRoom}
                iconPack={this.iconPack}
                class="secondary-btn"
                t={this.t}
              >
                {this.t('breakout_rooms.leave_confirmation.main_room_btn')}
              </dyte-button>
            )}
            <dyte-button
              variant={this.canEndMeeting ? 'secondary' : 'danger'}
              title={this.t('leave')}
              onClick={this.handleLeave}
              iconPack={this.iconPack}
              class={{
                'secondary-btn': this.canEndMeeting,
                'secondary-danger-btn': this.canEndMeeting,
              }}
              t={this.t}
            >
              {this.t('leave')}
            </dyte-button>

            {this.canEndMeeting && (
              <dyte-button
                variant="danger"
                onClick={this.handleEndMeeting}
                iconPack={this.iconPack}
                t={this.t}
              >
                {this.t('end.all')}
              </dyte-button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
