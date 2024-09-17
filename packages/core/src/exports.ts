import statesStore from './lib/store';

// utilities
import BreakoutRoomsManager from './utils/breakout-rooms-manager';
export { BreakoutRoomsManager };
export { provideDyteDesignSystem } from './utils/provide-design-system';
export { extendConfig, generateConfig } from './utils/config';
export { sendNotification } from './utils/notification';
export { DyteUIBuilder } from './lib/builder';
export { onChange as onStateStoreChange } from './lib/store';
export { statesStore };

// addons
export { registerAddons, Addon } from './lib/addons';

// types
export { UIConfig } from './types/ui-config';
export { States, Notification, Size, UserPreferences, PollObject } from './types/props';
export { Peer } from './types/dyte-client';

// UIConfig, Icon Pack, i18n and Notification Sounds
export { defaultConfig } from './lib/default-ui-config';
export { IconPack, defaultIconPack } from './lib/icons';
export { LangDict, defaultLanguage, DyteI18n, useLanguage } from './lib/lang';
export { Sound, default as DyteNotificationsAudio } from './lib/notification';

export {
  generateChatGroupKey,
  getChatGroups,
  getUnreadChatCounts,
  getParticipantUserId,
} from './utils/chat';

// NOTE(vaibhavshn): fixes angular output type errors
export type { DyteNewMessageEvent } from './components/dyte-chat-composer-ui/dyte-chat-composer-ui';
export type { NewMessageEvent } from './components/dyte-chat-composer-view/dyte-chat-composer-view';
export type { ChatGroupChangedType } from './components/dyte-chat-selector-ui/dyte-chat-selector-ui';
export type { Tab } from './components/dyte-tab-bar/dyte-tab-bar';

// web-core exports
export type { Message, FileMessage, ImageMessage, TextMessage } from '@dytesdk/web-core';
