import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { defaultConfig } from '../../exports';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { PollObject, Size, Poll } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { smoothScrollToBottom } from '../../utils/scroll';
import { DytePermissionsPreset } from '@dytesdk/web-core';

/**
 * A component which lists all available plugins a user can access with
 * the ability to enable or disable them as per their permissions.
 */
@Component({
  tag: 'dyte-polls',
  styleUrl: 'dyte-polls.css',
  shadow: true,
})
export class DytePolls {
  private onCreate: (data: PollObject) => void;
  private onVote: (id: string, index: number) => void;
  private pollEl: HTMLDivElement;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Create State */
  @State() create: boolean = false;

  /** Polls */
  @State() polls: Poll[];

  @State() permissions: DytePermissionsPreset;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (this.meeting == null) return;
    this.meeting.polls?.removeListener('pollsUpdate', this.onPollsUpdate);
    this.meeting.self.permissions.removeListener('pollsUpdate', this.onUpdatePermissions);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == undefined) return;

    if (meeting && !meeting.polls) return;

    this.permissions = this.meeting.self.permissions;
    this.polls = [...meeting.polls.items];
    meeting.polls.addListener('pollsUpdate', this.onPollsUpdate);
    this.meeting.self.permissions.addListener('pollsUpdate', this.onUpdatePermissions);

    this.onCreate = async (data: PollObject) => {
      this.create = false;
      await meeting.polls.create(data.question, data.options, data.anonymous, data.hideVotes);
    };

    this.onVote = async (id: string, index: number) => {
      await meeting.polls.vote(id, index);
    };
  }

  private toggleCreateState() {
    this.create = !this.create;
  }

  private onPollsUpdate = (data) => {
    this.polls = [...data.polls];
  };

  private onUpdatePermissions = () => {
    this.permissions = this.meeting.self.permissions;
  };

  componentDidRender() {
    smoothScrollToBottom(this.pollEl);
  }

  render() {
    return (
      <Host>
        <div class="ctr" part="container">
          <div class="polls-view scrollbar" ref={(el) => (this.pollEl = el)} part="polls">
            {this.polls.length == 0 && this.create !== true && (
              <div class="empty-polls">{this.t('polls.empty')}</div>
            )}
            {this.polls.map((item) => (
              <dyte-poll
                key={item.id}
                poll={item}
                onDyteVotePoll={(e) => {
                  this.onVote(e.detail.id, e.detail.index);
                }}
                self={this.meeting?.self.userId}
                iconPack={this.iconPack}
                t={this.t}
                permissions={this.permissions}
              />
            ))}
            {this.create && (
              <dyte-poll-form
                part="poll-form"
                onDyteCreatePoll={(e) => {
                  this.onCreate(e.detail);
                }}
                iconPack={this.iconPack}
                t={this.t}
              />
            )}
          </div>
          {this.permissions.polls.canCreate && (
            <dyte-button
              kind="wide"
              onClick={() => this.toggleCreateState()}
              variant={this.create ? 'secondary' : 'primary'}
              part="button"
              iconPack={this.iconPack}
              t={this.t}
            >
              {this.create ? this.t('polls.cancel') : this.t('polls.create')}
            </dyte-button>
          )}
        </div>
      </Host>
    );
  }
}
