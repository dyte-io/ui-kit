import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import storeState, { onChange } from '../../lib/store';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { canViewPlugins } from '../../utils/sidebar';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

/**
 * A button which toggles visibility of plugins.
 *
 * When clicked it emits a `dyteStateUpdate` event with the data:
 *
 * ```ts
 * { activeSidebar: boolean; sidebar: 'plugins' }
 * ```
 */
@Component({
  tag: 'dyte-plugins-toggle',
  styleUrl: 'dyte-plugins-toggle.css',
  shadow: true,
})
export class DytePluginsToggle {
  private removeStateChangeListener: () => void;

  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() pluginsActive: boolean = false;

  @State() canViewPlugins: boolean = false;

  disconnectedCallback() {
    this.removeStateChangeListener && this.removeStateChangeListener();
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.updateCanView);
    this.meeting?.self?.permissions.removeListener('pluginsUpdate', this.updateCanView);
  }

  connectedCallback() {
    this.statesChanged(this.states);
    this.meetingChanged(this.meeting);
    this.removeStateChangeListener = onChange('sidebar', () => this.statesChanged());
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    this.canViewPlugins = canViewPlugins(meeting);
    meeting?.stage?.on('stageStatusUpdate', this.updateCanView);
    meeting?.self?.permissions.addListener('pluginsUpdate', this.updateCanView);
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || storeState;
    if (states != null) {
      this.pluginsActive = states.activeSidebar === true && states.sidebar === 'plugins';
    }
  }

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private togglePlugins() {
    const states = this.states || storeState;
    this.pluginsActive = !(states?.activeSidebar && states?.sidebar === 'plugins');
    this.stateUpdate.emit({
      activeSidebar: this.pluginsActive,
      sidebar: this.pluginsActive ? 'plugins' : undefined,
      activeMoreMenu: false,
      activeAI: false,
    });
    storeState.activeSidebar = this.pluginsActive;
    storeState.sidebar = this.pluginsActive ? 'plugins' : undefined;
    storeState.activeMoreMenu = false;
    storeState.activeAI = false;
  }

  private updateCanView = () => {
    this.canViewPlugins = canViewPlugins(this.meeting);
  };

  render() {
    if (!this.canViewPlugins) return;

    const text = this.t('plugins');

    return (
      <Host title={text}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          class={{ active: this.pluginsActive }}
          onClick={() => this.togglePlugins()}
          icon={this.iconPack.rocket}
          label={text}
          variant={this.variant}
        />
      </Host>
    );
  }
}
