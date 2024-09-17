import { UIConfig } from '@dytesdk/ui-kit/dist/types/types/ui-config';

export const config: UIConfig = {
  styles: {
    'dyte-logo': {
      height: '24px',
      width: '72px',
    },
    'dyte-meeting': {
      width: '100%',
      height: '100vh',
    },
    'dyte-meeting[meeting=joined]': {
      display: 'flex',
      flexDirection: 'column',
    },
    'dyte-header': {
      display: 'grid',
      height: '48px',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: '1fr',
      alignItems: 'center',
    },
    'dyte-header.sm': {
      display: 'grid',
      gridArea: 'header',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: '1fr',
      alignItems: 'center',
    },
    'div#header-left': {
      display: 'flex',
      alignItems: 'center',
    },
    'div#header-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    'div#header-right': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    'dyte-stage': {
      display: 'flex',
      flex: '1',
    },
    'dyte-grid': {
      'flex-grow': '1',
      'flex-basis': '1',
    },
    'dyte-controlbar': {
      display: 'grid',
      height: '76px',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridTemplateRows: '1fr',
      alignItems: 'center',
      padding: '8px',
    },
    'div#controlbar-left': {
      display: 'flex',
      alignItems: 'center',
    },
    'div#controlbar-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    'div#controlbar-right': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    'div#settings-modal': {
      position: 'fixed',
      inset: '0',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      padding: '0 24px',
      backgroundColor: 'rgba(var(--dyte-colors-background-1000, 0 0 0) / 0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(12px)',
      zIndex: '100',
    },
    'dyte-settings': {
      width: '100%',
      maxWidth: '720px',
      height: '100%',
      maxHeight: '480px',
    },
    'div#leave-meeting-modal': {
      position: 'fixed',
      inset: '0',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      padding: '0 24px',
      backgroundColor: 'rgba(var(--dyte-colors-background-1000, 0 0 0) / 0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(12px)',
    },
  },
  root: {
    'dyte-meeting': {
      // if using key value pair, provide the key in `state`
      // else provide array of states in `states`
      state: 'meeting',
      states: ['activeSettings', 'activeLeaveConfirmation', 'activeSidebar'],
    },
    'dyte-meeting[meeting=idle]': ['dyte-idle-screen'],
    'dyte-meeting[meeting=setup]': ['dyte-setup-screen'],
    'dyte-meeting[meeting=joined]': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-notifications',
      'dyte-spotlight-indicator',
      'dyte-participants-audio',
    ],
    'dyte-meeting[meeting=joined].activeSettings': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-notifications',
      'dyte-spotlight-indicator',
      'dyte-participants-audio',
      'div#settings-modal',
    ],
    'dyte-meeting[meeting=joined].activeSidebar.sm': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-notifications',
      'dyte-spotlight-indicator',
      'dyte-participants-audio',
      ['dyte-sidebar', { view: 'full-screen' }],
    ],
    'dyte-meeting[meeting=joined].activeSettings.activeSidebar.sm': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-notifications',
      'dyte-spotlight-indicator',
      'dyte-participants-audio',
      'div#settings-modal',
      ['dyte-sidebar', { view: 'full-screen' }],
    ],
    'dyte-meeting[meeting=joined].activeLeaveConfirmation': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-notifications',
      'dyte-spotlight-indicator',
      'dyte-participants-audio',
      'div#leave-meeting-modal',
    ],
    'dyte-meeting[meeting=ended]': ['dyte-ended-screen'],

    'div#settings-modal': ['dyte-settings'],

    'div#leave-meeting-modal': ['dyte-leave-meeting'],

    'dyte-header': {
      children: ['div#header-left', 'div#header-center', 'div#header-right'],
    },
    'dyte-header.sm': ['div#header-left', 'div#header-right'],

    'div#header-left': ['dyte-logo'],
    'div#header-center': ['dyte-meeting-title'],
    'div#header-right': [
      'dyte-grid-pagination',
      'dyte-clock',
      'dyte-participant-count',
      'dyte-viewer-count',
    ],

    'dyte-stage': {
      states: ['activeSidebar'],
      children: ['dyte-grid'],
    },
    'dyte-stage.activeSidebar': ['dyte-grid', 'dyte-sidebar'],

    // hide sidebar for smaller screens
    'dyte-stage.activeSidebar.sm': ['dyte-grid'],

    'dyte-participant-tile': {
      children: ['dyte-name-tag', 'dyte-avatar'],
    },

    'dyte-screenshare-view': {
      children: ['dyte-name-tag'],
    },

    'dyte-name-tag': [['dyte-audio-visualizer', { slot: 'start' }]],

    'dyte-controlbar': {
      props: {
        variant: 'solid',
      },
      children: ['div#controlbar-left', 'div#controlbar-center', 'div#controlbar-right'],
    },

    'div#controlbar-left': ['dyte-leave-button', 'dyte-screen-share-toggle'],
    'div#controlbar-center': ['dyte-mic-toggle', 'dyte-camera-toggle', 'dyte-settings-toggle'],
    'div#controlbar-right': ['dyte-chat-toggle', 'dyte-participants-toggle', 'dyte-plugins-toggle'],
  },
  config: {
    notifications: ['chat', 'participant_joined', 'participant_left'],
    notification_sounds: ['chat', 'participant_joined'],
  },
};
