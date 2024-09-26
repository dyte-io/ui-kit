import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { Meeting, Peer } from '../../types/dyte-client';
import { UIConfig } from '../../types/ui-config';
import { Size } from '../../types/props';
import { DyteI18n, DyteUIKitStore, IconPack, States, defaultIconPack } from '../../exports';
import hark from 'hark';
import { DyteParticipant } from '@dytesdk/web-core';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-audio-tile',
  styleUrl: 'dyte-audio-tile.css',
  shadow: true,
})
export class DyteAudioTile {
  private componentPropsCleanupFn: () => void = () => {};
  private hark: hark.Harker;

  /** Meeting */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Config */
  @Prop() config: UIConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** States */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Participant object */
  @Prop() participant: Peer;

  @State() audioEnabled = false;

  @State() volume = 0;

  connectedCallback() {
    this.participantChanged(this.participant);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.hark?.stop();
    (this.participant as DyteParticipant)?.removeListener('audioUpdate', this.onAudioUpdate);

    this.componentPropsCleanupFn();
  }

  @Watch('participant')
  participantChanged(participant: Peer) {
    if (!participant) {
      return;
    }

    this.audioEnabled = participant.audioEnabled;

    (participant as DyteParticipant).addListener('audioUpdate', this.onAudioUpdate);
  }

  private onAudioUpdate = ({
    audioEnabled,
    audioTrack,
  }: Pick<Peer, 'audioEnabled' | 'audioTrack'>) => {
    if (!this.participant) return;
    if (audioEnabled && audioTrack) {
      const stream = new MediaStream();
      stream.addTrack(audioTrack);
      this.calcVolume(stream);

      this.audioEnabled = true;
    } else {
      this.volume = 0;
      this.audioEnabled = false;
    }
  };

  /**
   * Determines the volume from a given MediaStream and updates the components state
   * @param stream A MediaStream with AudioTrack(s) added
   */
  private calcVolume(stream: MediaStream) {
    this.hark = hark(stream, {
      play: false,
      interval: 1000 / 10,
    });

    this.hark.on('volume_change', (dBs) => {
      const prevVolume = this.volume;

      // The exact formula to convert from dBs (-100..0) to linear (0..1) is:
      //   Math.pow(10, dBs / 20)
      // However it does not produce a visually useful output, so let exagerate
      // it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
      // minimize component renderings.

      // if dBs is -Inifnity, set vol to 0
      let audioVol = Math.round(10 ** (dBs / 115) * 10);
      if (audioVol < 3) audioVol = 0;
      let volume = Math.round((prevVolume * 2 + audioVol) / 3);

      if (prevVolume !== volume) {
        this.volume = volume;
      }
    });
  }

  render() {
    const defaults = {
      meeting: this.meeting,
      size: this.size,
      config: this.config,
      states: this.states,
      iconPack: this.iconPack,
      t: this.t,
    };

    let shadowClass = 'bar-0';

    if (this.volume > 5) {
      shadowClass = 'bar-5';
    } else if (this.volume < 0) {
      shadowClass = 'bar-0';
    } else {
      shadowClass = 'bar-' + this.volume;
    }

    return (
      <Host>
        <div class={{ 'avatar-ctr': true, speaking: this.audioEnabled, [shadowClass]: true }}>
          <dyte-avatar participant={this.participant} size={this.size}>
            {!this.audioEnabled && (
              <div class="mic-icon">
                <dyte-icon icon={defaultIconPack.mic_off} />
              </div>
            )}
          </dyte-avatar>
        </div>

        <dyte-name-tag variant="text" participant={this.participant} {...defaults} />

        <slot></slot>
      </Host>
    );
  }
}
