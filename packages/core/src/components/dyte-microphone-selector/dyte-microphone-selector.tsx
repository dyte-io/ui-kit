import { Component, Host, h, Prop, Watch, State, writeTask } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size } from '../../types/props';
import { disableSettingSinkId } from '../../utils/flags';

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
  tag: 'dyte-microphone-selector',
  styleUrl: 'dyte-microphone-selector.css',
  shadow: true,
})
export class DyteMicrophoneSelector {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** variant */
  @Prop() variant: 'full' | 'inline' = 'full';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() audioinputDevices: MediaDeviceInfo[] = [];
  @State() canProduceAudio: boolean = true;
  @State() currentDevices: {
    audio: MediaDeviceInfo;
  } = { audio: undefined };

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.stageStateListener);
    this.meeting?.self.removeListener('deviceListUpdate', this.deviceListUpdateListener);
    this.meeting?.self.removeListener('deviceUpdate', this.deviceUpdateListener);
  }

  private stageStateListener = () => {
    this.canProduceAudio = this.meeting.self.permissions.canProduceAudio === 'ALLOWED';
  };

  private deviceListUpdateListener = ({ devices }) => {
    const result = devices.reduce(
      (res: { [kind: string]: MediaDeviceInfo[] }, device: MediaDeviceInfo) => {
        res[device.kind]?.push(device);
        return res;
      },
      { audioinput: [], audiooutput: [] }
    );
    this.audioinputDevices = result.audioinput;
  };

  private deviceUpdateListener = ({ device }) => {
    if (device.kind === 'audioinput') {
      this.currentDevices = {
        audio: device,
      };
    }
  };

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    writeTask(async () => {
      const { self, stage } = meeting;
      const audioDevices = await meeting.self.getAudioDevices();
      const currentAudioDevice = meeting.self.getCurrentDevices()?.audio;
      this.currentDevices = {
        audio: currentAudioDevice,
      };
      this.canProduceAudio = this.meeting.self.permissions.canProduceAudio === 'ALLOWED';

      stage?.addListener('stageStatusUpdate', this.stageStateListener);
      self.addListener('deviceListUpdate', this.deviceListUpdateListener);
      self.addListener('deviceUpdate', this.deviceUpdateListener);

      if (currentAudioDevice != undefined) {
        this.audioinputDevices = [
          audioDevices.find((device) => device.deviceId === currentAudioDevice.deviceId) ??
            currentAudioDevice,
          ...audioDevices.filter((device) => device.deviceId !== currentAudioDevice.deviceId),
        ];
      } else {
        this.audioinputDevices = audioDevices;
      }
    });
  }

  private setDevice(deviceId) {
    if (disableSettingSinkId(this.meeting)) return;
    const device = this.audioinputDevices.find((d) => d.deviceId === deviceId);

    if (device != null) {
      this.currentDevices = {
        audio: device,
      };
      this.meeting?.self.setDevice(device);
    }
  }

  render() {
    if (this.meeting == null) return null;

    let unnamedMicCount = 0;

    return (
      <Host>
        {this.canProduceAudio && (
          <div part="microphone-selection" class={'group container ' + this.variant}>
            <label slot="label">
              {this.variant !== 'inline' && this.t('settings.microphone_input')}
              <dyte-icon
                icon={this.iconPack.mic_on}
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
                {this.audioinputDevices.map(({ deviceId, label }) => (
                  <option
                    value={deviceId}
                    selected={this.currentDevices.audio?.deviceId === deviceId}
                  >
                    {label || `Microphone ${++unnamedMicCount}`}
                  </option>
                ))}
              </select>
              <slot name="indicator" />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
