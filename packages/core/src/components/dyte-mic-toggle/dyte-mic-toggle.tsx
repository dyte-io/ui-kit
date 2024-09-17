import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting, Peer, MediaPermission } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { PermissionSettings, Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import storeState from '../../lib/store';

/**
 * A button which toggles your microphone.
 */
@Component({
  tag: 'dyte-mic-toggle',
  styleUrl: 'dyte-mic-toggle.css',
  shadow: true,
})
export class DyteMicToggle {
  private audioUpdateListener = ({ audioEnabled }: Peer) => {
    this.audioEnabled = audioEnabled;
  };

  private stageStatusListener = () => {
    this.canProduceAudio = this.meeting.self.permissions.canProduceAudio === 'ALLOWED';
  };

  private mediaPermissionUpdateListener = ({ kind, message }) => {
    if (kind === 'audio') {
      this.micPermission = message;
    }
  };

  private micPermissionUpdateListener: () => void;

  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() audioEnabled: boolean = false;

  @State() canProduceAudio: boolean = false;

  @State() micPermission: MediaPermission = 'NOT_REQUESTED';

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.self.removeListener('audioUpdate', this.audioUpdateListener);
    this.meeting?.self.removeListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.stageStatusListener);
    this.meeting?.self.permissions.removeListener(
      // @ts-ignore
      'micPermissionUpdate',
      this.micPermissionUpdateListener
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      const { self, stage } = meeting;

      this.canProduceAudio = this.meeting.self.permissions.canProduceAudio === 'ALLOWED';
      this.micPermission = meeting.self.mediaPermissions.audio || 'NOT_REQUESTED';
      this.audioEnabled = self.audioEnabled;
      this.micPermissionUpdateListener = () => {
        this.canProduceAudio = this.meeting.self.permissions.canProduceAudio === 'ALLOWED';
        if (!this.canProduceAudio) {
          meeting.self.disableAudio();
        }
      };
      // @ts-ignore
      meeting.self.permissions.on('micPermissionUpdate', this.micPermissionUpdateListener);

      self.addListener('audioUpdate', this.audioUpdateListener);
      self.addListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
      stage?.addListener('stageStatusUpdate', this.stageStatusListener);
    }
  }

  private hasPermissionError() {
    return this.micPermission === 'DENIED' || this.micPermission === 'SYSTEM_DENIED';
  }

  private toggleMic = () => {
    this.meeting?.__internals__.logger.info('dyteMicToggle::toggleMic', {
      media: {
        audio: {
          enabled: Boolean(this.meeting?.self?.audioEnabled),
          permission: this.micPermission,
          canProduce: this.meeting?.self?.permissions?.canProduceAudio,
        },
      },
      webinar: {
        stageStatus: this.meeting?.stage?.status as any,
      },
      livestream: {
        stageStatus: this.meeting?.stage?.status,
      },
      moduleExists: {
        self: Boolean(this.meeting?.self),
      },
    });

    if (this.hasPermissionError()) {
      const permissionModalSettings: PermissionSettings = {
        enabled: true,
        kind: 'audio',
      };
      this.stateUpdate.emit({ activePermissionsMessage: permissionModalSettings });
      storeState.activePermissionsMessage = permissionModalSettings;
      return false;
    }

    const self = this.meeting?.self;
    if (self == null || !this.canProduceAudio) {
      return;
    }
    if (self.audioEnabled) {
      self.disableAudio();
    } else {
      self.enableAudio();
    }
  };

  private getState() {
    let tooltipLabel = '';
    let label = '';
    let icon = '';
    let classList = {};
    let hasError = this.hasPermissionError();
    let couldNotStart = this.micPermission === 'COULD_NOT_START';

    if (this.audioEnabled && !hasError) {
      label = this.t('mic_on');
      icon = this.iconPack.mic_on;
    } else {
      label = this.t('mic_off');
      icon = this.iconPack.mic_off;
      classList['red-icon'] = true;
    }

    if (couldNotStart) {
      tooltipLabel = this.t('perm_could_not_start.audio');
    } else if (this.micPermission === 'SYSTEM_DENIED') {
      tooltipLabel = this.t('perm_sys_denied.audio');
    } else if (this.micPermission === 'DENIED') {
      tooltipLabel = this.t('perm_denied.audio');
    } else {
      tooltipLabel = this.audioEnabled ? this.t('disable_mic') : this.t('enable_mic');
    }

    return {
      tooltipLabel,
      label,
      icon,
      classList,
      showWarning: hasError || couldNotStart,
      disable: hasError,
    };
  }

  render() {
    if (!this.canProduceAudio) {
      return null;
    }

    const { tooltipLabel, label, icon, classList, showWarning, disable } = this.getState();

    return (
      <Host title={label}>
        <dyte-tooltip
          kind="block"
          label={tooltipLabel}
          part="tooltip"
          iconPack={this.iconPack}
          t={this.t}
        >
          <dyte-controlbar-button
            part="controlbar-button"
            icon={icon}
            label={label}
            size={this.size}
            iconPack={this.iconPack}
            t={this.t}
            variant={this.variant}
            class={classList}
            onClick={this.toggleMic}
            showWarning={showWarning}
            disabled={disable}
          />
        </dyte-tooltip>
      </Host>
    );
  }
}
