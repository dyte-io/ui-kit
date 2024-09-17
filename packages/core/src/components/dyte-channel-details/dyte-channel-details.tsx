import { Component, Host, Prop, h } from '@stencil/core';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';
import { ChatChannel } from '../../types/props';
import { DyteBasicParticipant } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-channel-details',
  styleUrl: 'dyte-channel-details.css',
  shadow: true,
})
export class DyteChannelDetails {
  /** Channel object */
  @Prop() channel!: ChatChannel;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** List of channel members */
  @Prop() members: DyteBasicParticipant[] = [];

  private renderMembers() {
    return (
      <ul class="scrollbar">
        {this.members.map((member) => {
          return (
            <li>
              <dyte-avatar participant={{ name: member.name, picture: member.picture }} size="sm" />
              <span>{member.name}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <Host>
        <header>{this.t('chat.channel_members')}</header>
        {this.renderMembers()}
      </Host>
    );
  }
}
