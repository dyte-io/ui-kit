import { Component, Host, h, Event, EventEmitter, Prop, Watch, State } from '@stencil/core';
import { defaultConfig, defaultIconPack, IconPack, Size, States, UIConfig } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { SyncWithStore } from '../../utils/sync-with-store';

@Component({
  tag: 'dyte-pip-toggle',
  styleUrl: 'dyte-pip-toggle.css',
  shadow: true,
})
export class DytePipToggle {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() pipSupported: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
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
  }

  render() {
    if (!this.pipSupported) return <Host data-hidden />;
    const pipEnabled = this.meeting.participants.pip.isActive;
    return (
      <Host role="log" aria-label={`Picture-in-Picture mode`}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          onClick={() => this.togglePip()}
          icon={pipEnabled ? this.iconPack.pip_on : this.iconPack.pip_off}
          label={pipEnabled ? this.t('pip_off') : this.t('pip_on')}
          variant={this.variant}
        />
      </Host>
    );
  }
}
