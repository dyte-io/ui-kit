import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { States, Size, IconPack, defaultIconPack, DyteI18n } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { DyteClient } from '../../types/dyte-client';

import {
  FormattedStatsObj,
  getBatteryChargingVerdict,
  getBatteryLevelVerdict,
  getOverallBatteryVerdict,
  StatsHealth,
} from '../../utils/debugger-utils';

interface BatteryManager extends EventTarget {
  // Properties
  charging: boolean; // Whether the battery is currently charging
  chargingTime: number; // Time remaining to full charge, in seconds
  dischargingTime: number; // Time remaining to fully discharge, in seconds
  level: number; // Battery level as a decimal (0 to 1)

  // Event Handlers
  onchargingchange: ((this: BatteryManager, event: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, event: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, event: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, event: Event) => any) | null;
}

@Component({
  tag: 'dyte-debugger-system',
  styleUrl: 'dyte-debugger-system.css',
  shadow: true,
})
export class DyteDebuggerSystem {
  /** Meeting object */
  @Prop() meeting!: DyteClient;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Is Network section expanded */
  @State() isBatterySectionOpen: boolean = true;

  /** Summarised health of network stats */
  @State() batterySectionHealth: StatsHealth = null;

  /** Battery manager */
  @State() battery: BatteryManager = null;

  /** Stats as formatted array to display */
  @State() batteryFormattedStats: FormattedStatsObj[] = [];

  private toggleSection(section: string) {
    if (section === 'battery') this.isBatterySectionOpen = !this.isBatterySectionOpen;
  }

  private batteryUpdateListener = () => {
    const batteryLevelPercentage = Math.round(this.battery.level * 100);
    const newBatteryStats: FormattedStatsObj[] = [];

    newBatteryStats.push({
      name: this.t('debugger.system.battery.level.label'),
      value: `${batteryLevelPercentage}%`,
      description: this.t('debugger.system.battery.level.description'),
      verdict: getBatteryLevelVerdict({
        batteryLevelPercentage,
      }),
    });

    newBatteryStats.push({
      name: this.t('debugger.system.battery.charging.label'),
      value: `${
        this.battery.charging
          ? this.t('debugger.system.battery.charging.is_charging')
          : this.t('debugger.system.battery.charging.is_not_charging')
      }`,
      description: this.t('debugger.system.battery.charging.description'),
      verdict: getBatteryChargingVerdict({
        batteryLevelPercentage,
        chargingTimeInSeconds: this.battery.chargingTime,
        dischargingTimeInSeconds: this.battery.dischargingTime,
        charging: this.battery.charging,
      }),
    });

    this.batterySectionHealth = getOverallBatteryVerdict({
      stats: newBatteryStats,
    });

    this.batteryFormattedStats = newBatteryStats;
  };

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (!this.meeting) {
      return;
    }
    if (this.battery) {
      this.battery.removeEventListener('levelchange', this.batteryUpdateListener);
      this.battery.removeEventListener('chargingchange', this.batteryUpdateListener);
    }
  }

  @Watch('meeting')
  async meetingChanged(meeting: DyteClient) {
    if (!meeting) return;
    if (typeof (navigator as any).getBattery !== 'undefined') {
      this.battery = await (navigator as any).getBattery();
      this.battery.addEventListener('levelchange', this.batteryUpdateListener);
      this.battery.addEventListener('chargingchange', this.batteryUpdateListener);
      this.batteryUpdateListener();
    }
  }

  render() {
    if (!this.meeting) {
      return;
    }

    return (
      <Host>
        <div id="header"></div>
        <div class="tab-body">
          <div class="status-container">
            <div class="status-section">
              <div class="section-header" onClick={() => this.toggleSection('battery')}>
                <span>{this.t('debugger.system.sections.battery')}</span>
                {this.batterySectionHealth && (
                  <span class={`status ${this.batterySectionHealth?.toLowerCase()}`}>
                    {this.t(`debugger.quality.${this.batterySectionHealth?.toLowerCase()}`)}
                  </span>
                )}
                {/* <span class="arrow">{this.isBatterySectionOpen ? '▾' : '▸'}</span> */}
              </div>
              {this.isBatterySectionOpen && !!this.batteryFormattedStats.length && (
                <div class="section-body battery-table">
                  {this.batteryFormattedStats.map((formattedStatsObj) => (
                    <div class="battery-row">
                      <div class="battery-cell label">
                        <strong>{formattedStatsObj.name}</strong>
                        <span class="description">{formattedStatsObj.description}</span>
                      </div>
                      <div class="battery-cell value">
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
