import { Component, Host, h, Event, EventEmitter, Prop, Watch, State } from '@stencil/core';
import { DyteUIKitStore, IconPack, Size, States, UIConfig } from '../../exports';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

import { DytePermissionsPreset } from '@dytesdk/web-core';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-caption-toggle',
  styleUrl: 'dyte-caption-toggle.css',
  shadow: true,
})
export class DyteCaptionToggle {
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

  @State() captionEnabled: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting === null) return;
    this.permissionsUpdateListener();

    this.meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
  }

  disconnectedCallback() {
    this.meeting?.self.permissions.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );

    this.componentPropsCleanupFn();
  }

  private permissionsUpdateListener = () => {
    this.captionEnabled =
      (this.meeting.self.permissions as DytePermissionsPreset).transcriptionEnabled ?? false;
  };

  private toggleCaptions() {
    this.stateUpdate.emit({ activeCaptions: !DyteUIKitStore.state.activeCaptions });
    DyteUIKitStore.state.activeCaptions = !DyteUIKitStore.state.activeCaptions;

    this.stateUpdate.emit({ activeMoreMenu: false });
    DyteUIKitStore.state.activeMoreMenu = false;
  }

  render() {
    if (!this.captionEnabled) return null;
    const captionsEnabled = this.states.activeCaptions;
    return (
      <Host tabIndex={0} role="log" aria-label={`Picture-in-Picture mode`}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={() => this.toggleCaptions()}
          icon={captionsEnabled ? this.iconPack.captionsOff : this.iconPack.captionsOn}
          label={captionsEnabled ? this.t('transcript.off') : this.t('transcript.on')}
          variant={this.variant}
        />
      </Host>
    );
  }
}