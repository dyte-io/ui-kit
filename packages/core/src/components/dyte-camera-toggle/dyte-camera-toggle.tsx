import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import state from '../../lib/store';
import { Meeting, Peer, MediaPermission } from '../../types/dyte-client';
import { PermissionSettings, Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

/**
 * A button which toggles your camera.
 */
@Component({
  tag: 'dyte-camera-toggle',
  styleUrl: 'dyte-camera-toggle.css',
  shadow: true,
})
export class DyteCameraToggle {
  private videoUpdateListener = ({ videoEnabled }: Peer) => {
    this.videoEnabled = videoEnabled;
  };

  private stageStatusListener = () => {
    this.canProduceVideo = this.meeting.self.permissions.canProduceVideo === 'ALLOWED';
  };

  private mediaPermissionUpdateListener = ({ kind, message }) => {
    if (kind === 'video') {
      this.cameraPermission = message;
    }
  };

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

  @State() videoEnabled: boolean = false;

  @State() canProduceVideo: boolean = false;

  @State() cameraPermission: MediaPermission = 'NOT_REQUESTED';

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.self.removeListener('videoUpdate', this.videoUpdateListener);
    this.meeting?.self.removeListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.stageStatusListener);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      const { self, stage } = meeting;
      this.canProduceVideo = this.meeting.self.permissions.canProduceVideo === 'ALLOWED';
      this.cameraPermission = self.mediaPermissions.video || 'NOT_REQUESTED';
      this.videoEnabled = self.videoEnabled;

      self.addListener('videoUpdate', this.videoUpdateListener);
      self.addListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
      stage?.addListener('stageStatusUpdate', this.stageStatusListener);
    }
  }

  private hasPermissionError() {
    return this.cameraPermission === 'DENIED' || this.cameraPermission === 'SYSTEM_DENIED';
  }

  private toggleCamera = () => {
    this.meeting?.__internals__.logger.info('dyteCameraToggle::toggleCamera', {
      media: {
        video: {
          enabled: Boolean(this.meeting?.self?.videoEnabled),
          permission: this.cameraPermission,
          canProduce: this.meeting?.self?.permissions?.canProduceVideo,
        },
      },
      webinar: {
        stageStatus: this.meeting?.stage.status as any,
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
        kind: 'video',
      };
      this.stateUpdate.emit({ activePermissionsMessage: permissionModalSettings });
      state.activePermissionsMessage = permissionModalSettings;
      return false;
    }

    const self = this.meeting?.self;
    if (self == null || !this.canProduceVideo) {
      return;
    }
    if (self.videoEnabled) {
      self.disableVideo();
    } else {
      self.enableVideo();
    }
  };

  private getState() {
    let tooltipLabel = '';
    let label = '';
    let icon = '';
    let classList = {};
    let hasError = this.hasPermissionError();
    let couldNotStart = this.cameraPermission === 'COULD_NOT_START';

    if (this.videoEnabled && !hasError) {
      label = this.t('video_on');
      icon = this.iconPack.video_on;
    } else {
      label = this.t('video_off');
      icon = this.iconPack.video_off;
      classList['red-icon'] = true;
    }

    if (couldNotStart) {
      tooltipLabel = this.t('perm_could_not_start.video');
    } else if (this.cameraPermission === 'SYSTEM_DENIED') {
      tooltipLabel = this.t('perm_sys_denied.video');
    } else if (this.cameraPermission === 'DENIED') {
      tooltipLabel = this.t('perm_denied.video');
    } else {
      tooltipLabel = this.videoEnabled ? this.t('disable_video') : this.t('enable_video');
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
    if (!this.canProduceVideo || this.meeting?.meta.viewType === 'AUDIO_ROOM') {
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
            size={this.size}
            iconPack={this.iconPack}
            t={this.t}
            class={classList}
            variant={this.variant}
            label={label}
            icon={icon}
            onClick={this.toggleCamera}
            showWarning={showWarning}
            disabled={disable}
          />
        </dyte-tooltip>
      </Host>
    );
  }
}
