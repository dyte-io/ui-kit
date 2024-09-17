import type { ImageMessage, Message } from '@dytesdk/web-core';
import { ButtonVariant } from '../components/dyte-button/dyte-button';
import { RoomLeftState } from './dyte-client';
import { LangDict } from '../exports';
import type { ChatChannel as ChatChannelWebCore } from '@dytesdk/web-core';
import { DyteSidebarSection } from '../components/dyte-sidebar/dyte-sidebar';
import { IconVariant } from '../components/dyte-icon/dyte-icon';

/**
 * Screen breakpoints
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * User preferences object type which are
 * shared within the global States object.
 */
export interface UserPreferences {
  mirrorVideo?: boolean;
  muteNotificationSounds?: boolean;
}

export interface EmojiMetaData {
  name: string;
  emoji: string;
}

export interface PermissionSettings {
  enabled: boolean;
  kind?: 'audio' | 'video' | 'screenshare';
}

/**
 * Global States object which are shared among components
 */
export interface States {
  meeting?: 'idle' | 'setup' | 'joined' | 'ended' | 'waiting';
  viewType?: string;
  page?: number;
  maxPeers?: number;
  activeAI?: boolean;
  activeCaptions?: boolean;
  activeMoreMenu?: boolean;
  activeMuteAllConfirmation?: boolean;
  activePermissionsMessage?: PermissionSettings;
  activePlugin?: boolean;
  activeScreenShare?: boolean;
  activeSpotlight?: boolean;
  activeRemoteAccessManager?: boolean;
  activeSettings?: boolean;
  activeDebugger?: boolean;
  activeSidebar?: boolean;
  activeLeaveConfirmation?: boolean;
  activeBroadcastMessageModal?: boolean;
  activeOverlayModal?: {
    active: boolean;
    icon?: string;
    title?: string;
    description?: string;
    timeout?: number;
  };
  activeConfirmationModal?: {
    header?: keyof LangDict;
    active: boolean;
    content?: keyof LangDict;
    variant?: ButtonVariant;
    cancelText?: keyof LangDict;
    ctaText?: keyof LangDict;
    case?: string;
    data?: any;
    onClick?: (...args: any) => void;
    onClose?: (...args: any) => void;
  };
  activeBreakoutRoomsManager?: {
    active: boolean;
    mode?: 'create' | 'edit' | 'view';
    destinationMeetingId?: string;
  };
  activeJoinStage?: boolean;
  activeChannelCreator?: boolean;
  image?: ImageMessage;
  prefs?: UserPreferences;
  sidebar?: DyteSidebarSection;
  roomLeftState?: RoomLeftState;
  sidebarFloating?: boolean;
  [state: string]: any;
}

/**
 * Notification object type, which is used in `<dyte-notification />`.
 */
export interface Notification {
  id: string;
  message: string;
  image?: string;
  /** Duration in milliseconds, don't pass this if you want a stagnant notification */
  duration?: number;
  icon?: string;
  iconVariant?: IconVariant;
  button?: {
    text: string;
    variant?: ButtonVariant;
    onClick: () => void;
  };
}

export interface Transcript {
  id: string;
  name: string;
  peerId: string;
  userId: string;
  customParticipantId: string;
  transcript: string;
  // isPartialTranscript: string;
  date: Date;
}

export type NetworkError = 'disconnected' | 'poorConnection' | 'connected';

export type SocketEvents =
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
  | 'reconnectAttempt'
  | 'reconnectFailure'
  | 'reconnected'
  | 'failed';

export interface PollObject {
  question: string;
  options: string[];
  anonymous: boolean;
  hideVotes: boolean;
}

export interface PollOption {
  text: string;
  votes: { id: string; name: string }[];
  count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  anonymous: boolean;
  hideVotes: boolean;
  createdBy: string;
  createdByUserId: string;
  voted: string[];
}

export type ChatMessage = {
  type: 'chat';
  message: Message;
};

export type PluginMessage = {
  type: 'plugin';
  data: {};
};

export type Chat = ChatMessage | PluginMessage;

export type ConnectedMeeting = {
  id: string;
  title: string;
  participants: string[];
  isMainRoom?: boolean;
};

export interface ConnectedMeetingParticipant {
  id: string;
  customParticipantId: string;
  presetId?: string;
  displayName?: string;
  displayPictureUrl?: string;
}

export type ConnectedMeetingState = {
  parentMeeting: {
    id: string;
    title: string;
    participants: ConnectedMeetingParticipant[];
  };
  meetings: {
    id: string;
    title: string;
    participants: ConnectedMeetingParticipant[];
  }[];
};

export type ChatChannel = ChatChannelWebCore;

export interface Middlewares {
  speech?: any;
}
