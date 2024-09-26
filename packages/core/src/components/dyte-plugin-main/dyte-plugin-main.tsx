import { defaultIconPack, IconPack } from '../../lib/icons';
import { DytePermissionsPreset, DytePlugin } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Watch, State, writeTask } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which loads a plugin.
 */
@Component({
  tag: 'dyte-plugin-main',
  styleUrl: 'dyte-plugin-main.css',
  shadow: true,
})
export class DytePluginMain {
  private componentPropsCleanupFn: () => void = () => {};
  private iframeEl: HTMLIFrameElement;
  private toggleViewModeListener: (data: boolean) => void;

  /** Meeting */
  @Prop() meeting!: Meeting;

  /** Plugin */
  @Prop() plugin!: DytePlugin;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() canClosePlugin: boolean = false;

  @State() viewModeEnabled: boolean = false;

  componentDidLoad() {
    this.meetingChanged(this.meeting);
    this.pluginChanged(this.plugin);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == undefined) return;
    const enabled = this.canInteractWithPlugin();
    this.viewModeEnabled = !enabled;
    writeTask(() => {
      this.canClosePlugin =
        meeting.self.permissions.plugins.canClose || this.plugin.enabledBy === meeting.self.id;
    });
  }

  @Watch('plugin')
  pluginChanged(plugin: DytePlugin) {
    this.toggleViewModeListener = (enable: boolean) => {
      const enabled = this.canInteractWithPlugin();
      if (enabled) return;
      this.viewModeEnabled = enable;
    };
    if (plugin != null) {
      plugin.addPluginView(this.iframeEl, 'plugin-main');
      plugin.addListener('toggleViewMode', this.toggleViewModeListener);
    }
  }

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.plugin?.removePluginView('plugin-main');
    this.plugin?.removeListener('toggleViewMode', this.toggleViewModeListener);

    this.componentPropsCleanupFn();
  }

  private canInteractWithPlugin = () => {
    const pluginId = this.plugin.id;
    if (!pluginId) return true;

    /**
     * For v1 canStartPlugins is the controller
     * For v2 the controller is within plugin config
     */

    const pluginConfig = (this.meeting.self.permissions.plugins as DytePermissionsPreset['plugins'])
      .config[pluginId];
    /**
     * In some cases plugin config is undefined, specifically seen in cases of self
     * hosted plugins, in that case just return true
     */
    if (!pluginConfig) return true;
    /**
     * In V2 config currently in dev portal when a preset is saved without opening the
     * config menu then it gets added with access control undefined, to handle this case
     * the following has been done
     */
    if (!pluginConfig.accessControl) return true;
    /**
     * If access conrol is defined then return the permission
     */
    return pluginConfig.accessControl === 'FULL_ACCESS';
  };

  render() {
    if (this.plugin == null) return null;

    return (
      <Host>
        <header part="header">
          <div>{this.plugin.name}</div>
          {this.canClosePlugin && (
            <div>
              <dyte-button
                kind="icon"
                onClick={() => this.plugin.deactivate()}
                part="button"
                iconPack={this.iconPack}
                t={this.t}
              >
                <dyte-icon icon={this.iconPack.dismiss} iconPack={this.iconPack} t={this.t} />
              </dyte-button>
            </div>
          )}
        </header>
        <div class={'iframe-container'}>
          {!(this.canInteractWithPlugin() || !this.viewModeEnabled) ? (
            <div class="block-inputs" />
          ) : null}
          <iframe ref={(el) => (this.iframeEl = el)} part="iframe" />
        </div>
      </Host>
    );
  }
}
