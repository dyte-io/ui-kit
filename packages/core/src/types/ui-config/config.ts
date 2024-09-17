type NotificationTypeKey =
  | 'chat'
  | 'participant_joined'
  | 'participant_left'
  | 'polls'
  | 'participant_joined_waitlist'
  | 'webinar'
  | 'recording_started'
  | 'recording_stopped'
  | 'tab_sync';
type NotificationSoundsTypeKey =
  | 'chat'
  | 'participant_joined'
  | 'participant_left'
  | 'polls'
  | 'webinar'
  | 'participant_joined_waitlist';

export type NotificationType = Record<NotificationTypeKey, boolean>;
export type NotificationSoundsType = Record<NotificationSoundsTypeKey, boolean>;
export type NotificationDuration = Record<NotificationTypeKey, number>;

export interface NotificationConfig {
  notifications: Partial<NotificationType>;
  notification_sounds: Partial<NotificationSoundsType>;
  notification_duration: Partial<NotificationDuration>;

  /**
   * NOTE(callmetarush): This represents the limit of participants
   * that would send a **joined** sound notification, If limit is crossed no
   * new sound notifications will be played for participants joining until the
   * number of participants comes down below the limit.
   */
  participant_joined_sound_notification_limit: number;
  // NOTE(callmetarush): This represents the limit of participants
  // that would send a **chat** sound notification, If limit is crossed no
  // new sound notifications will be played for chat messages until the
  // number of participants comes down below the limit.
  participant_chat_message_sound_notification_limit: number;
}

export type VideoFit = 'cover' | 'contain';

export type Config = Partial<NotificationConfig> & {
  videoFit?: VideoFit;
};

export const DEFAULT_NOTIFICATION_DURATION = 2000;

export const DEFAULT_NOTIFICATION_CONFIG: Readonly<NotificationConfig> = Object.freeze({
  notifications: {
    participant_joined: true,
    participant_left: true,
    participant_joined_waitlist: true,
    chat: true,
    polls: true,
    webinar: true,
    tab_sync: true,
    recording_started: true,
    recording_stopped: true,
  },
  notification_sounds: {
    participant_joined: true,
    participant_left: true,
    chat: true,
    polls: true,
    webinar: true,
    participant_joined_waitlist: true,
  },
  notification_duration: {
    participant_joined: 2100,
    participant_left: 2100,
    participant_joined_waitlist: 4000,
    chat: DEFAULT_NOTIFICATION_DURATION,
    polls: DEFAULT_NOTIFICATION_DURATION,
    webinar: DEFAULT_NOTIFICATION_DURATION,
    tab_sync: DEFAULT_NOTIFICATION_DURATION,
    recording_started: DEFAULT_NOTIFICATION_DURATION,
    recording_stopped: DEFAULT_NOTIFICATION_DURATION,
  },
  participant_joined_sound_notification_limit: 10,
  participant_chat_message_sound_notification_limit: 10,
});
