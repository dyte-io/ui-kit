import { Component, Host, h, State, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultConfig } from '../../lib/default-ui-config';
import {
  canViewChat,
  canViewParticipants,
  canViewPlugins,
  canViewPolls,
} from '../../utils/sidebar';
import { DyteSidebarTab, DyteSidebarView } from '../dyte-sidebar-ui/dyte-sidebar-ui';
import { SyncWithStore } from '../../utils/sync-with-store';
import { StageStatus } from '@dytesdk/web-core';
import { Render } from '../../lib/render';

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
  private keydownListener: (e: KeyboardEvent) => void;

  private onStageStatusUpdate: (status: StageStatus) => void;

  /** Enabled sections in sidebar */
  @Prop({ mutable: true }) enabledSections: DyteSidebarTab[] = [];

  /** Default section */
  @Prop() defaultSection: DyteSidebarSection = 'chat';

  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

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
    this.isFloating = this.states?.sidebarFloating || false;
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownListener);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.onStageStatusUpdate);
    this.onStageStatusUpdate = null;
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
    const states = s;
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
  }

  private close = () => {
    this.stateUpdate.emit({ activeSidebar: false, sidebar: this.defaultSection });
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
  };

  render() {
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
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
          {defaults.states.sidebar === 'polls' && <dyte-polls {...defaults} slot="polls" />}
          {defaults.states.sidebar === 'participants' && (
            <Render
              element="dyte-participants"
              defaults={defaults}
              props={{ slot: 'participants' }}
            />
          )}
          {defaults.states.sidebar === 'plugins' && <dyte-plugins {...defaults} slot="plugins" />}
        </dyte-sidebar-ui>
      </Host>
    );
  }
}
