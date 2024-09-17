import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';

const addZero = (n: number) => Math.trunc(n).toString().padStart(2, '0');

/**
 * Shows the time elapsed in a meeting.
 */
@Component({
  tag: 'dyte-clock',
  styleUrl: 'dyte-clock.css',
  shadow: true,
})
export class DyteClock {
  private timeout: NodeJS.Timer;
  private request: number;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() startedTime: string;
  @State() timeDiff: number;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  private disconnectMeeting = () => {
    this.timeout && clearTimeout(this.timeout);
    typeof this.request === 'number' && cancelAnimationFrame(this.request);
    this.meeting?.meta?.removeListener('meetingStartTimeUpdate', this.startedTimeUpdateListener);
  };

  private startedTimeUpdateListener = () => {
    this.startedTime = this.meeting?.meta?.meetingStartedTimestamp?.toISOString();
  };

  disconnectedCallback() {
    this.disconnectMeeting();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    this.disconnectMeeting();
    if (meeting != null) {
      this.startedTime = meeting.meta?.meetingStartedTimestamp?.toISOString();
      meeting.meta?.addListener('meetingStartTimeUpdate', this.startedTimeUpdateListener);
    }
  }

  @Watch('startedTime')
  startedTimeChanged(startedTime: string) {
    if (startedTime !== undefined) {
      const animate = () => {
        this.timeDiff = (Date.now() - new Date(this.startedTime).getTime()) / 1000;
        this.timeout = setTimeout(() => {
          if (this.request != null) {
            this.request = requestAnimationFrame(animate);
          }
        }, 500);
      };
      this.request = requestAnimationFrame(animate);
    }
  }

  private getFormattedTime() {
    if (this.timeDiff == null) {
      return null;
    }
    const diff = this.timeDiff;
    let time = '';
    if (diff >= 3600) {
      time = `${addZero(diff / 3600)}:`;
    }
    time += `${addZero((diff % 3600) / 60)}:${addZero(diff % 60)}`;
    return time;
  }

  render() {
    return (
      <Host tabIndex={0} role="timer" aria-live="off">
        {this.startedTime !== undefined && [
          <dyte-icon
            icon={this.iconPack.clock}
            aria-hidden={true}
            tabIndex={-1}
            part="icon"
            iconPack={this.iconPack}
            t={this.t}
          />,
          <span part="text">{this.getFormattedTime()}</span>,
        ]}
      </Host>
    );
  }
}
