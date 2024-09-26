import { Component, Host, h, State, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';

import {
  canViewChat,
  canViewParticipants,
  canViewPlugins,
  canViewPolls,
} from '../../utils/sidebar';
import { DyteSidebarTab, DyteSidebarView } from '../dyte-sidebar-ui/dyte-sidebar-ui';
import { Render } from '../../lib/render';
import { StageStatus } from '@dytesdk/web-core';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

export type DyteSidebarSection = 'chat' | 'polls' | 'participants' | 'plugins';

/**
 * A component which handles the sidebar and
 * you can customize which sections you want, and which section you want as the default.
 */
@Component({
  tag: 'dyte-sidebar',
  styleUrl: 'dyte-sidebar.css',
  shadow: true,
})
export class DyteSidebar {
  private componentPropsCleanupFn: () => void = () => {};
  private keydownListener: (e: KeyboardEvent) => void;

  private onStageStatusUpdate: (status: StageStatus) => void;

  /** Enabled sections in sidebar */
  @Prop({ mutable: true }) enabledSections: DyteSidebarTab[] = [];

  /** Default section */
  @Prop() defaultSection: DyteSidebarSection = 'chat';

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** View type */
  @Prop({ reflect: true }) view: DyteSidebarView = 'sidebar';

  @State() currentTab: DyteSidebarSection = this.defaultSection;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() isFloating: boolean = false;

  @State() enablePinning: boolean = true;

  connectedCallback() {
    this.viewChanged(this.view);
    this.statesChanged(this.states);
    this.meetingChanged(this.meeting);
    this.isFloating = DyteUIKitStore.state?.sidebarFloating || false;
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownListener);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.onStageStatusUpdate);
    this.onStageStatusUpdate = null;

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    this.updateEnabledSections(meeting);
    this.onStageStatusUpdate = (_status: StageStatus) => {
      this.updateEnabledSections(this.meeting);
    };

    this.meeting?.stage?.on('stageStatusUpdate', this.onStageStatusUpdate);
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || DyteUIKitStore.state;
    if (states?.sidebar) {
      this.currentTab = states.sidebar;
    }
  }

  @Watch('view')
  viewChanged(view: DyteSidebarView) {
    if (view === 'full-screen') {
      this.enablePinning = false;
      this.keydownListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.keydownListener);
    } else {
      this.enablePinning = true;
    }
  }

  private getTabs = () => {
    if (!this.meeting.self.config) {
      return this.enabledSections;
    }

    return this.enabledSections.filter(
      (section) => this.meeting.self.config.controlBar.elements[section.id]
    );
  };

  private viewSection(section: DyteSidebarSection) {
    this.currentTab = section;
    this.stateUpdate.emit({ activeSidebar: true, sidebar: this.currentTab });
    DyteUIKitStore.state.activeSidebar = true;
    DyteUIKitStore.state.sidebar = this.currentTab;
  }

  private close = () => {
    this.stateUpdate.emit({ activeSidebar: false, sidebar: this.defaultSection });
    DyteUIKitStore.state.sidebar = this.currentTab;
    DyteUIKitStore.state.activeSidebar = false;
  };

  private updateEnabledSections(meeting: Meeting = this.meeting) {
    const list: DyteSidebarTab[] = [];
    if (canViewChat(meeting)) {
      list.push({ id: 'chat', name: this.t('chat') });
    }
    if (canViewPolls(meeting)) {
      list.push({ id: 'polls', name: this.t('polls') });
    }
    if (canViewParticipants(meeting)) {
      list.push({ id: 'participants', name: this.t('participants') });
    }
    if (canViewPlugins(meeting)) {
      list.push({ id: 'plugins', name: this.t('plugins') });
    }
    this.enabledSections = list;
  }

  private toggleFloating = () => {
    this.isFloating = !this.isFloating;
    DyteUIKitStore.state.sidebarFloating = this.isFloating;
  };

  render() {
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states || DyteUIKitStore.state,
      size: this.size,
      t: this.t,
      iconPack: this.iconPack,
    };

    // NOTE(ishita1805): This makes it easier to use the sidebar component in isolation.
    if (defaults.states?.activeSidebar === false || !this.currentTab) {
      return null;
    }

    return (
      <Host class={this.enablePinning ? (this.isFloating ? 'floating' : '') : 'floating'}>
        <dyte-sidebar-ui
          tabs={this.getTabs()}
          currentTab={this.currentTab}
          view={this.view}
          onTabChange={(e) => {
            this.viewSection(e.detail as DyteSidebarSection);
          }}
          onSidebarClose={this.close}
        >
          {this.enablePinning && (
            <div class="pinned-state" slot="pinned-state">
              <dyte-button
                variant="ghost"
                kind="icon"
                onClick={this.toggleFloating}
                aria-label={this.isFloating ? this.t('pin') : this.t('unpin')}
              >
                <dyte-icon icon={this.isFloating ? this.iconPack.pin : this.iconPack.pin_off} />
              </dyte-button>
            </div>
          )}
          {defaults.states.sidebar === 'chat' && (
            <Render element="dyte-chat" defaults={defaults} props={{ slot: 'chat' }} />
          )}
          {defaults.states.sidebar === 'polls' && (
            <Render element="dyte-polls" defaults={defaults} props={{ slot: 'polls' }} />
          )}
          {defaults.states.sidebar === 'participants' && (
            <Render
              element="dyte-participants"
              defaults={defaults}
              props={{ slot: 'participants' }}
            />
          )}
          {defaults.states.sidebar === 'plugins' && (
            <Render element="dyte-plugins" defaults={defaults} props={{ slot: 'plugins' }} />
          )}
        </dyte-sidebar-ui>
      </Host>
    );
  }
}
