import { Component, Watch, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { defaultConfig } from '../../lib/default-ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { SyncWithStore } from '../../utils/sync-with-store';

/**
 * A component which handles all dialog elements in a component such as:
 *
 * - dyte-settings
 * - dyte-leave-meeting
 * - dyte-permissions-message
 * - dyte-image-viewer
 * - dyte-breakout-rooms-manager
 *
 * This components depends on the values from `states` object.
 */
@Component({
  tag: 'dyte-dialog-manager',
  styleUrl: 'dyte-dialog-manager.css',
  shadow: true,
})
export class DyteDialogManager {
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** UI Config */
  @Prop() config: UIConfig = defaultConfig;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting.stage?.removeListener('stageStatusUpdate', this.stageStatusUpdateListener);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == undefined) return;
    const { stage } = meeting;
    stage?.addListener('stageStatusUpdate', this.stageStatusUpdateListener);
  }

  private updateStoreState = (state: keyof States, value: any) => {
    this.stateUpdate.emit({ [state]: value });
  };

  private cancelJoinStage = async () => {
    if (this.meeting.stage?.status === 'ACCEPTED_TO_JOIN_STAGE') {
      await this.meeting?.stage?.leave();
    }
    this.updateStoreState('activeJoinStage', false);
  };

  private joinStage = async () => {
    await this.meeting.stage.join();
    /** NOTE(ishita1805): We close the modal once the status has changed */
  };

  private stageStatusUpdateListener = (status) => {
    if (!this.states?.activeJoinStage) return;

    if (status === 'ON_STAGE') this.updateStoreState('activeJoinStage', false);
  };

  render() {
    const defaults = {
      meeting: this.meeting,
      states: this.states,
      config: this.config,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };
    const states = this.states;

    if (states?.image != null) {
      const image = states.image;
      const onImageClose = () => {
        this.stateUpdate.emit({ image: null });
      };

      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={onImageClose}
            hideCloseButton
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-image-viewer {...defaults} image={image} onClose={onImageClose} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeSettings === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => this.updateStoreState('activeSettings', false)}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-settings {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeDebugger === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => this.updateStoreState('activeDebugger', false)}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-debugger {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeLeaveConfirmation === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => this.updateStoreState('activeLeaveConfirmation', false)}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-leave-meeting {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activePermissionsMessage?.enabled === true) {
      return (
        <Host>
          <dyte-dialog open hideCloseButton iconPack={this.iconPack} t={this.t}>
            <dyte-permissions-message {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeBreakoutRoomsManager?.active === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() =>
              this.updateStoreState('activeBreakoutRoomsManager', {
                active: false,
                data: undefined,
              })
            }
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-breakout-rooms-manager {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeConfirmationModal?.active === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => this.updateStoreState('activeConfirmationModal', false)}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-confirmation-modal {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeOverlayModal?.active === true) {
      return (
        <Host>
          <dyte-overlay-modal
            meeting={this.meeting}
            states={this.states}
            iconPack={this.iconPack}
            t={this.t}
          />
        </Host>
      );
    } else if (states?.activeBroadcastMessageModal) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => this.updateStoreState('activeBroadcastMessageModal', false)}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-broadcast-message-modal {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeJoinStage === true) {
      const dataState = {
        title: this.t('stage.join_title'),
        label: {
          accept: this.t('stage.join_confirm'),
          reject: this.t('stage.join_cancel'),
        },
        description: this.t('stage.join_summary'),
      };
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={this.cancelJoinStage}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-join-stage
              dataConfig={dataState}
              onDyteJoinStage={this.joinStage}
              onDyteLeaveStage={this.cancelJoinStage}
              {...defaults}
            />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeMuteAllConfirmation === true) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => {
              this.updateStoreState('activeMuteAllConfirmation', false);
            }}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-mute-all-confirmation {...defaults} />
          </dyte-dialog>
        </Host>
      );
    } else if (states?.activeChannelCreator) {
      return (
        <Host>
          <dyte-dialog
            open
            onDyteDialogClose={() => {
              this.updateStoreState('activeChannelCreator', false);
            }}
            iconPack={this.iconPack}
            t={this.t}
          >
            <dyte-channel-creator {...defaults} />
          </dyte-dialog>
        </Host>
      );
    }
    return null;
  }
}
