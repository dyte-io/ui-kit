import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

import { canToggleBreakout } from '../../utils/breakout-rooms';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A button which toggles visibility of breakout rooms.
 *
 * You need to pass the `meeting` object to it.
 */
@Component({
  tag: 'dyte-breakout-rooms-toggle',
  styleUrl: 'dyte-breakout-rooms-toggle.css',
  shadow: true,
})
export class DyteBreakoutRoomsToggle {
  private componentPropsCleanupFn: () => void = () => {};
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<Partial<States>>;

  @State() canToggle = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  disconnectedCallback() {
    this.meeting?.self?.permissions?.off('permissionsUpdate', this.permissionsUpdateListener);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    this.canToggle = canToggleBreakout(meeting);
    meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);
  }

  private permissionsUpdateListener = () => {
    this.canToggle = canToggleBreakout(this.meeting);
  };

  private breakoutRoomToggle = () => {
    const mode = this.meeting.connectedMeetings.isActive ? 'view' : 'create';
    this.stateUpdate.emit({
      activeBreakoutRoomsManager: {
        active: !this.states?.activeBreakoutRoomsManager?.active,
        mode,
      },
    });
    DyteUIKitStore.state.activeBreakoutRoomsManager = {
      active: !DyteUIKitStore.state.activeBreakoutRoomsManager?.active,
      mode,
    };
  };

  render() {
    if (!this.canToggle) return;
    return (
      <Host title={this.t('breakout_rooms')}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={this.breakoutRoomToggle}
          icon={this.iconPack.breakout_rooms}
          label={this.t('breakout_rooms')}
          variant={this.variant}
        />
      </Host>
    );
  }
}
