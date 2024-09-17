import { DytePermissionsPreset } from '@dytesdk/web-core';
import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Poll } from '../../types/props';
import { formatName, getInitials, shorten } from '../../utils/string';

/**
 * A poll component.
 *
 * Shows a poll where a user can vote.
 */
@Component({
  tag: 'dyte-poll',
  styleUrl: 'dyte-poll.css',
  shadow: true,
})
export class DytePolls {
  /** Poll */
  @Prop() poll!: Poll;

  /** Self ID */
  @Prop() self: string;

  /** Permissions Object */
  @Prop() permissions: DytePermissionsPreset;

  /** Event which is emitted when a poll is voted on */
  @Event({ eventName: 'dyteVotePoll' }) onVote: EventEmitter<{
    id: string;
    index: number;
  }>;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  private MAX_VOTES_RENDER = 10;

  private vote(e, index: number) {
    if (this.poll.voted.includes(this.self)) {
      e.preventDefault();
    } else {
      this.onVote.emit({ id: this.poll.id, index });
    }
  }

  render() {
    const hasVoted = this.poll.voted.includes(this.self);

    return (
      <Host>
        <div class="ctr">
          <p class="poll-title">
            {this.t('polls.by')} {shorten(formatName(this.poll.createdBy), 20)}
          </p>

          <div class="poll">
            <p class="poll-question">{this.poll.question}</p>
            <div class="poll-answers">
              <span>{this.t('polls.answers')}</span>
              <span>{this.poll.voted.length}</span>
            </div>
            {this.poll.options.map((item, index) => (
              <div
                class={{
                  active: item.votes.some((x) => x.id === this.self),
                  'open-vote': this.permissions.polls.canVote && !hasVoted,
                  'poll-option': true,
                }}
              >
                <div class="poll-option-header" data-disabled={!this.permissions.polls.canVote}>
                  <label>
                    {!hasVoted && (
                      <input
                        disabled={!this.permissions.polls.canVote}
                        readOnly={hasVoted}
                        type="radio"
                        checked={item.votes.some((x) => x.id === this.self)}
                        onClick={(e) => this.vote(e, index)}
                      />
                    )}
                    <p>{item.text}</p>
                  </label>
                  <span class="counter">{item.count}</span>
                </div>

                <div class="votes">
                  {item.votes.slice(0, this.MAX_VOTES_RENDER).map((vote) => {
                    if (this.poll.anonymous && this.self !== this.poll.createdByUserId) return;
                    return (
                      <dyte-tooltip label={vote.name} iconPack={this.iconPack} t={this.t}>
                        <div class="vote">{getInitials(vote.name)}</div>
                      </dyte-tooltip>
                    );
                  })}
                  {item.votes.length > this.MAX_VOTES_RENDER && (
                    <dyte-tooltip
                      label={`+${item.votes.length - this.MAX_VOTES_RENDER} more `}
                      iconPack={this.iconPack}
                      t={this.t}
                    >
                      <div class="vote">+{item.votes.length - this.MAX_VOTES_RENDER}</div>
                    </dyte-tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
