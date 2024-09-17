import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { ChatChannel } from '../../types/props';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';
import { DyteBasicParticipant } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-channel-header',
  styleUrl: 'dyte-channel-header.css',
})
export class DyteChannelHeader {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Channel object */
  @Prop() channel: ChatChannel;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** event triggered for search */
  @Event() search: EventEmitter<string>;

  /** event triggered for search */
  @Event() searchDismissed: EventEmitter;

  @State() showChannelDetailsDialog: boolean = false;

  @State() showSearchBar: boolean = false;

  @State() members: DyteBasicParticipant[] = [];

  /** Show back button */
  @Prop() showBackButton = false;

  /** Event emitted when back button is clicked */
  @Event() back: EventEmitter<void>;

  @Watch('channel')
  onChannelChanged() {
    if (this.$searchInput) this.$searchInput.value = '';
    this.showSearchBar = false;

    if (!this.channel.isDirectMessage) {
      this.meeting.chat.getChannelMembers(this.channel.id).then((members) => {
        this.members = members;
      });
    }
  }

  connectedCallback() {
    this.onChannelChanged();
  }

  private $searchInput: HTMLInputElement;

  private renderChannelDetails() {
    return (
      <dyte-dialog
        open
        onDyteDialogClose={() => {
          this.showChannelDetailsDialog = false;
        }}
        iconPack={this.iconPack}
        t={this.t}
      >
        <dyte-channel-details members={this.members} channel={this.channel}></dyte-channel-details>
      </dyte-dialog>
    );
  }

  render() {
    if (!this.channel) {
      return null;
    }
    return (
      <Host>
        {this.showChannelDetailsDialog && this.renderChannelDetails()}
        <header
          class={{
            searching: this.showSearchBar,
          }}
        >
          {this.showBackButton && (
            <dyte-button
              kind="icon"
              variant="secondary"
              class="back-btn"
              onClick={() => {
                this.back.emit();
              }}
            >
              <dyte-icon icon={this.iconPack.chevron_left} />
            </dyte-button>
          )}

          <div class="channel-details">
            <span class="name">{this.channel.displayName}</span>
            {!this.channel.isDirectMessage && (
              <span class="members">{this.members.map((member) => member.name).join(', ')}</span>
            )}
          </div>
          <div class="channel-tools">
            {!this.channel.isDirectMessage && (
              <dyte-tooltip
                label={this.t('chat.channel_members')}
                iconPack={this.iconPack}
                t={this.t}
                variant="primary"
              >
                <dyte-button
                  iconPack={this.iconPack}
                  t={this.t}
                  kind="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    this.showChannelDetailsDialog = !this.showChannelDetailsDialog;
                  }}
                  class="br-primary-btn"
                >
                  <dyte-icon icon={this.iconPack.people} iconPack={this.iconPack} t={this.t} />
                </dyte-button>
              </dyte-tooltip>
            )}
          </div>
        </header>
      </Host>
    );
  }
}
