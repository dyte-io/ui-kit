import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { usePaginatedChat } from '../../utils/flags';
import { canViewChat } from '../../utils/sidebar';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';
/**
 * A button which toggles visibility of chat.
 *
 * You need to pass the `meeting` object to it to see the unread messages count badge.
 *
 * When clicked it emits a `dyteStateUpdate` event with the data:
 *
 * ```ts
 * { activeSidebar: boolean; sidebar: 'chat' }
 * ```
 */
@Component({
  tag: 'dyte-chat-toggle',
  styleUrl: 'dyte-chat-toggle.css',
  shadow: true,
})
export class DyteChatToggle {
  private componentPropsCleanupFn: () => void = () => {};
  private removeStateChangeListener: () => void;

  @State() unreadMessageCount: number = 0;

  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() chatActive: boolean = false;

  @State() canViewChat: boolean = false;

  /**
   * Only used when paginated chat is enabled
   */
  @State() hasNewMessages: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.statesChanged(this.states);
    this.removeStateChangeListener = DyteUIKitStore.onChange('sidebar', () => this.statesChanged());
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.removeStateChangeListener && this.removeStateChangeListener();
    this.meeting?.chat?.removeListener('chatUpdate', this.onChatUpdate);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.updateCanView);
    this.meeting?.self?.permissions.removeListener('chatUpdate', this.updateCanView);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    if (usePaginatedChat(meeting)) {
      meeting.chat?.getMessages(new Date().getTime(), 1, true).then((res) => {
        if (res?.messages?.length) this.hasNewMessages = true;
      });
    }

    const meetingStartedTimeMs = meeting.meta?.meetingStartedTimestamp.getTime() ?? 0;
    const newMessages = meeting.chat?.messages.filter((m) => m.timeMs > meetingStartedTimeMs);
    this.unreadMessageCount = newMessages.length || 0;
    meeting.chat?.addListener('chatUpdate', this.onChatUpdate);
    this.canViewChat = canViewChat(meeting);
    meeting?.stage?.on('stageStatusUpdate', this.updateCanView);
    meeting?.self?.permissions.on('chatUpdate', this.updateCanView);
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || DyteUIKitStore.state;
    if (states != null) {
      this.chatActive = states.activeSidebar === true && states.sidebar === 'chat';
    }
  }

  private onChatUpdate = ({ action, message }) => {
    if (this.chatActive) return;

    if (action === 'add' && message.userId !== this.meeting?.self.userId) {
      this.hasNewMessages = true;
      this.unreadMessageCount += 1;
    }
  };

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private toggleChat = () => {
    const states = this.states || DyteUIKitStore.state;
    this.chatActive = !(states?.activeSidebar && states?.sidebar === 'chat');
    if (this.chatActive) {
      this.unreadMessageCount = 0;
      this.hasNewMessages = false;
    }
    DyteUIKitStore.state.activeSidebar = this.chatActive;
    DyteUIKitStore.state.activeMoreMenu = false;
    DyteUIKitStore.state.sidebar = this.chatActive ? 'chat' : undefined;
    DyteUIKitStore.state.activeAI = false;
    this.stateUpdate.emit({
      activeSidebar: this.chatActive,
      sidebar: this.chatActive ? 'chat' : undefined,
      activeMoreMenu: false,
      activeAI: false,
    });
  };

  private updateCanView = () => {
    this.canViewChat = canViewChat(this.meeting);
  };

  render() {
    if (!this.canViewChat) return;
    return (
      <Host title={this.t('chat')}>
        {usePaginatedChat(this.meeting)
          ? this.hasNewMessages && <div class="unread-count-dot" part="unread-count-dot"></div>
          : this.unreadMessageCount !== 0 &&
            !this.chatActive && (
              <div class="unread-count" part="unread-count">
                <span>{this.unreadMessageCount <= 100 ? this.unreadMessageCount : '99+'}</span>
              </div>
            )}
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          class={{ active: this.chatActive }}
          onClick={this.toggleChat}
          icon={this.iconPack.chat}
          label={this.t('chat')}
          variant={this.variant}
        />
      </Host>
    );
  }
}
