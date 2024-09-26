import { Component, Host, h, Prop } from '@stencil/core';
import { defaultConfig, DyteUIKitStore } from '../../exports';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { UIConfig } from '../../types/ui-config';
import { Meeting } from '../../types/dyte-client';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A screen that handles the idle state,
 * i.e; when you are waiting for data about the meeting, specifically the `meeting` object.
 */
@Component({
  tag: 'dyte-idle-screen',
  styleUrl: 'dyte-idle-screen.css',
  shadow: true,
})
export class DyteIdleScreen {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting */
  @Prop() meeting: Meeting;

  /** Config object */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot>
          <div class="ctr" part="container">
            <dyte-logo meeting={this.meeting} config={this.config} t={this.t} part="logo" />
            <dyte-spinner
              aria-label="Idle, waiting for meeting data"
              part="spinner"
              iconPack={this.iconPack}
              t={this.t}
            />
          </div>
        </slot>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
