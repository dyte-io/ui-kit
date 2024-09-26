import { h, Component, Prop, Host } from '@stencil/core';
import { DyteI18n, DyteUIKitStore, IconPack, defaultIconPack } from '../../exports';
import { Meeting } from '../../types/dyte-client';
import type { Message } from '@dytesdk/web-core';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-chat-search-results',
  styleUrl: 'dyte-chat-search-results.css',
  shadow: true,
})
export class DyteChatSearchResults {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Search query */
  @Prop() query: string;

  /** Channel id */
  @Prop() channelId: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

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

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

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
