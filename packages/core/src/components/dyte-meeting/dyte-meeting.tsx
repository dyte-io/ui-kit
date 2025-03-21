import { Component, h, Element, Listen, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import deepMerge from 'lodash-es/merge';
import { PermissionSettings, Size, States } from '../../types/props';
import { getSize } from '../../utils/size';
import { Meeting, RoomLeftState } from '../../types/dyte-client';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { UIConfig } from '../../types/ui-config';
import { defaultConfig } from '../../lib/default-ui-config';
import { Render } from '../../lib/render';
import { provideDyteDesignSystem } from '../../index';
import { generateConfig } from '../../utils/config';
import { GridLayout } from '../dyte-grid/dyte-grid';
import ResizeObserver from 'resize-observer-polyfill';
import { SyncWithStore } from '../../utils/sync-with-store';
import { uiState } from '../../utils/sync-with-store/ui-store';

export type MeetingMode = 'fixed' | 'fill';

/**
 * A single component which renders an entire meeting UI.
 *
 * It loads your preset and renders the UI based on it.
 * With this component, you don't have to handle all the states,
 * dialogs and other smaller bits of managing the application.
 */
@Component({
  tag: 'dyte-meeting',
  styleUrl: 'dyte-meeting.css',
  shadow: true,
})
export class DyteMeeting {
  private resizeObserver: ResizeObserver;

  private leaveRoomTimer: number;

  private roomJoinedListener = () => {
    this.updateStates({ meeting: 'joined' });
  };

  private waitlistedListener = () => {
    this.updateStates({ meeting: 'waiting' });
  };

  private roomLeftListener = ({ state }: { state: RoomLeftState }) => {
    // Let socketConnectionUpdate listener handle this case.
    if (state === 'disconnected' || state === 'failed') return;
    this.updateStates({ meeting: 'ended', roomLeftState: state });
  };

  private mediaPermissionUpdateListener = ({ kind, message }) => {
    if (['audio', 'video'].includes(kind)) {
      if (
        (message === 'DENIED' || message === 'SYSTEM_DENIED') &&
        uiState.states.activeDebugger !== true
      ) {
        const permissionModalSettings: PermissionSettings = {
          enabled: true,
          kind,
        };
        this.updateStates({ activePermissionsMessage: permissionModalSettings });
      }
    }
  };

  private socketConnectionUpdateListener = ({ state }) => {
    if (state === 'failed') {
      setTimeout(() => {
        this.meeting.leave('disconnected');
      }, this.leaveRoomTimer);
    }
  };

  @Element() host: HTMLDyteMeetingElement;

  /** Whether to load config from preset */
  @Prop({ mutable: true }) loadConfigFromPreset: boolean = false;

  /** Whether to apply the design system on the document root from config */
  @Prop({ mutable: true }) applyDesignSystem: boolean = false;

  /** Fill type */
  @Prop({ reflect: true }) mode: MeetingMode = 'fixed';

  /** Whether participant should leave when this component gets unmounted */
  @Prop() leaveOnUnmount = false;

  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Whether to show setup screen or not */
  @Prop({ mutable: true }) showSetupScreen: boolean;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** UI Config */
  @Prop({ mutable: true }) config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true, mutable: true }) size: Size;

  /** Grid layout */
  @Prop() gridLayout: GridLayout = 'row';

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** States */
  @Event({ eventName: 'dyteStatesUpdate' }) statesUpdate: EventEmitter<States>;

  connectedCallback() {
    this.leaveRoomTimer = 10000;
    this.loadConfigFromPreset = true;
    this.applyDesignSystem = true;
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.host);
    if (
      this.applyDesignSystem &&
      this.config?.designTokens != null &&
      typeof document !== 'undefined'
    ) {
      provideDyteDesignSystem(document.documentElement, this.config.designTokens);
    }
    this.meetingChanged(this.meeting);
  }

  private clearListeners(meeting: Meeting) {
    if (!meeting) return;
    meeting.self.removeListener('roomLeft', this.roomLeftListener);
    meeting.self.removeListener('roomJoined', this.roomJoinedListener);
    meeting.self.removeListener('waitlisted', this.waitlistedListener);
    meeting.self.removeListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
    meeting.meta.removeListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
  }

  disconnectedCallback() {
    if (this.leaveOnUnmount) {
      this.meeting?.leaveRoom();
    }
    this.resizeObserver.disconnect();
    this.clearListeners(this.meeting);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (!meeting) return;

    this.updateStates({ viewType: meeting.meta.viewType });

    if (this.loadConfigFromPreset && meeting.self.config != null) {
      const theme = meeting.self.config;
      const { config, data } = generateConfig(theme, meeting);

      if (this.config === defaultConfig) {
        // only override the config if the object is same as defaultConfig
        // which means it's a different object passed via prop
        this.config = config;
      }
      if (this.showSetupScreen == null) {
        // only override this value if the prop isn't passed
        this.showSetupScreen = data.showSetupScreen;
      }

      if (
        meeting.connectedMeetings.supportsConnectedMeetings &&
        uiState.states.activeBreakoutRoomsManager?.destinationMeetingId
      ) {
        this.showSetupScreen = false;
      }
    }

    if (
      this.applyDesignSystem &&
      this.config?.designTokens != null &&
      typeof document !== 'undefined'
    ) {
      provideDyteDesignSystem(document.documentElement, this.config.designTokens);
    }
    meeting.self.addListener('roomJoined', this.roomJoinedListener);
    meeting.self.addListener('waitlisted', this.waitlistedListener);
    meeting.self.addListener('roomLeft', this.roomLeftListener);
    meeting.self.addListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
    meeting.meta.addListener('socketConnectionUpdate', this.socketConnectionUpdateListener);

    if (meeting.connectedMeetings.supportsConnectedMeetings) {
      meeting.connectedMeetings.once('changingMeeting', this.handleChangingMeeting);
    }

    if (meeting.self.roomJoined) {
      this.updateStates({ meeting: 'joined' });
    } else {
      if (this.showSetupScreen) {
        this.updateStates({ meeting: 'setup' });
      } else {
        // join directly to the meeting
        meeting.joinRoom();
      }
    }
  }

  @Listen('dyteStateUpdate')
  listenState(e: CustomEvent<States>) {
    this.updateStates(e.detail);
  }

  private handleChangingMeeting(destinationMeetingId: string) {
    this.updateStates({
      activeBreakoutRoomsManager: {
        ...uiState.states.activeBreakoutRoomsManager,
        destinationMeetingId,
      },
    });
  }

  private handleResize() {
    this.size = getSize(this.host.clientWidth);
  }

  private updateStates(states: Partial<States>) {
    const newStates = Object.assign({}, uiState.states);
    uiState.states = deepMerge(newStates, states);
    this.statesUpdate.emit(uiState.states);
  }

  render() {
    const defaults = {
      meeting: this.meeting,
      size: this.size,
      states: uiState.states,
      config: this.config,
      iconPack: this.iconPack,
      t: this.t,
    };

    const elementProps = {
      'dyte-grid': {
        layout: this.gridLayout,
      },
    };

    if (uiState.states.viewType === 'CHAT') {
      return <Render element="dyte-chat" defaults={defaults} />;
    }

    return <Render element="dyte-meeting" defaults={defaults} asHost elementProps={elementProps} />;
  }
}
