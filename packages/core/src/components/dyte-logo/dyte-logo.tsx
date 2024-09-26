import { UIConfig } from '../../types/ui-config';
import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which loads the logo from your config, or via the `logo-url` attribute.
 */
@Component({
  tag: 'dyte-logo',
  styleUrl: 'dyte-logo.css',
  shadow: true,
})
export class DyteLogo {
  private componentPropsCleanupFn: () => void = () => {};
  /** Logo URL */
  @Prop({ mutable: true }) logoUrl: string;

  /** Config object */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  connectedCallback() {
    this.configChanged(this.config);
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('config')
  configChanged(config: UIConfig) {
    if (config != null) {
      const configLogo = config?.designTokens?.logo;
      // NOTE(callmetarush): Only update logo if not passed via prop
      if (configLogo != null && this.logoUrl == null) {
        this.logoUrl = configLogo;
      }
    }
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      const meetingLogo = meeting.self?.config?.header?.elements?.logo;
      if (meetingLogo != null && this.logoUrl == null) {
        this.logoUrl = meetingLogo;
      }
    }
  }

  render() {
    if (!this.logoUrl || this.logoUrl === '') {
      return null;
    }

    const logo = this.logoUrl;
    const text = this.t('logo');

    return (
      <Host class="loaded">
        <img src={logo} alt={text} />
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
