import { Component, Host, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { SyncWithStore } from '../../utils/sync-with-store';
import storeState from '../../lib/store';

export type DebuggerTab = 'audio' | 'video' | 'screenshare' | 'system';

/**
 * A troubleshooting component to identify and fix any issues in the meeting.
 */
@Component({
  tag: 'dyte-debugger',
  styleUrl: 'dyte-debugger.css',
  shadow: true,
})
export class DyteDebugger {
  private keyPressListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  @State() activeTab: DebuggerTab = 'audio';
  @State() isMobileMainVisible: boolean = false;
  @State() progress: number = 0;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    document.addEventListener('keydown', this.keyPressListener);
  }

  disconnectedCallback() {
    this.keyPressListener && document.removeEventListener('keydown', this.keyPressListener);
  }

  @Listen('testProgress')
  progressUpdate(event: CustomEvent<number>) {
    this.progress = event.detail;
  }

  private changeTab(tab: DebuggerTab) {
    this.activeTab = tab;
    if (this.size === 'sm') {
      if (!this.isMobileMainVisible) {
        this.isMobileMainVisible = true;
      }
    }
  }

  private close() {
    this.stateUpdate.emit({ activeDebugger: false });
    storeState.activeDebugger = false;
  }

  private getActiveTab() {
    switch (this.activeTab) {
      case 'audio':
        return this.t('debugger.audio.troubleshooting.label');
      case 'screenshare':
        return this.t('debugger.screenshare.troubleshooting.label');
      case 'video':
        return this.t('debugger.video.troubleshooting.label');
      case 'system':
        return this.t('debugger.system.troubleshooting.label');
      default:
        return this.t('debugger.troubleshooting.label');
    }
  }

  render() {
    if (this.meeting == null) return null;

    const defaults = {
      meeting: this.meeting,
      states: this.states || storeState,
      iconPack: this.iconPack,
      t: this.t,
      size: this.size,
    };

    const tab = this.getActiveTab();

    const showSystemsTab = typeof (navigator as any).getBattery !== 'undefined';

    return (
      <Host>
        <aside class={{ hide: this.isMobileMainVisible }} part="menu">
          <header>
            <h3>{this.t('debugger.troubleshooting.label')}</h3>
          </header>
          <button
            type="button"
            class={{ active: this.activeTab === 'audio' }}
            onClick={() => this.changeTab('audio')}
          >
            {this.t('debugger.audio.label')}
            <div class="right">
              <dyte-icon icon={this.iconPack.mic_on} />
              {this.size === 'sm' && <dyte-icon icon={this.iconPack.chevron_right} />}
            </div>
          </button>
          <button
            type="button"
            class={{ active: this.activeTab === 'video' }}
            onClick={() => this.changeTab('video')}
          >
            {this.t('debugger.video.label')}
            <div class="right">
              <dyte-icon icon={this.iconPack.video_on} />
              {this.size === 'sm' && <dyte-icon icon={this.iconPack.chevron_right} />}
            </div>
          </button>
          <button
            type="button"
            class={{ active: this.activeTab === 'screenshare' }}
            onClick={() => this.changeTab('screenshare')}
          >
            {this.t('debugger.screenshare.label')}
            <div class="right">
              <dyte-icon icon={this.iconPack.share_screen_start} />
              {this.size === 'sm' && <dyte-icon icon={this.iconPack.chevron_right} />}
            </div>
          </button>
          <button
            type="button"
            class={{ active: this.activeTab === 'system', hidden: !showSystemsTab }}
            onClick={() => this.changeTab('system')}
          >
            {this.t('debugger.system.label')}
            <div class="right">
              <dyte-icon icon={this.iconPack.settings} />
              {this.size === 'sm' && <dyte-icon icon={this.iconPack.chevron_right} />}
            </div>
          </button>
        </aside>

        <main class={{ active: this.isMobileMainVisible }} part="main-content">
          {this.size === 'sm' && (
            <header>
              <dyte-button
                kind="icon"
                class="back-btn"
                onClick={() => (this.isMobileMainVisible = false)}
              >
                <dyte-icon icon={this.iconPack.chevron_left} />
              </dyte-button>
              <h4>{tab}</h4>
            </header>
          )}
          {this.activeTab === 'audio' && <dyte-debugger-audio {...defaults}></dyte-debugger-audio>}
          {this.activeTab === 'video' && <dyte-debugger-video {...defaults}></dyte-debugger-video>}
          {this.activeTab === 'screenshare' && (
            <dyte-debugger-screenshare {...defaults}></dyte-debugger-screenshare>
          )}
          {this.activeTab === 'system' && showSystemsTab && (
            <dyte-debugger-system {...defaults}></dyte-debugger-system>
          )}
        </main>
      </Host>
    );
  }
}
