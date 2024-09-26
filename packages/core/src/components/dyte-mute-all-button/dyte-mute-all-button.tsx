import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { defaultIconPack, DyteUIKitStore, IconPack, Size, States } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';

import { Meeting } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-mute-all-button',
  styleUrl: 'dyte-mute-all-button.css',
  shadow: true,
})
export class DyteMuteAllButton {
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() canDisable = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.meeting?.self?.permissions?.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    this.canDisable = !!meeting?.self.permissions.canDisableParticipantAudio;
    meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
  }

  private permissionsUpdateListener = () => {
    this.canDisable = !!this.meeting?.self.permissions.canDisableParticipantAudio;
  };

  private onMuteAll = () => {
    this.stateUpdate.emit({ activeMuteAllConfirmation: true });
    DyteUIKitStore.state.activeMuteAllConfirmation = true;
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
