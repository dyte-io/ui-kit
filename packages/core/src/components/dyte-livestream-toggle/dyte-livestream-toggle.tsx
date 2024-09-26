import type { LivestreamState } from '@dytesdk/web-core';
import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { DyteUIKitStore, Size, States } from '../../exports';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { isLiveStreamHost } from '../../utils/livestream';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-livestream-toggle',
  styleUrl: 'dyte-livestream-toggle.css',
  shadow: true,
})
export class DyteLivestreamToggle {
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Is Livestream active */
  @State() livestreamState: LivestreamState = 'IDLE';

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /**
   * Emit API error events
   */
  @Event({ bubbles: true, composed: true }) dyteAPIError: EventEmitter<{
    trace: string;
    message: string;
  }>;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.clearListeners();

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    this.livestreamState = this.meeting.livestream?.state;
    this.meeting.livestream?.on('livestreamUpdate', this.livestreamStateListener);
  }

  private async toggleLivestream() {
    if (this.livestreamState === 'LIVESTREAMING') {
      try {
        await this.meeting.livestream?.stop();
      } catch {
        this.dyteAPIError.emit({
          trace: this.t('livestream.stop'),
          message: this.t('livestream.error.stop'),
        });
      }
    } else {
      try {
        await this.meeting.livestream?.start();
      } catch {
        this.dyteAPIError.emit({
          trace: this.t('livestream.start'),
          message: this.t('livestream.error.start'),
        });
      }
    }
  }

  private livestreamStateListener = (state: LivestreamState) => {
    this.livestreamState = state;
    if (state === 'LIVESTREAMING' || state === 'IDLE') {
      this.stateUpdate.emit({ activeMoreMenu: false });
      DyteUIKitStore.state.activeMoreMenu = false;
    }
  };

  private clearListeners() {
    this.meeting.livestream?.removeListener('livestreamUpdate', this.livestreamStateListener);
  }

  private getLivestreamLabel() {
    switch (this.livestreamState) {
      case 'IDLE':
        return this.t('livestream.go_live');
      case 'LIVESTREAMING':
        return this.t('livestream.end_live');
      case 'STARTING':
        return this.t('livestream.starting');
      case 'STOPPING':
        return this.t('livestream.stopping');
      default:
        return this.t('livestream.error');
    }
  }

  private getLivestreamIcon() {
    switch (this.livestreamState) {
      case 'IDLE':
        return this.iconPack.start_livestream;
      case 'LIVESTREAMING':
        return this.iconPack.stop_livestream;
      case 'STARTING':
      case 'STOPPING':
      default:
        return this.iconPack.stop_livestream;
    }
  }

  private isLoading = () => {
    return (
      this.meeting == null ||
      this.livestreamState === 'STARTING' ||
      this.livestreamState === 'STOPPING'
    );
  };

  render() {
    if (!isLiveStreamHost(this.meeting)) return;
    return (
      <Host>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          isLoading={this.isLoading()}
          class={{ 'active-livestream': this.livestreamState === 'LIVESTREAMING' }}
          onClick={() => this.toggleLivestream()}
          icon={this.getLivestreamIcon()}
          disabled={this.isLoading()}
          label={this.t(this.getLivestreamLabel())}
          variant={this.variant}
        />
      </Host>
    );
  }
}
