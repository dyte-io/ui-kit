import type { DyteThemePreset, DytePermissionsPreset } from '@dytesdk/web-core';
import { defaultConfig } from '../lib/default-ui-config';
import { UIConfig } from '../types/ui-config';
import { DesignTokens } from '../types/ui-config/design-tokens';
import { isValidHexColor } from './color';
import deepMerge from 'lodash-es/merge';
import { Meeting } from '../types/dyte-client';
import { isLiveStreamHost } from './livestream';
import { canToggleBreakout } from './breakout-rooms';

/**
 * Extend the default UI Config with your own
 * @param config Your extended UI Config
 * @returns New extended UI Config object
 */
export const extendConfig = (config: UIConfig, baseConfig: UIConfig = defaultConfig) => {
  let newConfig = Object.assign({}, baseConfig);

  deepMerge(newConfig, config);

  return newConfig;
};

type ConfigData = {
  showSetupScreen: boolean;
};

type ConfigOptions = {
  grid_pagination?: boolean;
  settings_toggle?: boolean;
};

/**
 * Generates a config with older theme value.
 * @param oldConfig Theme object
 * @param toExtend UI Config object to extend the generated config
 * @param options Options for toggling components
 * @returns
 */
export const generateConfig = (
  oldConfig: Partial<DyteThemePreset>,
  meeting: Meeting,
  toExtend: UIConfig = {},
  options: ConfigOptions = { grid_pagination: true, settings_toggle: true }
): { config: UIConfig; data: ConfigData } => {
  const data: ConfigData = { showSetupScreen: true };

  let logo: string;

  let meetingElements = ['dyte-stage'];

  let headerChildren = {},
    controlBarChildren = {};

  const showSettingsToggle = options?.settings_toggle !== false;
  const showGridPagination = options?.grid_pagination !== false;

  if (oldConfig.controlBar?.isEnabled) {
    meetingElements.push('dyte-controlbar');

    const { elements } = oldConfig.controlBar;

    const leftElements = [
      ...(elements.fullscreen ? ['dyte-fullscreen-toggle'] : []),
      ...(showSettingsToggle ? ['dyte-settings-toggle'] : []),
    ];
    const rightElements = [];
    const moreElements = [];
    if (
      meeting.participants.pip?.isSupported() &&
      meeting.self?.config?.pipMode &&
      meeting.self.config?.viewType !== 'LIVESTREAM'
    ) {
      moreElements.push('dyte-pip-toggle');
    }

    if (meeting?.self.permissions.canDisableParticipantAudio) {
      moreElements.push('dyte-mute-all-button');
    }

    if (canToggleBreakout(meeting)) {
      moreElements.push('dyte-breakout-rooms-toggle');
    }

    if (meeting.self?.permissions.canRecord) {
      moreElements.push('dyte-recording-toggle');
    }

    if ((meeting.self.permissions as DytePermissionsPreset).transcriptionEnabled ?? false) {
      moreElements.push('dyte-caption-toggle');
    }

    if (navigator.product !== 'ReactNative') moreElements.push('dyte-debugger-toggle');

    if (isLiveStreamHost(meeting)) {
      leftElements.push('dyte-livestream-toggle');
    }

    if (elements.screenshare) {
      leftElements.push('dyte-screen-share-toggle');
    }

    if (elements.chat) {
      rightElements.push('dyte-chat-toggle');
    }

    if (elements.polls) {
      rightElements.push('dyte-polls-toggle');
    }

    if (elements.participants) {
      rightElements.push('dyte-participants-toggle');
    }

    if (elements.plugins) {
      rightElements.push('dyte-plugins-toggle');
    }

    rightElements.push('dyte-ai-toggle');

    // NOTE(ishita1805): No condition as permission check happens within component
    const centerElements = [
      'dyte-mic-toggle',
      'dyte-camera-toggle',
      'dyte-stage-toggle',
      'dyte-leave-button',
    ];

    if (moreElements.length > 0) centerElements.push('dyte-more-toggle');

    const allSideElements = leftElements.concat(rightElements).concat(moreElements);

    let hasMobileDrawer = false;

    if (allSideElements.length > 0) {
      hasMobileDrawer = true;
    }

    controlBarChildren = {
      'dyte-controlbar': {
        states: ['activeMoreMenu'],
        children: ['div#controlbar-left', 'div#controlbar-center', 'div#controlbar-right'],
      },
      'div#controlbar-left': leftElements,
      'div#controlbar-center': centerElements,
      'div#controlbar-right': rightElements,
      'dyte-more-toggle': {
        states: ['activeMoreMenu'],
        children: [],
      },
      'dyte-more-toggle.activeMoreMenu': moreElements.map((el) => [
        el,
        { variant: 'horizontal', slot: 'more-elements' },
      ]),
      'dyte-controlbar.sm': ['div#controlbar-mobile'],
      'dyte-controlbar.md': ['div#controlbar-mobile'],

      'dyte-more-toggle.activeMoreMenu.md': allSideElements.map((el) => [
        el,
        { variant: 'horizontal', slot: 'more-elements' },
      ]),
      'dyte-more-toggle.activeMoreMenu.sm': allSideElements.map((el) => [
        el,
        { variant: 'horizontal', slot: 'more-elements' },
      ]),

      'div#controlbar-mobile': [
        'dyte-mic-toggle',
        'dyte-camera-toggle',
        'dyte-stage-toggle',
        ...[hasMobileDrawer && 'dyte-more-toggle'],
        'dyte-leave-button',
      ],
    };
  }

  if (oldConfig.header?.isEnabled) {
    meetingElements.unshift('dyte-header');

    const { elements } = oldConfig.header;

    let leftElements = ['dyte-recording-indicator', 'dyte-livestream-indicator'],
      centerElements = [],
      rightElements = [];

    if (showGridPagination) {
      rightElements.push('dyte-grid-pagination');
    }

    if (elements.title) {
      centerElements.push('dyte-meeting-title');
    }

    if (typeof elements.logo === 'string' && elements.logo.length > 0) {
      logo = elements.logo;
      leftElements.unshift('dyte-logo');
    }

    if (elements.participantCount) {
      rightElements.push('dyte-participant-count', 'dyte-viewer-count');
    }

    if (elements.timer) {
      rightElements.push('dyte-clock');
    }

    headerChildren = {
      'dyte-header': ['div#header-left', 'div#header-center', 'div#header-right'],
      'dyte-header.sm': { remove: ['div#header-center'] },

      'div#header-left': leftElements,
      'div#header-center': centerElements,
      'div#header-right': rightElements,

      'div#header-left.sm': {
        remove: ['dyte-logo'],
        prepend: ['dyte-meeting-title'],
      },
    };
  }

  meetingElements.push('dyte-participants-audio', 'dyte-dialog-manager');

  let designTokens: DesignTokens = {
    logo,
  };

  designTokens = oldConfig.designTokens;

  if (isValidHexColor(oldConfig?.designTokens?.colors?.textOnBrand)) {
    designTokens.colors['text-on-brand'] = oldConfig?.designTokens?.colors?.textOnBrand;
  }
  if (isValidHexColor(oldConfig?.designTokens?.colors?.videoBg)) {
    designTokens.colors['video-bg'] = oldConfig?.designTokens?.colors?.videoBg;
  }

  let config: UIConfig = {
    designTokens,
    styles: {
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
        backgroundColor: 'var(--dyte-colors-background-1000, #000)',
      },
      'dyte-controlbar.md': {
        display: 'flex',
        position: 'relative',
        backgroundColor: 'var(--dyte-colors-background-1000, #000)',
      },
      'div#controlbar-left': {
        display: 'flex',
        alignItems: 'center',
      },
      'div#controlbar-center': {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible',
        justifyContent: 'center',
      },
      'div#controlbar-mobile': {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
      },
      'div#controlbar-right': {
        display: 'flex',
        alignItems: 'center',
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
      'div#setupcontrols-indicator': {
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        display: 'flex',
        gap: '6px',
        background: 'rgb(var(--dyte-colors-background-800, 0 0 0))',
        borderRadius: '100%',
      },
      'div#setupcontrols-media': {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        display: 'flex',
        gap: '6px',
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
      'dyte-meeting[meeting=idle]': ['dyte-idle-screen'],
      'dyte-meeting[meeting=waiting]': ['dyte-waiting-screen'],
      'dyte-meeting[meeting=setup]': ['dyte-setup-screen', 'dyte-dialog-manager'],
      'dyte-meeting[meeting=joined]': meetingElements,
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

      ...headerChildren,
      ...controlBarChildren,

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
        state: 'viewType',
        children: ['dyte-simple-grid'],
      },

      'dyte-grid[viewType=AUDIO_ROOM]': ['dyte-audio-grid'],

      'dyte-grid[viewType=AUDIO_ROOM].activePlugin': ['dyte-mixed-grid'],
      'dyte-grid[viewType=AUDIO_ROOM].activeScreenshare': ['dyte-mixed-grid'],
      'dyte-grid[viewType=AUDIO_ROOM].activeScreenShare.activeSpotlight': ['dyte-mixed-grid'],
      'dyte-grid[viewType=AUDIO_ROOM].activePlugin.activeSpotlight': ['dyte-mixed-grid'],
      'dyte-grid[viewType=AUDIO_ROOM].activePlugin.activeScreenShare.activeSpotlight': [
        'dyte-mixed-grid',
      ],

      'dyte-grid.activeSpotlight': ['dyte-spotlight-grid'],

      'dyte-grid.activeScreenShare': ['dyte-mixed-grid'],
      'dyte-grid.activePlugin': ['dyte-mixed-grid'],

      'dyte-grid.activeScreenShare.activeSpotlight': ['dyte-mixed-grid'],
      'dyte-grid.activePlugin.activeSpotlight': ['dyte-mixed-grid'],
      'dyte-grid.activePlugin.activeScreenShare.activeSpotlight': ['dyte-mixed-grid'],

      'dyte-mixed-grid': {
        states: ['activeSpotlight'],
        state: 'viewType',
        children: ['dyte-simple-grid'],
      },

      'dyte-mixed-grid[viewType=AUDIO_ROOM]': ['dyte-audio-grid'],

      'dyte-mixed-grid.activeSpotlight': ['dyte-spotlight-grid'],

      'dyte-participant-tile': {
        state: 'meeting',
        children: ['dyte-name-tag', 'dyte-avatar', 'dyte-network-indicator'],
      },

      'dyte-participant-setup': ['dyte-avatar', 'div#setupcontrols-media'],

      'dyte-participant-tile[meeting=setup]': [
        'dyte-avatar',
        'div#setupcontrols-indicator',
        'div#setupcontrols-media',
        ...(showSettingsToggle ? ['div#setupcontrols-settings'] : []),
      ],
      'div#setupcontrols-indicator': [
        ['dyte-audio-visualizer', { slot: 'start', hideMuted: true }],
      ],
      'div#setupcontrols-media': [
        ['dyte-mic-toggle', { size: 'sm' }],
        ['dyte-camera-toggle', { size: 'sm' }],
      ],
      'div#setupcontrols-settings': [
        ['dyte-settings-toggle', { size: 'sm' }],
        ['dyte-debugger-toggle', { size: 'sm' }],
      ],

      'dyte-screenshare-view': ['dyte-name-tag', 'dyte-network-indicator'],

      'dyte-name-tag': [['dyte-audio-visualizer', { slot: 'start' }]],
    },
    config: {
      notification_sounds: {
        participant_left: false,
      },
      participant_joined_sound_notification_limit: 3,
      participant_chat_message_sound_notification_limit: 10,
      videoFit: 'cover',
    },
  };

  config = extendConfig(toExtend, config);

  data.showSetupScreen = oldConfig.setupScreen?.isEnabled ?? true;

  return { config, data };
};
