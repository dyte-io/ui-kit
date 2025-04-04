import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { shorten } from '../../utils/string';
import { UIConfig } from '../../types/ui-config';
import { defaultConfig } from '../../lib/default-ui-config';
import { Render } from '../../lib/render';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import gracefulStorage from '../../utils/graceful-storage';
import { SyncWithStore } from '../../utils/sync-with-store';
import { SocketConnectionState } from '@dytesdk/web-core';

/**
 * A screen shown before joining the meeting, where you can edit your display name,
 * and media settings.
 */
@Component({
  tag: 'dyte-setup-screen',
  styleUrl: 'dyte-setup-screen.css',
  shadow: true,
})
export class DyteSetupScreen {
  private inputEl: HTMLInputElement;
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Config object */
  @Prop() config: UIConfig = defaultConfig;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  @State() displayName: string;

  @State() isJoining: boolean = false;

  @State() canEditName: boolean = true;

  @State() canProduceAudio: boolean = true;

  @State() connectionState: SocketConnectionState['state'];

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting.meta.removeListener('socketConnectionUpdate', this.socketStateUpdate);
  }

  componentDidLoad() {
    this.inputEl?.focus();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting) {
      this.connectionState = meeting.meta.socketState?.state;
      this.canEditName = meeting.self.permissions.canEditDisplayName ?? true;
      this.displayName = meeting.self.name?.trim() || (this.canEditName ? '' : 'Participant');
      meeting.meta.addListener('socketConnectionUpdate', this.socketStateUpdate);
    }
  }

  private socketStateUpdate = ({ state }: SocketConnectionState) => {
    this.connectionState = state;
    if (state === 'failed') this.isJoining = false;
  };

  private join = async () => {
    if (this.displayName?.trim() !== '' && !this.isJoining) {
      this.isJoining = true;
      this.meeting?.self.setName(this.displayName);

      gracefulStorage.setItem('dyte-display-name', this.displayName);
      try {
        await this.meeting?.joinRoom();
      } catch (e) {
        this.isJoining = false;
      }
    }
  };

  render() {
    const disabled =
      this.displayName?.trim() === '' || this.connectionState !== 'connected' || this.isJoining;

    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };

    return (
      <Host>
        <div class="container">
          <div class={'container-tile'}>
            <Render
              element="dyte-participant-tile"
              defaults={defaults}
              props={{ participant: this.meeting?.self, size: 'md', isPreview: true }}
              childProps={{ participant: this.meeting?.self, size: 'md' }}
              deepProps
            />
            <div class={'media-selectors'}>
              <dyte-microphone-selector {...defaults} variant="inline" />
              <dyte-camera-selector {...defaults} variant="inline" />
              <dyte-speaker-selector {...defaults} variant="inline" />
            </div>
          </div>
          <div class="metadata">
            <div class="name">{this.t('setup_screen.join_in_as')}</div>
            <div class="label">
              <div class="name">{!this.canEditName && shorten(this.displayName, 20)}</div>
            </div>
            {/* TODO: Use `dyte-text-field` */}
            {this.canEditName && (
              <input
                placeholder={this.t('setup_screen.your_name')}
                value={this.displayName}
                spellcheck={false}
                autoFocus
                ref={(el) => {
                  this.inputEl = el;
                }}
                onInput={(e) => {
                  this.displayName = (e.target as HTMLInputElement).value;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.join();
                  }
                }}
              />
            )}
            <dyte-button size="lg" kind="wide" onClick={this.join} disabled={disabled}>
              {this.isJoining ? <dyte-spinner iconPack={this.iconPack} /> : this.t('join')}
            </dyte-button>

            {this.connectionState !== 'connected' && (
              <div class="no-network-badge">
                <dyte-icon size="md" variant="danger" icon={this.iconPack.disconnected}></dyte-icon>
                {this.connectionState === 'failed'
                  ? this.t('network.lost_extended')
                  : this.t('network.lost')}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
