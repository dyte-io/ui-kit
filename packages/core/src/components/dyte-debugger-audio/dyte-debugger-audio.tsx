import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { States, Size, IconPack, defaultIconPack, DyteI18n } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { AudioProducerScoreStats, MediaKind, ProducerScoreStats } from '@dytesdk/web-core';
import storeState from '../../lib/store';
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
  @State() isDevicesOpen: boolean = true;

  /** Audio Producer Stats as formatted array to display */
  @State() audioProducerFormattedStats: FormattedStatsObj[] = [];

  /** Audio Device Stats as formatted array to display */
  @State() audioDeviceFormattedStats: FormattedStatsObj[] = [];

  /** Last raw audio score stats obj */
  @State() audioProducerScoreStats: AudioProducerScoreStats = null;

  /** Summarised health of network stats */
  @State() networkBasedMediaHealth: StatsHealth = null;

  /** Summarised health of devices */
  @State() devicesHealth: StatsHealth = null;

  private toggleSection(section: string) {
    if (section === 'network') this.isNetworkOpen = !this.isNetworkOpen;
    else if (section === 'devices') this.isDevicesOpen = !this.isDevicesOpen;
  }

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

  private deviceHealthCheckListener = async () => {
    const mediaPermission = this.meeting.self.mediaPermissions.audio;

    let mediaPermissionHealth: StatsHealth = 'Good';
    if (
      ['DENIED', 'SYSTEM_DENIED', 'COULD_NOT_START', 'CANCELED', 'NO_DEVICES_AVAILABLE'].includes(
        mediaPermission
      )
    ) {
      mediaPermissionHealth = 'Poor';
    } else if (['NOT_REQUESTED'].includes(mediaPermission)) {
      mediaPermissionHealth = 'Average';
    }

    // Only mediaPermissionHealth is there currently for devices
    this.devicesHealth = mediaPermissionHealth;

    this.audioDeviceFormattedStats = [
      {
        name: 'Media Permission',
        value: mediaPermission,
        description: 'Indicates your media permission status.',
        verdict: mediaPermissionHealth,
      },
    ];
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
      name: this.t('debugger.stats.bitrate.label'),
      value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
      description: this.t('debugger.stats.bitrate.description'),
      verdict: getBitrateVerdict({
        bitrate: statsObj.bitrate,
        kind: 'audio',
        isScreenshare: false,
      }),
    });

    newStatsList.push({
      name: this.t('debugger.stats.packet_loss.label'),
      value: `${statsObj.packetsLostPercentage}%`,
      description: this.t('debugger.stats.packet_loss.description'),
      verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
    });
    newStatsList.push({
      name: this.t('debugger.stats.jitter.label'),
      value: `${Math.round(statsObj.jitter * 1000)} ms`,
      description: this.t('debugger.stats.jitter.description'),
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
    this.meeting.self.off('deviceListUpdate', this.deviceHealthCheckListener);
    this.meeting.self.on('mediaPermissionUpdate', this.deviceHealthCheckListener);
  }

  @Watch('meeting')
  async meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    meeting.self.on('mediaScoreUpdate', this.mediaScoreUpdateListener);
    meeting.self.on('audioUpdate', this.audioUpdateListener);
    meeting.self.on('deviceListUpdate', this.deviceHealthCheckListener);
    meeting.self.on('mediaPermissionUpdate', this.deviceHealthCheckListener);
    await this.deviceHealthCheckListener();
  }

  private onSettingsAudioRef = (dyteSettingsAudio) => {
    // Create a <style> element
    const micophoneStyle = document.createElement('style');
    const speakerStyle = document.createElement('style');

    // Add CSS rules
    micophoneStyle.textContent = `
       label {
          font-weight: 500;
          color: rgb(var(--dyte-colors-text-1000, 255 255 255));
       }
       [part="microphone-selection"].container .dyte-select {
            color: rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64));
        }
      `;

    speakerStyle.textContent = `
      label {
         font-weight: 500;
         color: rgb(var(--dyte-colors-text-1000, 255 255 255)) !important;
      }
       [part="speaker-selection"] .dyte-select {
           color: rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64)) !important;
       }
     `;

    dyteSettingsAudio?.shadowRoot
      ?.querySelector('dyte-speaker-selector')
      ?.shadowRoot?.appendChild(speakerStyle);

    // Append the <style> to the Shadow DOM
    dyteSettingsAudio?.shadowRoot
      ?.querySelector('dyte-microphone-selector')
      ?.shadowRoot?.appendChild(micophoneStyle);
  };

  render() {
    if (!this.meeting) {
      return;
    }

    const defaults = {
      meeting: this.meeting,
      states: this.states || storeState,
      iconPack: this.iconPack,
      t: this.t,
    };

    return (
      <Host>
        <div id="header"></div>
        <div class="tab-body">
          <div class="status-container">
            <div class="status-section">
              <div class="section-header" onClick={() => this.toggleSection('devices')}>
                <span>Devices</span>
                <div class="section-header-end-group">
                  {this.devicesHealth && (
                    <span class="section-header-status status">{this.devicesHealth}</span>
                  )}
                  <span class="arrow">{this.isDevicesOpen ? '▾' : '▸'}</span>
                </div>
              </div>
              {this.isDevicesOpen && (
                <div class="section-body">
                  {this.audioDeviceFormattedStats.map((formattedStatsObj) => (
                    <div class="device-row">
                      <div class="device-cell label">
                        <strong>{formattedStatsObj.name}</strong>
                        <span class="description">{formattedStatsObj.description}</span>
                      </div>
                      <div class="device-cell value">
                        <span class={`status ${formattedStatsObj.verdict?.toLowerCase()}`}>
                          {this.t(`debugger.quality.${formattedStatsObj.verdict?.toLowerCase()}`)}
                        </span>
                        <span class="value">{formattedStatsObj.value}</span>
                      </div>
                    </div>
                  ))}
                  <dyte-settings-audio {...defaults} ref={this.onSettingsAudioRef} />
                </div>
              )}
            </div>
            <div class="status-section">
              <div class={`section-header`} onClick={() => this.toggleSection('network')}>
                <span>{this.t('debugger.audio.sections.network_media')}</span>
                <div class="section-header-end-group">
                  {this.networkBasedMediaHealth && (
                    <span
                      class={`section-header-status status ${this.networkBasedMediaHealth?.toLowerCase()}`}
                    >
                      {this.t(`debugger.quality.${this.networkBasedMediaHealth?.toLowerCase()}`)}
                    </span>
                  )}
                  <span class="arrow">{this.isNetworkOpen ? '▾' : '▸'}</span>
                </div>
              </div>
              {this.isNetworkOpen && !this.audioProducerFormattedStats.length && (
                <div class="section-body missing-stats">
                  {this.meeting.self.audioEnabled ? (
                    <span>{this.t('debugger.audio.messages.generating_report')}</span>
                  ) : (
                    <span>{this.t('debugger.audio.messages.enable_media')}</span>
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
                          {this.t(`debugger.quality.${formattedStatsObj.verdict?.toLowerCase()}`)}
                        </span>
                        <span class="value">{formattedStatsObj.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
