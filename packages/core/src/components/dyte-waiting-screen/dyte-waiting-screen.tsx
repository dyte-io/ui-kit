import { Component, Host, h, Prop } from '@stencil/core';
import { UIConfig } from '../../types/ui-config';
import { DyteI18n } from '../../lib/lang';
import { IconPack } from '../../lib/icons';
import { DyteUIKitStore } from '../../exports';
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
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

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
