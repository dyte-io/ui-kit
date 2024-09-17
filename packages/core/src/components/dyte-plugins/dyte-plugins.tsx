import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DytePlugin } from '@dytesdk/web-core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import storeState from '../../lib/store';
import { defaultConfig } from '../../exports';

/**
 * A component which lists all available plugins from their preset,
 * and ability to enable or disable plugins.
 */
@Component({
  tag: 'dyte-plugins',
  styleUrl: 'dyte-plugins.css',
  shadow: true,
})
export class DytePlugins {
  private updateActivePlugins: () => void;
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() plugins: DytePlugin[] = [];

  @State() canStartPlugins: boolean = false;

  @State() canClosePlugins: boolean = false;

  @State() activatedPluginsId: string[] = [];

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.plugins.all.removeListener('stateUpdate', this.updateActivePlugins);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.canStartPlugins = meeting.self.permissions.plugins.canStart;
      this.canClosePlugins = meeting.self.permissions.plugins.canClose;
      this.plugins = meeting.plugins.all
        .toArray()
        .filter((plugin) => !meeting.self.config.disabledPlugins?.includes(plugin.id));

      this.updateActivePlugins = () => {
        this.activatedPluginsId = meeting.plugins.active.toArray().map((p) => p.id);
      };
      this.updateActivePlugins();
      meeting.plugins.all.addListener('stateUpdate', this.updateActivePlugins);
    }
  }

  private close = () => {
    this.stateUpdate.emit({ activeSidebar: false, sidebar: undefined });
    storeState.activeSidebar = false;
    storeState.sidebar = undefined;
  };

  render() {
    return (
      <Host>
        <ul class="scrollbar">
          {this.plugins.map((plugin) => (
            <li key={plugin.name} class="plugin">
              <div class="metadata">
                <img src={plugin.picture} />
                <div class="name">{plugin.name}</div>
              </div>
              {!this.activatedPluginsId.includes(plugin.id) && this.canStartPlugins && (
                <div class="buttons">
                  <dyte-button
                    kind="icon"
                    size="lg"
                    iconPack={this.iconPack}
                    t={this.t}
                    onClick={() => {
                      plugin.activate();
                      this.close();
                    }}
                    aria-label={`${this.t('activate')} ${plugin.name}`}
                  >
                    <dyte-icon
                      icon={this.iconPack.rocket}
                      tabIndex={-1}
                      aria-hidden={true}
                      iconPack={this.iconPack}
                      t={this.t}
                    />
                  </dyte-button>
                </div>
              )}
              {this.activatedPluginsId.includes(plugin.id) && this.canClosePlugins && (
                <div class="buttons">
                  <dyte-button
                    kind="icon"
                    size="lg"
                    onClick={() => {
                      plugin.deactivate();
                    }}
                    iconPack={this.iconPack}
                    t={this.t}
                    aria-label={`${this.t('close')} ${plugin.name}`}
                  >
                    <dyte-icon
                      icon={this.iconPack.dismiss}
                      tabIndex={-1}
                      aria-hidden={true}
                      iconPack={this.iconPack}
                      t={this.t}
                    />
                  </dyte-button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
