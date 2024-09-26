import { Component, Host, h, Event, EventEmitter, Prop, Watch, State } from '@stencil/core';
import {
  defaultConfig,
  defaultIconPack,
  DyteUIKitStore,
  IconPack,
  Size,
  States,
  UIConfig,
} from '../../exports';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-pip-toggle',
  styleUrl: 'dyte-pip-toggle.css',
  shadow: true,
})
export class DytePipToggle {
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() pipSupported: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    // Check if PiP is supported and enabled
    this.pipSupported =
      meeting.participants.pip?.isSupported() &&
      meeting.self.config?.pipMode &&
      meeting.self.config?.viewType !== 'LIVESTREAM';
  }

  private togglePip() {
    if (!this.meeting.participants.pip) return;
    // Not active, activate
    if (this.meeting.participants.pip.isActive) {
      this.meeting.participants.pip.disable();
    } else {
      this.meeting.participants.pip.enable();
    }

    this.stateUpdate.emit({ activeMoreMenu: false });
    DyteUIKitStore.state.activeMoreMenu = false;
  }

  render() {
    if (!this.pipSupported) return;
    const pipEnabled = this.meeting.participants.pip.isActive;
    return (
      <Host tabIndex={0} role="log" aria-label={`Picture-in-Picture mode`}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={() => this.togglePip()}
          icon={pipEnabled ? this.iconPack.pip_on : this.iconPack.pip_off}
          label={pipEnabled ? this.t('pip_off') : this.t('pip_on')}
          variant={this.variant}
        />
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
