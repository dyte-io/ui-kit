import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { isLiveStreamViewer } from '../../utils/livestream';
import { Size } from '../../types/props';

/**
 * A component which shows count of total joined participants in a meeting.
 */
@Component({
  tag: 'dyte-participant-count',
  styleUrl: 'dyte-participant-count.css',
  shadow: true,
})
export class DyteParticipantCount {
  private countListener: () => void;

  private stageUpdateListener: () => void;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

  @State() participantCount: number = 0;

  @State() isViewer: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  private disconnectMeeting = (meeting: Meeting) => {
    if (meeting != null && this.countListener != null) {
      meeting.participants.joined.removeListener('participantJoined', this.countListener);
      meeting.participants.joined.removeListener('participantLeft', this.countListener);
      meeting?.stage &&
        this.stageUpdateListener &&
        meeting.stage.removeListener('stageStatusUpdate', this.stageUpdateListener);
      meeting.self.removeListener('roomJoined', this.countListener);
    }
  };

  disconnectedCallback() {
    this.disconnectMeeting(this.meeting);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting, oldMeeting?: Meeting) {
    this.disconnectMeeting(oldMeeting);
    if (meeting != null) {
      this.countListener = () => {
        this.participantCount =
          meeting.participants.joined.size + (meeting.self.roomJoined ? 1 : 0);
      };
      this.countListener();
      this.isViewer = isLiveStreamViewer(this.meeting);
      meeting.participants.joined.addListener('participantJoined', this.countListener);
      meeting.participants.joined.addListener('participantLeft', this.countListener);

      if (meeting?.stage) {
        this.stageUpdateListener = () => {
          this.isViewer = isLiveStreamViewer(this.meeting);
        };
        meeting?.stage.addListener('stageStatusUpdate', this.stageUpdateListener);
      }

      meeting.self.addListener('roomJoined', this.countListener);
    }
  }

  render() {
    if (this.isViewer) return null;
    return (
      <Host
        tabIndex={0}
        role="log"
        aria-label={`${this.participantCount} ${this.t('participants')}`}
      >
        <dyte-icon
          icon={this.iconPack.people}
          tabIndex={-1}
          aria-hidden={true}
          part="icon"
          iconPack={this.iconPack}
          t={this.t}
        />
        {this.participantCount}
      </Host>
    );
  }
}
