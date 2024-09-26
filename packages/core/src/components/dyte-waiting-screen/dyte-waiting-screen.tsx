import { Component, Host, h, Prop } from '@stencil/core';
import { UIConfig } from '../../types/ui-config';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { defaultConfig, DyteUIKitStore } from '../../exports';
import { Meeting } from '../../types/dyte-client';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-waiting-screen',
  styleUrl: 'dyte-waiting-screen.css',
  shadow: true,
})
export class DyteWaitingScreen {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <slot>
          <div class="centered" part="content">
            <dyte-logo meeting={this.meeting} config={this.config} part="logo" t={this.t} />
            <p>{this.t('waitlist.body_text')}</p>
          </div>
        </slot>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
