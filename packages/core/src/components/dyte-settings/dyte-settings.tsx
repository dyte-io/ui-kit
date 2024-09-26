import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

type SettingsTab = 'audio' | 'video' | 'connection';

/**
 * A settings component to see and change your audio/video devices
 * as well as see your connection quality.
 */
@Component({
  tag: 'dyte-settings',
  styleUrl: 'dyte-settings.css',
  shadow: true,
})
export class DyteSettings {
  private componentPropsCleanupFn: () => void = () => {};
  private poorConnectionListener: (data: { score: number; kind: string }) => void;
  private keyPressListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  private stageStatusListener = () => {
    this.canProduceVideo = this.meeting.self.permissions.canProduceVideo === 'ALLOWED';
  };

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

  @State() activeTab: SettingsTab = 'connection';
  @State() isMobileMainVisible: boolean = false;

  @State() networkStatus: 'good' | 'poor' | 'poorest' = 'good';

  @State() canProduceVideo: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    document.addEventListener('keydown', this.keyPressListener);
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    // NOTE(ishita1805): hidden because preview was removed from self.
    // this.meeting?.self.disablePreview();
    this.keyPressListener && document.removeEventListener('keydown', this.keyPressListener);
    this.poorConnectionListener &&
      this.meeting?.meta.removeListener('poorConnection', this.poorConnectionListener);
    this.meeting.stage.removeListener('stageStatusUpdate', this.stageStatusListener);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.canProduceVideo = this.meeting.self.permissions.canProduceVideo === 'ALLOWED';

      if (!this.canProduceVideo) {
        this.activeTab = 'audio';
      } else {
        this.activeTab = 'video';
      }

      this.poorConnectionListener = ({ score }) => {
        if (score < 7) {
          this.networkStatus = 'poor';
        } else if (score < 4) {
          this.networkStatus = 'poorest';
        }
        setTimeout(() => {
          // reset after 5 seconds
          this.networkStatus = 'good';
        }, 5000);
      };

      meeting.meta.addListener('poorConnection', this.poorConnectionListener);
      meeting.stage.addListener('stageStatusUpdate', this.stageStatusListener);
    }
  }

  private changeTab(tab: SettingsTab) {
    this.activeTab = tab;
    if (this.size === 'sm') {
      if (!this.isMobileMainVisible) {
        this.isMobileMainVisible = true;
      }
    }
  }

  private close() {
    this.stateUpdate.emit({ activeSettings: false });
    DyteUIKitStore.state.activeSettings = false;
  }

  render() {
    if (this.meeting == null) return null;

    const defaults = {
      meeting: this.meeting,
      states: this.states || DyteUIKitStore.state,
      iconPack: this.iconPack,
      t: this.t,
    };

    return (
      <Host>
        <aside class={{ hide: this.isMobileMainVisible }} part="menu">
          <header>
            <h2>{this.t('settings')}</h2>
          </header>

          <button
            type="button"
            class={{ active: this.activeTab === 'audio' }}
            onClick={() => this.changeTab('audio')}
          >
            {this.t('audio')}
            <div class="right">
              <dyte-icon icon={this.iconPack.mic_on} iconPack={this.iconPack} t={this.t} />
              {this.size === 'sm' && (
                <dyte-icon icon={this.iconPack.chevron_right} iconPack={this.iconPack} t={this.t} />
              )}
            </div>
          </button>

          {this.canProduceVideo && (
            <button
              type="button"
              class={{ active: this.activeTab === 'video' }}
              onClick={() => this.changeTab('video')}
            >
              {this.t('video')}
              <div class="right">
                <dyte-icon icon={this.iconPack.video_on} iconPack={this.iconPack} t={this.t} />
                {this.size === 'sm' && (
                  <dyte-icon
                    icon={this.iconPack.chevron_right}
                    iconPack={this.iconPack}
                    t={this.t}
                  />
                )}
              </div>
            </button>
          )}
          <button type="none" title={`Your network condition is ${this.networkStatus}`}>
            {this.t('connection')}
            <div class="right">
              <dyte-icon
                icon={this.iconPack.wifi}
                class={this.networkStatus}
                iconPack={this.iconPack}
                t={this.t}
              />
            </div>
          </button>
        </aside>
        <main class={{ active: this.isMobileMainVisible, scrollbar: true }} part="main-content">
          {this.size === 'sm' && (
            <header>
              <dyte-button
                kind="icon"
                class="back-btn"
                onClick={() => (this.isMobileMainVisible = false)}
                iconPack={this.iconPack}
                t={this.t}
              >
                <dyte-icon icon={this.iconPack.chevron_left} iconPack={this.iconPack} t={this.t} />
              </dyte-button>
              <h2>{this.t(this.activeTab === 'audio' ? 'audio' : 'video')}</h2>
            </header>
          )}
          {this.activeTab === 'audio' && <dyte-settings-audio {...defaults} />}
          {this.activeTab === 'video' && <dyte-settings-video {...defaults} />}
        </main>
      </Host>
    );
  }
}
