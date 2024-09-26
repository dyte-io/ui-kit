import { Component, Host, h, Prop, Watch, State, writeTask } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Size } from '../../types/props';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which lets to manage your audio devices and audio preferences.
 *
 * Emits `dyteStateUpdate` event with data for muting notification sounds:
 * ```ts
 * {
 *  prefs: {
 *    muteNotificationSounds: boolean
 *  }
 * }
 * ```
 */
@Component({
  tag: 'dyte-camera-selector',
  styleUrl: 'dyte-camera-selector.css',
  shadow: true,
})
export class DyteCameraSelector {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** variant */
  @Prop() variant: 'full' | 'inline' = 'full';

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() videoDevices: MediaDeviceInfo[] = [];

  @State() currentDevice: MediaDeviceInfo;

  @State() canProduceVideo: boolean = true;

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    meeting.self?.addListener('deviceListUpdate', this.deviceListUpdateListener);
    meeting.self?.addListener('deviceUpdate', this.deviceUpdateListener);

    writeTask(async () => {
      const videoDevices = await meeting.self.getVideoDevices();
      const currentVideoDevice = meeting.self.getCurrentDevices()?.video;
      //  NOTE(callmetarush): Setting current video device to show on top of list

      if (currentVideoDevice != undefined) {
        this.videoDevices = [
          videoDevices.find((device) => device.deviceId === currentVideoDevice.deviceId) ??
            currentVideoDevice,
          ...videoDevices.filter((device) => device.deviceId !== currentVideoDevice.deviceId),
        ];
      } else {
        this.videoDevices = videoDevices;
      }
    });
  }

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.stageStateListener);
    this.meeting?.self.removeListener('deviceListUpdate', this.deviceListUpdateListener);
    this.meeting?.self.removeListener('deviceUpdate', this.deviceUpdateListener);

    this.componentPropsCleanupFn();
  }

  private stageStateListener = () => {
    this.canProduceVideo = this.meeting.self.permissions.canProduceVideo === 'ALLOWED';
  };

  private deviceListUpdateListener = ({ devices }) => {
    this.videoDevices = devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput');
  };

  private deviceUpdateListener = ({ device }) => {
    if (device.kind !== 'videoinput') return;
    this.currentDevice = device;
  };

  private async setDevice(deviceId: string) {
    const device = this.videoDevices.find((d) => d.deviceId === deviceId);
    this.currentDevice = device;

    if (device != null) {
      await this.meeting?.self.setDevice(device);
    }
  }

  render() {
    if (this.meeting == null) return null;

    let unnamedVideoCount = 0;

    return (
      <Host>
        {this.canProduceVideo && (
          <div class={'group container ' + this.variant} part="camera-selection">
            <label>
              {this.variant !== 'inline' && this.t('camera')}
              <dyte-icon
                icon={this.iconPack.video_on}
                iconPack={this.iconPack}
                t={this.t}
                size="sm"
              />
            </label>
            <div class="row">
              <select
                class="dyte-select"
                onChange={(e) => this.setDevice((e.target as HTMLSelectElement).value)}
              >
                {this.videoDevices.map(({ deviceId, label }) => (
                  <option selected={this.currentDevice?.deviceId === deviceId} value={deviceId}>
                    {label || `Camera ${++unnamedVideoCount}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
