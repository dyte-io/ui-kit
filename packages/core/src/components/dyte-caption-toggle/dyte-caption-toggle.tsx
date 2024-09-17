import { Component, Host, h, Event, EventEmitter, Prop, Watch, State } from '@stencil/core';
import { defaultConfig, defaultIconPack, IconPack, Size, States, UIConfig } from '../../exports';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import storeState from '../../lib/store';
import { DytePermissionsPreset } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-caption-toggle',
  styleUrl: 'dyte-caption-toggle.css',
  shadow: true,
})
export class DyteCaptionToggle {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() captionEnabled: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
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
  }

  private permissionsUpdateListener = () => {
    this.captionEnabled =
      (this.meeting.self.permissions as DytePermissionsPreset).transcriptionEnabled ?? false;
  };

  private toggleCaptions() {
    this.stateUpdate.emit({ activeCaptions: !storeState.activeCaptions });
    storeState.activeCaptions = !storeState.activeCaptions;

    this.stateUpdate.emit({ activeMoreMenu: false });
    storeState.activeMoreMenu = false;
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
