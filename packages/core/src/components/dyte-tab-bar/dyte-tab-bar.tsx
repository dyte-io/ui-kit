import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { DytePlugin } from '@dytesdk/web-core';
import type { ActiveTabType } from '@dytesdk/web-core';
import { defaultConfig } from '../../lib/default-ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting, Peer } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { formatName, shorten } from '../../utils/string';
import { GridLayout } from '../dyte-grid/dyte-grid';

export interface Tab {
  type: ActiveTabType;
  participant?: Peer;
  plugin?: DytePlugin;
}

@Component({
  tag: 'dyte-tab-bar',
  styleUrl: 'dyte-tab-bar.css',
  shadow: true,
})
export class DyteTabBar {
  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** UI Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Grid Layout */
  @Prop({ reflect: true }) layout: GridLayout = 'row';

  /** Icon Pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Active tab */
  @Prop() activeTab: Tab;

  /** Tabs */
  @Prop() tabs: Tab[] = [];

  /** Set active tab */
  @Event({ eventName: 'tabChange' }) tabChange: EventEmitter<Tab>;

  render() {
    return (
      <Host>
        <dyte-spotlight-indicator
          meeting={this.meeting}
          iconPack={this.iconPack}
          t={this.t}
          size={this.size}
        />
        {this.tabs.map((tab: Tab) => {
          let isActive = false;
          if (
            this.activeTab?.type === 'plugin' &&
            tab.plugin &&
            this.activeTab?.plugin.id === tab.plugin.id
          )
            isActive = true;
          else if (
            this.activeTab?.type === 'screenshare' &&
            tab.participant &&
            this.activeTab?.participant.id === tab.participant.id
          )
            isActive = true;
          if (tab.type === 'screenshare') {
            const participant = tab.participant;
            const name = formatName(participant.name);
            return (
              <dyte-button
                title={`${name}'s Screen Share`}
                key={tab.participant.id}
                kind="icon"
                iconPack={this.iconPack}
                t={this.t}
                variant={isActive ? 'primary' : 'secondary'}
                class={{
                  tab: true,
                  active: isActive,
                }}
                onClick={() => this.tabChange.emit(tab)}
              >
                <div class="center col">
                  <dyte-icon
                    icon={this.iconPack.share_screen_person}
                    iconPack={this.iconPack}
                    t={this.t}
                  />
                  <span class="name">
                    {participant.id === this.meeting?.self.id ? this.t('you') : shorten(name, 6)}
                  </span>
                </div>
              </dyte-button>
            );
          } else if (tab.type === 'plugin') {
            const plugin = tab.plugin;
            return (
              <dyte-button
                title={plugin.name}
                key={plugin.id}
                kind="icon"
                iconPack={this.iconPack}
                t={this.t}
                variant={isActive ? 'primary' : 'secondary'}
                class={{
                  tab: true,
                  active: isActive,
                }}
                onClick={() => this.tabChange.emit(tab)}
              >
                <div class="center col">
                  <img src={plugin.picture} />
                  <span class="name">{shorten(plugin.name, 6)}</span>
                </div>
              </dyte-button>
            );
          }
        })}
      </Host>
    );
  }
}
