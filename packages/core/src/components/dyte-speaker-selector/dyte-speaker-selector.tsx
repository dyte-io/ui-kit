import { Component, Host, h, Prop, Watch, State, writeTask } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';

import { disableSettingSinkId } from '../../utils/flags';
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
  tag: 'dyte-speaker-selector',
  styleUrl: 'dyte-speaker-selector.css',
  shadow: true,
})
export class DyteSpeakerSelector {
  private componentPropsCleanupFn: () => void = () => {};
  private testAudioEl: HTMLAudioElement;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** variant */
  @Prop() variant: 'full' | 'inline' = 'full';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() speakerDevices: MediaDeviceInfo[] = [];
  @State() currentDevices: {
    speaker: MediaDeviceInfo;
  } = { speaker: undefined };

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.meeting?.self.removeListener('deviceListUpdate', this.deviceListUpdateListener);
    this.meeting?.self.removeListener('deviceUpdate', this.deviceUpdateListener);

    this.componentPropsCleanupFn();
  }

  private deviceListUpdateListener = ({ devices }) => {
    const result = devices.reduce(
      (res: { [kind: string]: MediaDeviceInfo[] }, device: MediaDeviceInfo) => {
        res[device.kind]?.push(device);
        return res;
      },
      { audioinput: [], audiooutput: [] }
    );
    this.speakerDevices = result.audiooutput;
  };

  private deviceUpdateListener = ({ device }) => {
    if (device.kind === 'audiooutput') {
      this.currentDevices = {
        speaker: device,
      };
    }
  };

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    writeTask(async () => {
      const { self } = meeting;
      const speakerDevices = await meeting.self.getSpeakerDevices();
      const currentSpeakerDevice = meeting.self.getCurrentDevices()?.speaker;
      this.currentDevices = {
        speaker: currentSpeakerDevice,
      };

      self.addListener('deviceListUpdate', this.deviceListUpdateListener);
      self.addListener('deviceUpdate', this.deviceUpdateListener);

      if (currentSpeakerDevice != undefined) {
        this.speakerDevices = [
          speakerDevices.find((device) => device.deviceId === currentSpeakerDevice.deviceId) ??
            currentSpeakerDevice,
          ...speakerDevices.filter((device) => device.deviceId !== currentSpeakerDevice.deviceId),
        ];
      } else {
        this.speakerDevices = speakerDevices;
      }
    });
  }

  private testAudio() {
    this.testAudioEl?.play();
  }

  private setDevice(deviceId) {
    if (disableSettingSinkId(this.meeting)) return;
    const device = this.speakerDevices.find((d) => d.deviceId === deviceId);

    this.currentDevices = {
      speaker: device,
    };

    if (device != null) {
      this.meeting?.self.setDevice(device);
      (this.testAudioEl as any)?.setSinkId(device.deviceId);
    }
  }

  render() {
    if (this.meeting == null) return null;

    let unnamedSpeakerCount = 0;
    return (
      <Host>
        <audio
          preload="auto"
          src="https://assets.dyte.io/ui-kit/speaker-test.mp3"
          ref={(el) => (this.testAudioEl = el)}
        />
        <div class={'group ' + this.variant} part="speaker-selection">
          {this.speakerDevices.length > 0 && !disableSettingSinkId(this.meeting) && (
            <div class="container">
              <label>
                {this.variant !== 'inline' && this.t('settings.speaker_output')}
                <dyte-icon
                  icon={this.iconPack.speaker}
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
                  {this.speakerDevices.map(({ deviceId, label }) => (
                    <option
                      value={deviceId}
                      selected={this.currentDevices.speaker?.deviceId === deviceId}
                    >
                      {label || `Speaker ${++unnamedSpeakerCount}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {this.variant === 'full' && (
            <dyte-button
              variant="secondary"
              onClick={() => this.testAudio()}
              iconPack={this.iconPack}
              t={this.t}
            >
              <dyte-icon
                icon={this.iconPack.speaker}
                slot="start"
                iconPack={this.iconPack}
                t={this.t}
              />
              {this.t('test')}
            </dyte-button>
          )}
        </div>
      </Host>
    );
  }
}
