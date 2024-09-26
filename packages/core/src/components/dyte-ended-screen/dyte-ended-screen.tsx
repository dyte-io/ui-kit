import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { DyteI18n, defaultLanguage, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteUIKitStore } from '../../lib/store';
import { defaultConfig } from '../../exports';
import { Meeting } from '../../types/dyte-client';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A screen which shows a meeting has ended.
 */
@Component({
  tag: 'dyte-ended-screen',
  styleUrl: 'dyte-ended-screen.css',
  shadow: true,
})
export class DyteEndedScreen {
  private componentPropsCleanupFn: () => void = () => {};
  private removeStateChangeListener: () => void;
  /** Config object */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon */
  @State() icon: IconPack = defaultIconPack;

  /** Global states */
  @Prop() states: States;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  @State() message: string = '';

  /** Global states */
  @Prop() meeting: Meeting;

  connectedCallback() {
    this.statesChanged(this.states);
    this.removeStateChangeListener = DyteUIKitStore.onChange('roomLeftState', () =>
      this.statesChanged()
    );
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.removeStateChangeListener && this.removeStateChangeListener();

    this.componentPropsCleanupFn();
  }

  private getBreakoutRoomsMessage(states: States) {
    let message: keyof typeof defaultLanguage;
    if (states?.roomLeftState === 'connected-meeting') {
      if (
        DyteUIKitStore.state.activeBreakoutRoomsManager?.destinationMeetingId ===
        this.meeting.connectedMeetings.parentMeeting.id
      ) {
        message = 'breakout_rooms.move_reason.switch_main_room';
      } else {
        message = 'breakout_rooms.move_reason.switch_room';
      }
    }

    return message;
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || DyteUIKitStore.state;
    if (states != null) {
      switch (states?.roomLeftState) {
        case 'left':
          this.message = 'ended.left';
          break;
        case 'kicked':
          this.message = 'ended.kicked';
          break;
        case 'disconnected':
          this.message = 'ended.disconnected';
          break;
        case 'rejected':
          this.message = 'ended.rejected';
          break;
        case 'connected-meeting':
          this.message = this.getBreakoutRoomsMessage(states);
          break;
        default:
          this.message = 'ended';
      }
    }
  }

  private renderBreakoutRoomScreen() {
    return (
      <Host>
        <div class="ctr" part="container">
          <dyte-icon icon={this.iconPack.breakout_rooms} />
          <p part="message" class="breakout">
            {this.t(this.message)}
          </p>
        </div>
      </Host>
    );
  }

  render() {
    const states = this.states || DyteUIKitStore.state;
    if (states.roomLeftState === 'connected-meeting') {
      return this.renderBreakoutRoomScreen();
    }

    return (
      <Host>
        <div class="ctr" part="container">
          <dyte-logo meeting={this.meeting} config={this.config} part="logo" t={this.t} />
          <p part="message">{this.t(this.message)}</p>
          {states?.roomLeftState === 'disconnected' && (
            <span part="description">{this.t('ended.network')}</span>
          )}
        </div>
      </Host>
    );
  }
}
