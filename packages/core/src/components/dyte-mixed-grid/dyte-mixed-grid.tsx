import { DytePlugin } from '@dytesdk/web-core';
import type { ActiveTab, ActiveTabType } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';

import { defaultGridSize } from '../../lib/grid';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Render } from '../../lib/render';
import { Meeting, Peer } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { GridLayout, GridSize } from '../dyte-grid/dyte-grid';
import type { Tab } from '../dyte-tab-bar/dyte-tab-bar';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A grid component which handles screenshares, plugins and participants.
 */
@Component({
  tag: 'dyte-mixed-grid',
  styleUrl: 'dyte-mixed-grid.css',
  shadow: true,
})
export class DyteMixedGrid {
  private componentPropsCleanupFn: () => void = () => {};
  private activeTabUpdateListener: (data: ActiveTab) => void;

  /** Grid Layout */
  @Prop({ reflect: true }) layout: GridLayout = 'row';

  /** Participants */
  @Prop() participants: Peer[] = [];

  /** Pinned Participants */
  @Prop() pinnedParticipants: Peer[] = [];

  /** Screenshare Participants */
  @Prop() screenShareParticipants: Peer[] = [];

  /** Active Plugins */
  @Prop() plugins: DytePlugin[] = [];

  /**
   * Aspect Ratio of participant tile
   *
   * Format: `width:height`
   */
  @Prop() aspectRatio: string = '16:9';

  /** Gap between participant tiles */
  @Prop() gap: number = 8;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** UI Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Icon Pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Grid size */
  @Prop() gridSize: GridSize = defaultGridSize;

  @State() activeTab: Tab;

  @State() initialised: boolean;

  @Element() host: HTMLDyteMixedGridElement;

  componentWillLoad() {
    // initialise states
    this.initialised = false;
    this.screenShareParticipantsChanged(this.screenShareParticipants);
    this.pluginsChanged(this.plugins);
    this.initialised = true;
  }

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.meeting.meta?.removeListener('activeTabUpdate', this.activeTabUpdateListener);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      if (meeting.meta?.selfActiveTab != undefined) {
        this.onActiveTabUpdate(meeting.meta.selfActiveTab?.type, meeting.meta.selfActiveTab?.id);
      }

      this.activeTabUpdateListener = (activeTab) => {
        this.onActiveTabUpdate(activeTab?.type, activeTab?.id);
      };

      meeting.meta?.addListener('activeTabUpdate', this.activeTabUpdateListener);
    }
  }

  @Watch('screenShareParticipants')
  screenShareParticipantsChanged(participants: Peer[] = []) {
    // If active tab has already been initialised by spotlight then don't change tab.
    if (!this.initialised && this.activeTab != null) return;

    if (this.activeTab == null && participants.length > 0) {
      this.setActiveTab({ type: 'screenshare', participant: participants[0] });
    } else {
      this.revalidateActiveTab();
    }
  }

  @Watch('plugins')
  pluginsChanged(plugins: DytePlugin[]) {
    // If active tab has already been initialised by spotlight then don't change tab.
    if (!this.initialised && this.activeTab != null) return;

    if (plugins.length > 0) {
      const lastIndex = plugins.length - 1;
      this.setActiveTab({ type: 'plugin', plugin: plugins[lastIndex] });
    } else {
      this.revalidateActiveTab();
    }
  }

  private revalidateActiveTab() {
    if (this.activeTab != null) {
      if (this.activeTab.type === 'screenshare') {
        const { participant } = this.activeTab;
        if (!this.screenShareParticipants.some((p) => p.id === participant.id)) {
          this.reassignActiveTab();
        }
      } else {
        const { plugin } = this.activeTab;
        if (!this.plugins.some((p) => p.id === plugin.id)) {
          this.reassignActiveTab();
        }
      }
    }
  }

  private setActiveTab(activeTab: Tab, shouldUpdateSelfActiveTab: boolean = true) {
    this.activeTab = activeTab;
    const id = activeTab.type === 'screenshare' ? activeTab.participant.id : activeTab.plugin.id;
    if (shouldUpdateSelfActiveTab)
      this.meeting.meta?.setSelfActiveTab({ type: activeTab.type, id }, 0);
  }

  private reassignActiveTab() {
    if (this.screenShareParticipants.length > 0) {
      this.setActiveTab({ type: 'screenshare', participant: this.screenShareParticipants[0] });
    } else if (this.plugins.length > 0) {
      const lastIndex = this.plugins.length - 1;
      this.setActiveTab({ type: 'plugin', plugin: this.plugins[lastIndex] });
    }
  }

  private onActiveTabUpdate(type: ActiveTabType, id: string) {
    if (type == undefined) return;
    if (id == undefined) return;
    switch (type) {
      case 'plugin':
        const plugin = this.plugins.find((p) => p.id === id);
        if (plugin != undefined) this.setActiveTab({ type: 'plugin', plugin }, false);
        break;
      case 'screenshare':
        const participant = this.screenShareParticipants.find((ssp) => ssp.id === id);
        if (participant != undefined)
          this.setActiveTab({ type: 'screenshare', participant }, false);
    }
  }

  private getTabs() {
    const screenshares = this.screenShareParticipants.map((participant) => ({
      type: 'screenshare',
      participant,
    }));

    const plugins = this.plugins.map((plugin) => ({ type: 'plugin', plugin }));
    return (screenshares as any[]).concat(plugins);
  }

  render() {
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };

    return (
      <Host>
        <main id="main-view" part="main-view">
          {this.getTabs()?.length > 1 && (
            <dyte-tab-bar
              activeTab={this.activeTab}
              tabs={this.getTabs()}
              onTabChange={(e) => this.setActiveTab(e.detail)}
              {...defaults}
            />
          )}
          <div id="tabs" key="tabs">
            {this.screenShareParticipants.map((participant) => (
              <Render
                element="dyte-screenshare-view"
                defaults={defaults}
                props={{
                  participant,
                  key: participant.id,
                  style: {
                    display:
                      this.activeTab?.type === 'screenshare' &&
                      this.activeTab?.participant.id === participant.id
                        ? 'flex'
                        : 'none',
                  },
                }}
                childProps={{ participant, isScreenShare: true }}
                deepProps
              />
            ))}
            {this.plugins.map((plugin) => (
              <Render
                element="dyte-plugin-main"
                defaults={defaults}
                props={{
                  plugin,
                  key: plugin.id,
                  style: {
                    display:
                      this.activeTab?.type === 'plugin' && this.activeTab?.plugin.id === plugin.id
                        ? 'flex'
                        : 'none',
                  },
                }}
              />
            ))}
          </div>
        </main>
        <Render
          element="dyte-mixed-grid"
          defaults={defaults}
          childProps={{
            part: 'participants-grid',
            class: this.gridSize.mixed ? `grid-width-${this.gridSize.mixed}` : 'grid-width-lg',
            participants: this.participants,
            pinnedParticipants: this.pinnedParticipants,
            screenShareParticipants: this.screenShareParticipants,
            plugins: this.plugins,
            aspectRatio: this.aspectRatio,
            gap: this.gap,
            size: this.meeting.meta?.viewType === 'AUDIO_ROOM' ? 'md' : 'sm',
            layout: 'row',
          }}
          onlyChildren
        />
      </Host>
    );
  }
}
