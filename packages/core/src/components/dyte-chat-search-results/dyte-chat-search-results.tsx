import { h, Component, Prop, Host } from '@stencil/core';
import { DyteI18n, IconPack, defaultIconPack, useLanguage } from '../../exports';
import { Meeting } from '../../types/dyte-client';
import type { Message } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-chat-search-results',
  styleUrl: 'dyte-chat-search-results.css',
  shadow: true,
})
export class DyteChatSearchResults {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Search query */
  @Prop() query: string;

  /** Channel id */
  @Prop() channelId: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  private pageSize = 50;

  private searchMessages = async (timestamp: number, size: number, reversed: boolean) => {
    return this.meeting.chat.searchMessages(this.query, {
      channelId: this.channelId,
      timestamp,
      size,
      reversed,
    });
  };

  private nodeRenderer = (messages: Message[]) => {
    return messages.map((message) => (
      <dyte-chat-message
        key={message.id}
        message={message}
        disableControls={true}
      ></dyte-chat-message>
    ));
  };

  render() {
    return (
      <Host>
        <dyte-paginated-list
          pageSize={this.pageSize}
          pagesAllowed={3}
          fetchData={this.searchMessages}
          createNodes={this.nodeRenderer}
          selectedItemId={this.query}
        />
      </Host>
    );
  }
}
