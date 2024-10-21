import { Component, h, Prop, State, Watch } from '@stencil/core';
import { UIConfig, Size, IconPack, defaultIconPack, DyteI18n, defaultConfig } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting, WaitlistedParticipant } from '../../types/dyte-client';
import { ParticipantsViewMode } from '../dyte-participants/dyte-participants';

@Component({
  tag: 'dyte-participants-waiting-list',
  styleUrl: 'dyte-participants-waiting-list.css',
  shadow: true,
})
export class DyteParticipantsWaitlisted {
  private waitlistedParticipantJoinedListener: (participant: WaitlistedParticipant) => void;
  private waitlistedParticipantLeftListener: (participant: WaitlistedParticipant) => void;
  private waitlistedParticipantsClearedListener: () => void;

  /** Meeting object */
  @Prop() meeting!: Meeting;
  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** View mode for participants list */
  @Prop() view: ParticipantsViewMode = 'sidebar';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();
  private acceptWaitingRoomRequest = async (id: WaitlistedParticipant['id']) => {
    await this.meeting.participants.acceptWaitingRoomRequest(id);
  };

  @State() waitlistedParticipants: WaitlistedParticipant[] = [];

  private acceptAllWaitingRoomRequests = async () => {
    await this.meeting.participants.acceptAllWaitingRoomRequest(
      this.waitlistedParticipants.map((p) => p.id)
    );
  };

  private rejectWaitingRoomRequest = async (id: WaitlistedParticipant['id']) => {
    await this.meeting.participants.rejectWaitingRoomRequest(id);
  };

  disconnectedCallback() {
    const { participants } = this.meeting;

    this.waitlistedParticipantJoinedListener &&
      participants.waitlisted.removeListener(
        'participantJoined',
        this.waitlistedParticipantJoinedListener
      );
    this.waitlistedParticipantLeftListener &&
      participants.waitlisted.removeListener(
        'participantLeft',
        this.waitlistedParticipantLeftListener
      );
    this.waitlistedParticipantsClearedListener &&
      participants.waitlisted.removeListener(
        'participantsCleared',
        this.waitlistedParticipantsClearedListener
      );
  }

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    this.waitlistedParticipants = meeting.participants.waitlisted.toArray();

    this.waitlistedParticipantJoinedListener = (participant: WaitlistedParticipant) => {
      if (!this.waitlistedParticipants.some((p) => p.id === participant.id)) {
        this.waitlistedParticipants = [...this.waitlistedParticipants, participant];
      }
    };
    this.waitlistedParticipantLeftListener = (participant: WaitlistedParticipant) => {
      this.waitlistedParticipants = this.waitlistedParticipants.filter(
        (p) => p.id !== participant.id
      );
    };
    this.waitlistedParticipantsClearedListener = () => {
      this.waitlistedParticipants = [];
    };

    meeting.participants.waitlisted.addListener(
      'participantJoined',
      this.waitlistedParticipantJoinedListener
    );
    meeting.participants.waitlisted.addListener(
      'participantLeft',
      this.waitlistedParticipantLeftListener
    );
    meeting.participants.waitlisted.addListener(
      'participantsCleared',
      this.waitlistedParticipantsClearedListener
    );
  }

  private shouldShowWaitlist = () => {
    if (this.meeting.meta.viewType === 'LIVESTREAM') return false;
    return this.meeting.self.permissions.acceptWaitingRequests;
  };

  render() {
    if (this.view !== 'sidebar' || !this.shouldShowWaitlist()) return;

    if (!this.waitlistedParticipants?.length) {
      return (
        <div class="waiting-participants">
          <div class="heading-count" part="waitlisted-heading-count">
            {this.t('waitlist.header_title')} ({this.waitlistedParticipants.length})
          </div>
          <div class="empty-message" part="empty-message">
            {this.t('waitlist.no_requests')}
          </div>
        </div>
      );
    }

    return (
      <div class="waiting-participants">
        <div class="heading-count" part="waitlisted-heading-count">
          {this.t('waitlist.header_title')} ({this.waitlistedParticipants.length})
        </div>
        <ul class="participants" part="waitlisted-participants">
          {this.waitlistedParticipants.map((participant) => (
            <li class="waiting-participant" key={participant.id}>
              <div class="participant-details">
                <dyte-avatar
                  participant={participant}
                  size="sm"
                  iconPack={this.iconPack}
                  t={this.t}
                />
                <p class="name" title={participant.name}>
                  {participant.name}
                </p>
              </div>
              <div class="waitlist-controls">
                <dyte-tooltip
                  label={this.t('waitlist.deny_request')}
                  variant="secondary"
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-button
                    variant="secondary"
                    kind="icon"
                    iconPack={this.iconPack}
                    t={this.t}
                    onClick={() => this.rejectWaitingRoomRequest(participant.id)}
                  >
                    <dyte-icon
                      class="deny"
                      icon={this.iconPack.dismiss}
                      iconPack={this.iconPack}
                      t={this.t}
                    />
                  </dyte-button>
                </dyte-tooltip>
                <dyte-tooltip
                  label={this.t('waitlist.accept_request')}
                  variant="secondary"
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-button
                    variant="secondary"
                    kind="icon"
                    iconPack={this.iconPack}
                    t={this.t}
                    onClick={() => this.acceptWaitingRoomRequest(participant.id)}
                  >
                    <dyte-icon
                      class="accept"
                      icon={this.iconPack.checkmark}
                      iconPack={this.iconPack}
                      t={this.t}
                    />
                  </dyte-button>
                </dyte-tooltip>
              </div>
            </li>
          ))}
        </ul>
        <dyte-button
          class="accept-all-button"
          variant="secondary"
          kind="wide"
          iconPack={this.iconPack}
          t={this.t}
          onClick={this.acceptAllWaitingRoomRequests}
        >
          {this.t('waitlist.accept_all')}
        </dyte-button>
      </div>
    );
  }
}
