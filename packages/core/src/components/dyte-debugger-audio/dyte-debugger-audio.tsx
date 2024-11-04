import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { States, Size, IconPack, defaultIconPack, DyteI18n } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { AudioProducerScoreStats, MediaKind, ProducerScoreStats } from '@dytesdk/web-core';
// import storeState from '../../lib/store';
import {
  FormattedStatsObj,
  getBitrateVerdict,
  getJitterVerdict,
  getNetworkBasedMediaHealth,
  getPacketLossVerdict,
  StatsHealth,
} from '../../utils/debugger-utils';

@Component({
  tag: 'dyte-debugger-audio',
  styleUrl: 'dyte-debugger-audio.css',
  shadow: true,
})
export class DyteDebuggerAudio {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Is Network section expanded */
  @State() isNetworkOpen: boolean = true;

  /** Is Devices section expanded */
  @State() isDevicesOpen: boolean = false;

  /** Stats as formatted array to display */
  @State() audioProducerFormattedStats: FormattedStatsObj[] = [];

  /** Last raw audio score stats obj */
  @State() audioProducerScoreStats: AudioProducerScoreStats = null;

  /** Summarised health of network stats */
  @State() networkBasedMediaHealth: StatsHealth = null;

  /** Summarised health of devices */
  @State() devicesHealth: StatsHealth = null;

  // private toggleSection(section: string) {
  //   if (section === 'network') this.isNetworkOpen = !this.isNetworkOpen;
  //   else if (section === 'devices') this.isDevicesOpen = !this.isDevicesOpen;
  // }

  private mediaScoreUpdateListener = ({
    kind,
    isScreenshare,
    scoreStats,
  }: {
    kind: MediaKind;
    isScreenshare: boolean;
    scoreStats: ProducerScoreStats;
  }) => {
    if (kind === 'audio' && !isScreenshare) {
      this.audioProducerScoreStats = scoreStats as AudioProducerScoreStats;
    }
  };

  private deviceListUpdateListener = async () => {
    const audioDevices = await this.meeting.self.getAudioDevices();
    this.devicesHealth = audioDevices?.length > 0 ? 'Good' : 'Poor';
  };

  private audioUpdateListener = () => {
    if (!this.meeting.self.audioEnabled) {
      this.audioProducerScoreStats = null;
    }
  };

  @Watch('audioProducerScoreStats')
  async audioProducerScoreStatsChanged(newAudioProducerScoreStats: AudioProducerScoreStats) {
    if (!newAudioProducerScoreStats) {
      this.audioProducerFormattedStats = [];
      return;
    }

    const statsObj = newAudioProducerScoreStats;

    const newStatsList: FormattedStatsObj[] = [];
    newStatsList.push({
      name: `Bitrate`,
      value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
      description: 'Data transmitted per second, affects quality and file size.',
      verdict: getBitrateVerdict({
        bitrate: statsObj.bitrate,
        kind: 'audio',
        isScreenshare: false,
      }),
    });

    newStatsList.push({
      name: `Packet Loss`,
      value: `${statsObj.packetsLostPercentage}%`,
      description: 'Amount of data lost during transfer',
      verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
    });
    newStatsList.push({
      name: `Jitter`,
      value: `${Math.round(statsObj.jitter * 1000)} ms`,
      description: 'Variance or fluctuation in latency',
      verdict: getJitterVerdict({ jitterInMS: statsObj.jitter * 1000 }),
    });

    this.audioProducerFormattedStats = newStatsList;
    this.networkBasedMediaHealth = getNetworkBasedMediaHealth({
      kind: 'audio',
      isScreenshare: false,
      stats: newStatsList,
    });
  }

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (!this.meeting) {
      return;
    }
    this.meeting.self.off('mediaScoreUpdate', this.mediaScoreUpdateListener);
    this.meeting.self.off('audioUpdate', this.audioUpdateListener);
    this.meeting.self.off('deviceListUpdate', this.deviceListUpdateListener);
  }

  @Watch('meeting')
  async meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    meeting.self.on('mediaScoreUpdate', this.mediaScoreUpdateListener);
    meeting.self.on('audioUpdate', this.audioUpdateListener);
    meeting.self.on('deviceListUpdate', this.deviceListUpdateListener);
    await this.deviceListUpdateListener();
  }

  render() {
    if (!this.meeting) {
      return;
    }

    // const defaults = {
    //   meeting: this.meeting,
    //   states: this.states || storeState,
    //   iconPack: this.iconPack,
    //   t: this.t,
    // };

    return (
      <Host>
        <div id="header"></div>
        <div class="tab-body">
          <div class="status-container">
            <div class="status-section">
              <div
                class={`section-header ${!this.networkBasedMediaHealth ? 'only-child' : ''}`}
                // onClick={() => this.toggleSection('network')}
              >
                <span>Network & Media</span>
                {this.networkBasedMediaHealth && (
                  <span class={`status ${this.networkBasedMediaHealth?.toLowerCase()}`}>
                    {this.networkBasedMediaHealth}
                  </span>
                )}
                {/* <span class="arrow">{this.isNetworkOpen ? '▾' : '▸'}</span> */}
              </div>
              {this.isNetworkOpen && !this.audioProducerFormattedStats.length && (
                <div class="section-body missing-stats">
                  {this.meeting.self.audioEnabled ? (
                    <span>Generating report. Please wait for a few seconds.</span>
                  ) : (
                    <span>Please enable mic to see the report.</span>
                  )}
                </div>
              )}
              {this.isNetworkOpen && !!this.audioProducerFormattedStats.length && (
                <div class="section-body network-table">
                  {this.audioProducerFormattedStats.map((formattedStatsObj) => (
                    <div class="network-row">
                      <div class="network-cell label">
                        <strong>{formattedStatsObj.name}</strong>
                        <span class="description">{formattedStatsObj.description}</span>
                      </div>
                      <div class="network-cell value">
                        <span class={`status ${formattedStatsObj.verdict?.toLowerCase()}`}>
                          {formattedStatsObj.verdict}
                        </span>
                        <span class="value">{formattedStatsObj.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/** Hiding devices section for now, Will add more functionality later */}
            {/* <div class="status-section">
              <div class="section-header" onClick={() => this.toggleSection('devices')}>
                <span>Devices</span>
                {this.devicesHealth && <span class="status">{this.devicesHealth}</span>}
                <span class="arrow">{this.isDevicesOpen ? '▾' : '▸'}</span>
              </div>
              {this.isDevicesOpen && (
                <div class="section-body">
                  <dyte-settings-audio {...defaults} />
                </div>
              )}
            </div> */}
          </div>
        </div>
      </Host>
    );
  }
}
