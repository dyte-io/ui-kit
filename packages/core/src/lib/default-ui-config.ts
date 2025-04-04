import { UIConfig } from '../types/ui-config';

/**
 * The default UI Config
 */
export const defaultConfig: UIConfig = {
  designTokens: {
    spacingBase: 4,
    googleFont: 'Inter',
  },
  styles: {
    // 'dyte-meeting': {
    // NOTE(vaibhavshn): required for mobile devices with static positioning
    // not required for fixed position
    // height: '-webkit-fill-available',
    // },
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
      height: '48px',
      wordBreak: 'break-all',
    },
    'dyte-logo': {
      height: '26px',
    },
    'div#header-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      wordBreak: 'break-all',
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
      flex: '1',
      height: 'auto',
    },
    'dyte-controlbar': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gridTemplateRows: '1fr',
      alignItems: 'center',
      padding: '8px',
    },
    'dyte-controlbar.sm': {
      display: 'flex',
      position: 'relative',
      backgroundColor: 'rgb(var(--dyte-colors-background-1000, 0 0 0))',
    },
    'dyte-controlbar.md': {
      display: 'flex',
      position: 'relative',
      backgroundColor: 'rgb(var(--dyte-colors-background-1000, 0 0 0))',
    },
    'div#controlbar-left': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--dyte-space-1, 4px)',
    },
    'div#controlbar-center': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--dyte-space-1, 4px)',
      position: 'relative',
      overflow: 'visible',
      justifyContent: 'center',
    },
    'div#controlbar-mobile': {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      gap: 'var(--dyte-space-1, 4px)',
      justifyContent: 'center',
    },
    'div#controlbar-right': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--dyte-space-1, 4px)',
      justifyContent: 'flex-end',
    },
    'dyte-settings': {
      width: '720px',
      height: '480px',
    },
    'dyte-debugger': {
      width: '720px',
      height: '480px',
    },
    'dyte-breakout-rooms-manager': {
      minHeight: '400px',
      minWidth: '500px',
      maxWidth: '80%',
      maxHeight: '480px',
    },
    'div#setupcontrols-media': {
      position: 'absolute',
      bottom: '8px',
      right: '8px',
      display: 'flex',
      gap: '4px',
    },
    'div#setupcontrols-settings': {
      position: 'absolute',
      top: '8px',
      right: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    'dyte-meeting-title.sm': {
      marginLeft: '0',
    },
    'dyte-clock': {
      marginRight: '0',
    },
  },
  root: {
    'dyte-meeting': {
      // if using key value pair, provide the key in `state`
      // else provide array of states in `states`
      state: 'meeting',
      states: ['activeSidebar', 'activeAI'],
    },
    'dyte-meeting[meeting=waiting]': ['dyte-waiting-screen'],
    'dyte-meeting[meeting=idle]': ['dyte-idle-screen'],
    'dyte-meeting[meeting=setup]': ['dyte-setup-screen', 'dyte-dialog-manager'],
    'dyte-meeting[meeting=joined]': [
      'dyte-header',
      'dyte-stage',
      'dyte-controlbar',
      'dyte-participants-audio',
      'dyte-dialog-manager',
    ],
    'dyte-meeting[meeting=joined].activeSidebar.sm': {
      add: [['dyte-sidebar', { view: 'full-screen' }]],
    },
    'dyte-meeting[meeting=joined].activeSidebar.md': {
      add: [['dyte-sidebar', { view: 'full-screen' }]],
    },
    'dyte-meeting[meeting=joined].activeAI.sm': {
      add: [['dyte-ai', { view: 'full-screen' }]],
    },
    'dyte-meeting[meeting=joined].activeAI.md': {
      add: [['dyte-ai', { view: 'full-screen' }]],
    },

    'dyte-meeting[meeting=ended]': ['dyte-ended-screen'],

    'dyte-header': ['div#header-left', 'div#header-center', 'div#header-right'],
    'dyte-header.sm': { remove: ['div#header-center'] },

    'div#header-left': ['dyte-logo', 'dyte-recording-indicator', 'dyte-livestream-indicator'],
    'div#header-center': ['dyte-meeting-title'],
    'div#header-right': [
      'dyte-grid-pagination',
      'dyte-clock',
      'dyte-participant-count',
      'dyte-viewer-count',
    ],

    'div#header-left.sm': [
      'dyte-meeting-title',
      'dyte-recording-indicator',
      'dyte-livestream-indicator',
    ],

    'dyte-stage': {
      states: ['activeSidebar', 'activeAI'],
      children: ['dyte-grid', 'dyte-notifications', 'dyte-transcripts'],
    },

    'dyte-stage.activeSidebar': {
      add: [['dyte-sidebar', { view: 'sidebar' }]],
    },

    // hide sidebar for smaller screens
    'dyte-stage.activeSidebar.sm': { remove: ['dyte-sidebar'] },

    'dyte-stage.activeAI': {
      add: [['dyte-ai', { view: 'sidebar' }]],
    },

    // hide sidebar for smaller screens
    'dyte-stage.activeAI.sm': { remove: ['dyte-ai'] },

    'dyte-grid': {
      states: ['activeScreenShare', 'activePlugin', 'activeSpotlight'],
      children: ['dyte-simple-grid'],
    },

    'dyte-grid.activeSpotlight': ['dyte-spotlight-grid'],

    'dyte-grid.activeScreenShare': ['dyte-mixed-grid'],
    'dyte-grid.activePlugin': ['dyte-mixed-grid'],

    'dyte-grid.activeScreenShare.activeSpotlight': ['dyte-mixed-grid'],
    'dyte-grid.activePlugin.activeSpotlight': ['dyte-mixed-grid'],
    'dyte-grid.activePlugin.activeScreenShare.activeSpotlight': ['dyte-mixed-grid'],

    'dyte-mixed-grid': {
      states: ['activeSpotlight'],
      children: ['dyte-simple-grid'],
    },

    'dyte-mixed-grid.activeSpotlight': ['dyte-spotlight-grid'],

    'dyte-participant-tile': {
      state: 'meeting',
      children: ['dyte-name-tag', 'dyte-avatar', 'dyte-network-indicator'],
    },

    'dyte-participant-setup': ['dyte-avatar', 'div#setupcontrols-media'],
    'dyte-participant-tile[meeting=setup]': [
      'dyte-avatar',
      'div#setupcontrols-settings',
      'div#setupcontrols-media',
    ],

    'div#setupcontrols-media': [
      ['dyte-mic-toggle', { size: 'sm' }],
      ['dyte-camera-toggle', { size: 'sm' }],
    ],
    'div#setupcontrols-settings': [['dyte-settings-toggle', { size: 'sm' }]],
    'dyte-screenshare-view': {
      children: ['dyte-name-tag', 'dyte-network-indicator'],
    },

    'dyte-name-tag': [['dyte-audio-visualizer', { slot: 'start' }]],

    'dyte-controlbar': {
      states: ['activeMoreMenu'],
      props: {
        variant: 'solid',
      },
      children: ['div#controlbar-left', 'div#controlbar-center', 'div#controlbar-right'],
    },

    'dyte-more-toggle': {
      states: ['activeMoreMenu'],
      children: [],
    },

    'dyte-controlbar.sm': ['div#controlbar-mobile'],
    'dyte-controlbar.md': ['div#controlbar-mobile'],

    'dyte-more-toggle.activeMoreMenu': [
      ['dyte-fullscreen-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-pip-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-caption-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-mute-all-button', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-breakout-rooms-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-recording-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-debugger-toggle', { variant: 'horizontal' }],
    ],

    'dyte-more-toggle.activeMoreMenu.sm': [
      ['dyte-chat-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-participants-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-polls-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-plugins-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-fullscreen-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-screen-share-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-pip-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-caption-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-mute-all-button', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-breakout-rooms-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-settings-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-ai-toggle', { variant: 'horizontal' }],
      ['dyte-debugger-toggle', { variant: 'horizontal' }],
    ],
    'dyte-more-toggle.activeMoreMenu.md': [
      ['dyte-chat-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-participants-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-polls-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-plugins-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-fullscreen-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-screen-share-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-pip-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-caption-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-mute-all-button', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-breakout-rooms-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-settings-toggle', { variant: 'horizontal', slot: 'more-elements' }],
      ['dyte-ai-toggle', { variant: 'horizontal' }],
      ['dyte-debugger-toggle', { variant: 'horizontal' }],
    ],

    'div#controlbar-mobile': [
      'dyte-mic-toggle',
      'dyte-camera-toggle',
      'dyte-webinar-stage-toggle',
      'dyte-stage-toggle',
      'dyte-leave-button',
      'dyte-more-toggle',
    ],
    'div#controlbar-left': [
      'dyte-settings-toggle',
      'dyte-screen-share-toggle',
      'dyte-livestream-toggle',
    ],
    'div#controlbar-center': [
      'dyte-mic-toggle',
      'dyte-camera-toggle',
      'dyte-webinar-stage-toggle',
      'dyte-stage-toggle',
      'dyte-more-toggle',
      'dyte-leave-button',
    ],
    'div#controlbar-right': [
      'dyte-chat-toggle',
      'dyte-polls-toggle',
      'dyte-participants-toggle',
      'dyte-plugins-toggle',
      'dyte-ai-toggle',
    ],
  },
  config: {
    notification_sounds: {
      participant_left: false,
    },
    participant_joined_sound_notification_limit: 10,
    participant_chat_message_sound_notification_limit: 10,
    videoFit: 'cover',
  },
};
