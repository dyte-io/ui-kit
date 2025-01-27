import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { defaultIconPack, IconPack, Size, States } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import storeState from '../../lib/store';
import { DyteClient } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

@Component({
  tag: 'dyte-mute-all-button',
  styleUrl: 'dyte-mute-all-button.css',
  shadow: true,
})
export class DyteMuteAllButton {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: DyteClient;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() canDisable = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.self?.permissions?.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: DyteClient) {
    if (!meeting) return;
    this.canDisable = !!meeting?.self.permissions.canDisableParticipantAudio;
    meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
  }

  private permissionsUpdateListener = () => {
    this.canDisable = !!this.meeting?.self.permissions.canDisableParticipantAudio;
  };

  private onMuteAll = () => {
    this.stateUpdate.emit({ activeMuteAllConfirmation: true });
    storeState.activeMuteAllConfirmation = true;
  };

  render() {
    if (!this.canDisable) {
      return null;
    }

    const label = this.t('mute_all');

    return (
      <Host title={label}>
        <dyte-tooltip kind="block" label={label} part="tooltip">
          <dyte-controlbar-button
            part="controlbar-button"
            icon={this.iconPack.speaker_off}
            label={label}
            size={this.size}
            iconPack={this.iconPack}
            t={this.t}
            variant={this.variant}
            onClick={this.onMuteAll}
          />
        </dyte-tooltip>
      </Host>
    );
  }
}
