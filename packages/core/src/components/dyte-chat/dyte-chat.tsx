import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  Element,
  Listen,
  Fragment,
  Event,
  EventEmitter,
} from '@stencil/core';
import { Meeting, Peer } from '../../types/dyte-client';
import { Chat, ChatChannel, Size } from '../../types/props';
import { defaultIconPack, IconPack } from '../../lib/icons';
import type { Message, TextMessage } from '@dytesdk/web-core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import {
  TEMPORARY_CHANNEL_PREFIX,
  alphabeticalSorter,
  getDMComparator,
  generateChatGroupKey,
  handleFilesDataTransfer,
  isDirectMessageChannel,
  parseMessageForTarget,
  stripOutReplyBlock,
} from '../../utils/chat';
import { chatUnreadTimestamps } from '../../utils/user-prefs';
import { FlagsmithFeatureFlags, usePaginatedChat } from '../../utils/flags';
import { DyteChannelHeaderCustomEvent } from '../../components';
import { DyteUIKitStore, States, UIConfig, defaultConfig } from '../../exports';

import { ChannelItem } from '../dyte-channel-selector-view/dyte-channel-selector-view';
import { NewMessageEvent } from '../dyte-chat-composer-view/dyte-chat-composer-view';
import { updateComponentProps } from '../../utils/component-props';

/**
 * Fully featured chat component with image & file upload, emoji picker and auto-scroll.
 */
@Component({
  tag: 'dyte-chat',
  styleUrl: 'dyte-chat.css',
  shadow: true,
})
export class DyteChat {
  private componentPropsCleanupFn: () => void = () => {};
  private chatUpdateListener = ({ message }) => {
    if (message.channelId) return;
    this.addToChatGroup(message as Message);
    // shallow copy to trigger render
    this.chatGroups = { ...this.chatGroups };
  };

  private chatPermissionUpdateListener = () => {
    this.canSend = this.meeting.self.permissions.chatPublic.canSend;
    this.canSendTextMessage = this.meeting.self.permissions.chatPublic.text;
    this.canSendFiles = this.meeting.self.permissions.chatPublic.files;
  };

  @Element() host: HTMLDyteChatElement;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** disables private chat */
  @Prop() disablePrivateChat: boolean = false;

  /** Can current user pin/unpin messages */
  @State() canPinMessages: boolean = false;

  /**
   * @deprecated
   * Beta API, will change in future
   * List of target presets allowed as private chat recipient
   */
  @Prop() privatePresetFilter: String[] = [];

  @State() unreadCountGroups: Record<string, number> = {};

  @State() chatGroups: Record<string, Chat[]> = { everyone: [] };
  @State() selectedGroup: string = 'everyone';

  @State() now: Date = new Date();

  @State() dropzoneActivated: boolean = false;

  @State() showLatestMessageButton = false;

  @State() canSend: boolean = false;
  @State() canSendTextMessage: boolean = false;
  @State() canSendFiles: boolean = false;
  @State() canPrivateMessage: boolean = false;
  @State() canSendPrivateTexts: boolean = false;
  @State() canSendPrivateFiles: boolean = false;

  @State() emojiPickerEnabled: boolean = false;

  @State() chatRecipientId: string = 'everyone';

  @State() participants: Peer[] = [];

  @State() selectedParticipant: Peer;

  @State() channels: ChatChannel[] = [];

  @State() selectedChannelId: string;

  @State() editingMessage: TextMessage | null = null;

  @State() replyMessage: TextMessage | null = null;

  @State() searchQuery = '';

  @State() selectorState: 'desktop' | 'hide' | 'mobile' = 'hide';

  @State() creatingChannel = false;

  @State() showPinnedMessages: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private channelMap: Map<string, ChatChannel> = new Map();

  private isChatViewType: boolean;

  private isGroupCall: boolean;

  private resizeObserver: ResizeObserver;

  private onDragOver = (e) => {
    e.preventDefault();
    this.dropzoneActivated = true;
  };

  private onDragLeave = () => {
    this.dropzoneActivated = false;
  };

  private onDrop = (e) => {
    e.preventDefault();
    this.dropzoneActivated = false;

    handleFilesDataTransfer(e.dataTransfer.items, (type, file) => {
      switch (type) {
        case 'image':
          if (this.isFileMessagingAllowed()) {
            this.meeting?.chat?.sendImageMessage(file, this.getRecipientPeerIds());
          }
          break;
        case 'file':
          if (this.isFileMessagingAllowed()) {
            this.meeting?.chat?.sendFileMessage(file, this.getRecipientPeerIds());
          }
          break;
      }
    });
  };

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
    if (!this.meeting) return;
    this.meetingChanged(this.meeting);

    if (this.meeting && !this.meeting.chat) {
      return;
    }

    if (this.isFileMessagingAllowed()) {
      this.host.addEventListener('dragover', this.onDragOver);
      this.host.addEventListener('dragleave', this.onDragLeave);
      this.host.addEventListener('drop', this.onDrop);
    }
  }

  @Listen('editMessageInit', { target: 'window' })
  onEditMessageInit(
    event: CustomEvent<{
      payload: TextMessage;
      flags: { isReply?: boolean; isEdit?: boolean };
    }>
  ) {
    if (event.detail.flags.isReply) {
      this.replyMessage = event.detail.payload;
    } else if (event.detail.flags.isEdit) {
      this.editingMessage = event.detail.payload;
    }
  }

  private disconnectMeeting = (meeting: Meeting) => {
    if (this.isPrivateChatSupported()) {
      meeting?.participants.joined.removeListener('participantJoined', this.onParticipantUpdate);
      meeting?.participants.joined.removeListener('participantLeft', this.onParticipantUpdate);
    }
    meeting?.chat?.removeListener('chatUpdate', this.chatUpdateListener);
    meeting?.chat?.removeListener('channelCreate', this.onChannelCreateOrUpdate);
    meeting?.chat?.removeListener('channelUpdate', this.onChannelCreateOrUpdate);
    meeting?.chat?.removeListener('channelMessageUpdate', this.onChannelCreateOrUpdate);
    meeting?.participants?.all?.removeListener('participantsUpdate', this.onChannelCreateOrUpdate);
    meeting.self.permissions.removeListener('*', this.chatPermissionUpdateListener);
  };

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.disconnectMeeting(this.meeting);
    this.host.removeEventListener('dragover', this.onDragOver);
    this.host.removeEventListener('dragleave', this.onDragLeave);
    this.host.removeEventListener('drop', this.onDrop);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting, oldMeeting?: Meeting) {
    if (oldMeeting != undefined) this.disconnectMeeting(oldMeeting);
    if (meeting && !meeting.chat) return;

    if (meeting != null) {
      this.canSend = meeting.self.permissions.chatPublic.canSend;
      this.canSendTextMessage = meeting.self.permissions.chatPublic.text;
      this.canSendFiles = meeting.self.permissions.chatPublic.files;
      this.canPrivateMessage = !!(
        meeting.self.permissions.chatPrivate?.canSend ||
        meeting.self.permissions.chatPrivate?.canReceive
      );
      this.canSendPrivateTexts = !!meeting.self.permissions.chatPrivate?.text;
      this.canSendPrivateFiles = !!meeting.self.permissions.chatPrivate?.files;
      this.canPinMessages =
        meeting?.__internals__?.features.hasFeature(FlagsmithFeatureFlags.PINNED_MESSAGES) &&
        meeting.self.permissions.pinParticipant;

      this.isGroupCall = meeting.meta.viewType === 'GROUP_CALL';
      this.isChatViewType = meeting.meta.viewType === 'CHAT';
      if (this.isChatViewType) {
        this.onChannelCreateOrUpdate();
        const validChannels = this.channels.filter(
          (channel) => !channel.id.includes(TEMPORARY_CHANNEL_PREFIX)
        );
        if (validChannels.length) {
          this.selectedChannelId = this.channels[0].id;
        }

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }

        this.resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.contentBoxSize[0].inlineSize < 758) {
              this.selectorState = 'hide';
            } else {
              this.selectorState = 'desktop';
            }
          }
        });

        if (this.isChatViewType) {
          this.resizeObserver.observe(this.host);
        }
      }

      this.initializeChatGroups();
      // shallow copy to trigger render
      this.chatGroups = { ...this.chatGroups };

      meeting.self.permissions.on('*', this.chatPermissionUpdateListener);

      this.onParticipantUpdate();

      meeting.chat?.addListener('chatUpdate', this.chatUpdateListener);

      if (this.isPrivateChatSupported()) {
        meeting.participants.joined.addListener('participantJoined', this.onParticipantUpdate);
        meeting.participants.joined.addListener('participantLeft', this.onParticipantUpdate);
      }
      if (this.isChatViewType) {
        meeting.chat.addListener('channelCreate', this.onChannelCreateOrUpdate);
        meeting.chat.addListener('channelUpdate', this.onChannelCreateOrUpdate);
        meeting.chat.addListener('channelMessageUpdate', this.onChannelCreateOrUpdate);
        meeting.participants.all.addListener('participantsUpdate', this.onChannelCreateOrUpdate);
      }
    }
  }

  private getFilteredParticipants = () => {
    if (this.privatePresetFilter.length === 0) return this.participants;
    return this.participants.filter((p: Peer) => this.privatePresetFilter.includes(p.presetName));
  };

  private onParticipantUpdate = () => {
    this.participants = this.meeting.participants.joined
      .toArray()
      .filter(
        (p: Peer) =>
          this.privatePresetFilter.length === 0 || this.privatePresetFilter.includes(p.presetName)
      );

    // if selected participant leaves, reset state to everyone
    if (this.selectedParticipant && !this.participants.includes(this.selectedParticipant)) {
      this.selectedParticipant = null;
      this.chatRecipientId = this.selectedGroup = 'everyone';
    }
  };

  private usePaginatedChat = () => {
    if (this.isGroupCall && this.showPinnedMessages) return false;

    return this.selectedGroup === 'everyone' && usePaginatedChat(this.meeting);
  };

  @Watch('chatGroups')
  chatGroupsChanged(chatGroups: Record<string, Chat[]>) {
    if (!this.isPrivateChatSupported()) {
      return;
    }

    const unreadCounts = {};

    for (const key in chatGroups) {
      const lastReadTimestamp = chatUnreadTimestamps[key] ?? 0;

      unreadCounts[key] = chatGroups[key].filter(
        (c) =>
          c.type == 'chat' &&
          c.message.time > lastReadTimestamp &&
          c.message.userId !== this.meeting.self.userId
      ).length;

      if (
        key ===
          generateChatGroupKey([this.meeting.self.userId, this.selectedParticipant?.userId]) ||
        (key === 'everyone' && this.selectedParticipant === null)
      ) {
        unreadCounts[key] = 0;
        chatUnreadTimestamps[key] = new Date();
      }
    }

    this.updateUnreadCountGroups(unreadCounts);
  }

  private updateUnreadCountGroups = (obj: typeof this.unreadCountGroups) => {
    this.unreadCountGroups = {
      ...this.unreadCountGroups,
      ...obj,
    };
  };

  private initializeChatGroups() {
    this.meeting.chat?.messages.forEach((message) => {
      this.addToChatGroup(message);
    });
  }

  private addToChatGroup(message: Message) {
    const parsedMessage = parseMessageForTarget(message);
    let key = 'everyone';
    if (parsedMessage.targetUserIds?.length > 0) {
      const allParticipants = new Set<string>([
        parsedMessage.userId,
        ...parsedMessage.targetUserIds,
      ]);
      key = generateChatGroupKey(Array.from(allParticipants));
    }
    if (this.chatGroups[key] === undefined) this.chatGroups[key] = [];

    let isEditedMessage = false;
    let messages = [];
    this.chatGroups[key].forEach((chat) => {
      if (chat.type === 'chat' && chat.message.id === message.id) {
        isEditedMessage = true;
        messages.push({ type: 'chat' as const, message: parsedMessage });
      } else {
        messages.push(chat);
      }
    });

    if (!isEditedMessage) {
      messages.push({ type: 'chat' as const, message: parsedMessage });
    }

    this.chatGroups[key] = messages;
  }

  private getRecipientPeerIds() {
    let peerIds = [];
    if (this.chatRecipientId !== 'everyone') {
      peerIds = [this.selectedParticipant.id];
    }
    return peerIds;
  }

  private isPrivateChatSupported = () => {
    return (
      this.canPrivateMessage &&
      !this.disablePrivateChat &&
      this.meeting?.__internals__?.features?.getFeatureValue('chat_socket_server') ===
        'socket-service'
    );
  };

  private updateRecipients = (event: CustomEvent<ChannelItem>) => {
    const { id } = event.detail;
    this.chatRecipientId = id;
    this.selectedParticipant = this.participants.find((p) => p.userId === id);

    if (this.chatRecipientId !== 'everyone') {
      const allParticipants = [this.chatRecipientId, this.meeting.self.userId];
      const targetKey = generateChatGroupKey(allParticipants);
      this.selectedGroup = targetKey;
    } else {
      this.selectedGroup = 'everyone';
    }

    this.updateUnreadCountGroups({ [this.selectedGroup]: 0 });
  };

  private isTextMessagingAllowed = () => {
    if (this.chatRecipientId === 'everyone') {
      // public chat
      return this.canSend && this.canSendTextMessage;
    }

    // private chat
    return this.canPrivateMessage && this.canSendPrivateTexts;
  };

  private isFileMessagingAllowed = () => {
    if (this.chatRecipientId === 'everyone') {
      // public chat
      return this.canSend && this.canSendFiles;
    }

    // private chat
    return this.canPrivateMessage && this.canSendPrivateFiles;
  };

  @Listen('switchChannel')
  channelSwitchListener(e: CustomEvent) {
    this.onChannelChanged(e);
  }

  private onChannelChanged = (e: CustomEvent<ChannelItem>) => {
    const channel = e.detail;
    if (channel.id.includes(TEMPORARY_CHANNEL_PREFIX)) {
      this.createDMChannel(channel.id.replace(TEMPORARY_CHANNEL_PREFIX, ''));
    } else {
      this.selectedChannelId = channel.id;
    }
    this.cleanup();
    if (this.selectorState !== 'desktop') {
      this.selectorState = 'hide';
    }
  };

  private createDMChannel = async (memberId: string) => {
    this.creatingChannel = true;
    const newChannel = await this.meeting.chat.createChannel('Direct Message', [memberId], {
      visibility: 'private',
      isDirectMessage: true,
    });
    this.creatingChannel = false;
    this.selectedChannelId = newChannel.id;
  };

  private cleanup = () => {
    this.editingMessage = null;
    this.replyMessage = null;
    this.searchQuery = '';
  };

  private onQuotedMessageDismiss = () => {
    this.replyMessage = null;
  };

  private onChannelCreateOrUpdate = (channel?: ChatChannel) => {
    if (channel) {
      this.channelMap.set(channel.id, channel);
    } else {
      this.meeting.chat.channels.forEach((chan) => this.channelMap.set(chan.id, chan));
    }
    const allChannels = Array.from(this.channelMap.values());
    const channels = allChannels
      .filter((channel) => !isDirectMessageChannel(channel))
      .sort((a, b) => alphabeticalSorter(a.displayName, b.displayName));

    const membersWithChannel = allChannels.filter(isDirectMessageChannel).map((channel) => {
      return {
        ...channel,
        displayName: this.getMemberDisplayName(channel),
      } as ChatChannel;
    });

    const membersWithoutChannel = this.meeting.participants.all
      .toArray()
      .filter((member) => {
        if (member.userId === this.meeting.self.userId) return false;
        const matcher = getDMComparator([this.meeting.self.userId, member.userId]);
        return membersWithChannel.every(
          (channel) => getDMComparator(channel.memberIds) !== matcher
        );
      })
      .map((member) => {
        return {
          id: `${TEMPORARY_CHANNEL_PREFIX}${member.userId}`,
          displayName: member.name,
          displayPictureUrl: member.picture,
          isDirectMessage: true,
          unreadCount: 0,
        } as ChatChannel;
      });

    const dms = [...membersWithChannel, ...membersWithoutChannel].sort((a, b) =>
      alphabeticalSorter(a.displayName, b.displayName)
    );
    this.channels = [...channels, ...dms];

    // select channel only if it is created in db
    const nonTemporaryChannel = [...channels, ...membersWithChannel];
    if (!this.selectedChannelId && nonTemporaryChannel.length !== 0) {
      this.selectedChannelId = nonTemporaryChannel[0].id;
    }
  };

  private getMemberDisplayName = (channel: ChatChannel) => {
    let id: string;
    if (channel.memberIds.length === 1) {
      // channel with self
      id = channel.memberIds[0];
    } else {
      id =
        channel.memberIds[0] === this.meeting.self.userId
          ? channel.memberIds[1]
          : channel.memberIds[0];
    }
    const member = this.meeting.participants.all.toArray().find((member) => member.userId === id);
    return member?.name ?? id;
  };

  private onNewMessageHandler = async (e: CustomEvent<NewMessageEvent>) => {
    const message = e.detail;
    if (this.isChatViewType) {
      await this.meeting.chat.sendMessageToChannel(
        message,
        this.selectedChannelId,
        this.replyMessage
          ? {
              replyTo: this.replyMessage,
            }
          : {}
      );
      this.replyMessage = null;
    } else {
      this.meeting.chat.sendMessage(message, this.getRecipientPeerIds());
    }
  };

  private onEditMessageHandler = async (e: CustomEvent<string>) => {
    await this.meeting?.chat?.editTextMessage(
      this.editingMessage.id,
      e.detail,
      this.editingMessage.channelId
    );
    this.editingMessage = null;
  };

  private onEditCancel = () => {
    this.editingMessage = null;
  };

  private onSearchHandler = async (e: DyteChannelHeaderCustomEvent<string>) => {
    this.searchQuery = e.detail;
  };

  private onSearchDismissed = () => {
    this.searchQuery = '';
  };

  private onChannelCreateClicked = () => {
    this.stateUpdate.emit({ activeChannelCreator: true });
    DyteUIKitStore.state.activeChannelCreator = true;
  };

  private onPinMessage = (event: CustomEvent<Message>) => {
    const message = event.detail;
    if (message.pinned) {
      this.meeting.chat.unpin(message.id);
    } else {
      this.meeting.chat.pin(message.id);
    }
  };

  private onDeleteMessage = (event: CustomEvent<Message>) => {
    const message = event.detail;
    this.meeting.chat.deleteMessage(message.id);
  };

  private renderHeadlessComponents() {
    return (
      <Fragment>
        <dyte-dialog-manager meeting={this.meeting} />
        <dyte-notifications meeting={this.meeting} />
      </Fragment>
    );
  }

  private renderComposerUI() {
    if (this.isChatViewType && this.channels.length === 0) return null;
    if (this.isChatViewType && this.searchQuery !== '') return null;
    if (this.isChatViewType && !this.selectedChannelId) return null;

    if (this.chatRecipientId === 'everyone') {
      if (!this.canSendTextMessage && !this.canSendFiles) return null;
    } else {
      if (!this.canSendPrivateTexts && !this.canSendPrivateFiles) return null;
    }

    const uiProps = { iconPack: this.iconPack, t: this.t, size: this.size };
    const message = this.editingMessage ? this.editingMessage.message : '';
    const quotedMessage = this.replyMessage ? this.replyMessage.message : '';

    return (
      <dyte-chat-composer-view
        message={message}
        storageKey={this.selectedChannelId ?? `draft-${this.selectedChannelId}`}
        quotedMessage={quotedMessage}
        isEditing={!!this.editingMessage}
        canSendTextMessage={this.isTextMessagingAllowed()}
        canSendFiles={this.isFileMessagingAllowed()}
        disableEmojiPicker={
          !!this.meeting?.__internals__?.features.hasFeature(
            FlagsmithFeatureFlags.DISABLE_EMOJI_PICKER
          )
        }
        maxLength={this.meeting.chat.maxTextLimit}
        rateLimits={this.meeting.chat.rateLimits}
        inputTextPlaceholder={this.t('chat.message_placeholder')}
        onNewMessage={this.onNewMessageHandler}
        onEditMessage={this.onEditMessageHandler}
        onEditCancel={this.onEditCancel}
        onQuotedMessageDismiss={this.onQuotedMessageDismiss}
        {...uiProps}
      >
        <slot name="chat-addon" slot="chat-addon" />
      </dyte-chat-composer-view>
    );
  }

  private renderFullChat() {
    if (this.creatingChannel) {
      return (
        <div class="banner">
          <dyte-spinner size="lg" />
        </div>
      );
    }

    if (this.channels.length === 0 || !this.selectedChannelId) {
      return (
        <div class="banner">
          <dyte-icon
            icon={this.iconPack.create_channel_illustration}
            iconPack={this.iconPack}
            t={this.t}
            slot="start"
            class={'create-channel-illustration'}
          />
          <dyte-button
            iconPack={this.iconPack}
            t={this.t}
            kind="wide"
            variant="primary"
            size="md"
            onClick={this.onChannelCreateClicked}
            class="welcome-new-channel"
          >
            <dyte-icon icon={this.iconPack.add} iconPack={this.iconPack} t={this.t} slot="start" />
            <span>{this.t('chat.new_channel')}</span>
          </dyte-button>

          {(this.selectorState === 'mobile' || this.selectorState === 'hide') && (
            <dyte-button
              kind="button"
              variant="secondary"
              size="md"
              class="view-chats-btn"
              onClick={() => {
                this.selectorState = 'mobile';
              }}
            >
              <dyte-icon icon={this.iconPack.chat} slot="start"></dyte-icon>
              <span>{this.t('chat.view_chats')}</span>
            </dyte-button>
          )}
        </div>
      );
    }

    const selectedChannel = this.channels.find((channel) => channel.id === this.selectedChannelId);

    return (
      <div class="chat">
        <dyte-channel-header
          slot="header"
          meeting={this.meeting}
          channel={selectedChannel}
          onSearch={this.onSearchHandler}
          onSearchDismissed={this.onSearchDismissed}
          showBackButton={this.selectorState === 'mobile' || this.selectorState === 'hide'}
          onBack={() => {
            this.selectorState = 'mobile';
          }}
        />
        {this.searchQuery !== '' && (
          <dyte-chat-search-results
            meeting={this.meeting}
            query={this.searchQuery}
            channelId={this.selectedChannelId}
          ></dyte-chat-search-results>
        )}
        {this.searchQuery === '' && (
          <dyte-chat-messages-ui-paginated
            meeting={this.meeting}
            size={this.size}
            iconPack={this.iconPack}
            t={this.t}
            selectedChannelId={this.selectedChannelId}
            selectedChannel={selectedChannel}
          ></dyte-chat-messages-ui-paginated>
        )}
      </div>
    );
  }

  private getChannelItems = () => {
    return this.channels.map((channel) => {
      const result: ChannelItem = {
        id: channel.id,
        name: channel.displayName,
        avatarUrl: channel.displayPictureUrl,
      };
      if (channel.latestMessage) {
        result.latestMessage =
          channel.latestMessage.type === 'text'
            ? stripOutReplyBlock(channel.latestMessage.message)
            : '';
        result.latestMessageTime = channel.latestMessage.time;
      }
      return result;
    });
  };

  private getPrivateChatRecipients = () => {
    const participants = this.getFilteredParticipants().map((participant) => {
      const key = generateChatGroupKey([participant.userId, this.meeting.self.userId]);
      const result: ChannelItem = {
        id: participant.userId,
        name: participant.name,
        avatarUrl: participant.picture,
        unreadCount: this.unreadCountGroups[key],
      };
      return result;
    });
    const everyone: ChannelItem = {
      id: 'everyone',
      name: this.t('chat.everyone'),
      icon: 'participants',
      unreadCount: this.unreadCountGroups['everyone'],
    };
    return [everyone, ...participants];
  };

  private onTogglePinnedMessages = () => {
    this.showPinnedMessages = !this.showPinnedMessages;
  };

  private renderPinnedMessagesHeader = () => {
    if (this.meeting.chat.pinned.length === 0) return null;

    return (
      <dyte-tooltip label={this.t('chat.toggle_pinned_msgs')} iconPack={this.iconPack} t={this.t}>
        <div
          class={{ 'pinned-messages-header': true, active: this.showPinnedMessages }}
          onClick={this.onTogglePinnedMessages}
        >
          <dyte-icon icon={this.iconPack.pin} iconPack={this.iconPack} t={this.t} />
          {this.t('chat.pinned_msgs')}
          {` (${this.meeting.chat.pinned.length})`}
        </div>
      </dyte-tooltip>
    );
  };

  render() {
    if (!this.meeting) return null;

    const uiProps = { iconPack: this.iconPack, t: this.t, size: this.size };

    const selfUserId = this.meeting?.self.userId;

    let chatMessages = this.chatGroups[this.selectedGroup] || [];

    if (this.showPinnedMessages && this.meeting.chat.pinned.length !== 0) {
      chatMessages = chatMessages.filter((chat) => chat.type === 'chat' && chat.message.pinned);
    }

    return (
      <Host>
        {this.isChatViewType && this.renderHeadlessComponents()}
        <div class="chat-container">
          {this.isChatViewType && (
            <div class={{ 'selector-container': true, [this.selectorState]: true }}>
              <dyte-channel-selector-view
                channels={this.getChannelItems()}
                selectedChannelId={this.selectedChannelId}
                onChannelChange={this.onChannelChanged}
                t={this.t}
              >
                <div class="channel-selector-header" slot="header">
                  <dyte-logo meeting={this.meeting} config={this.config} t={this.t} />
                  <dyte-tooltip
                    label={this.t('chat.new_channel')}
                    iconPack={this.iconPack}
                    t={this.t}
                  >
                    <dyte-button
                      iconPack={this.iconPack}
                      t={this.t}
                      kind="button"
                      variant="ghost"
                      size="md"
                      onClick={this.onChannelCreateClicked}
                      class="channel-create-btn"
                    >
                      <dyte-icon icon={this.iconPack.add} iconPack={this.iconPack} t={this.t} />
                    </dyte-button>
                  </dyte-tooltip>
                </div>
              </dyte-channel-selector-view>
              <dyte-button
                kind="icon"
                variant="ghost"
                class="mobile-close-btn"
                onClick={() => (this.selectorState = 'hide')}
              >
                <dyte-icon icon={this.iconPack.dismiss} />
              </dyte-button>
            </div>
          )}
          <div class="chat">
            {this.isFileMessagingAllowed() && (
              <div id="dropzone" class={{ active: this.dropzoneActivated }} part="dropzone">
                <dyte-icon icon={this.iconPack.attach} iconPack={this.iconPack} t={this.t} />
                <p>{this.t('chat.send_attachment')}</p>
              </div>
            )}
            {this.renderPinnedMessagesHeader()}
            {this.isPrivateChatSupported() && (
              <dyte-channel-selector-view
                channels={this.getPrivateChatRecipients()}
                selectedChannelId={this.selectedParticipant?.userId || 'everyone'}
                onChannelChange={this.updateRecipients}
                t={this.t}
                viewAs="dropdown"
              />
            )}
            {this.isChatViewType ? (
              this.renderFullChat()
            ) : this.usePaginatedChat() ? (
              <dyte-chat-messages-ui-paginated
                meeting={this.meeting}
                onPinMessage={this.onPinMessage}
                onDeleteMessage={this.onDeleteMessage}
                size={this.size}
                iconPack={this.iconPack}
                t={this.t}
              ></dyte-chat-messages-ui-paginated>
            ) : (
              <dyte-chat-messages-ui
                messages={chatMessages}
                selfUserId={selfUserId}
                selectedGroup={this.selectedGroup}
                onPinMessage={this.onPinMessage}
                canPinMessages={this.canPinMessages}
                {...uiProps}
              />
            )}

            {this.renderComposerUI()}
          </div>
        </div>
      </Host>
    );
  }
}
