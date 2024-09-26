import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { DyteI18n } from '../../lib/lang';
import { IconPack } from '../../lib/icons';
import { DyteUIKitStore, Size } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-spotlight-indicator',
  styleUrl: 'dyte-spotlight-indicator.css',
  shadow: true,
})
export class DyteSpotlightIndicator {
  private componentPropsCleanupFn: () => void = () => {};
  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  @State() canSpotlight: boolean;

  @State() isSpotlighted: boolean;

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.self.permissions.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.canSpotlight = meeting.self.permissions.canSpotlight;
      this.isSpotlighted = meeting.meta?.broadcastTabChanges ?? false;
      meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
    }
  }

  private permissionsUpdateListener = () => {
    this.canSpotlight = this.meeting.self.permissions.canSpotlight;
  };

  private updateSpotlightState(shouldBroadcastTabChanges: boolean) {
    try {
      this.meeting.meta?.setBroadcastTabChanges(shouldBroadcastTabChanges);
      this.isSpotlighted = shouldBroadcastTabChanges;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  render() {
    if (!this.canSpotlight) return;
    return (
      <Host>
        <dyte-tooltip
          size={'md'}
          iconPack={this.iconPack}
          t={this.t}
          label={this.t('remote_access.indicator')}
        >
          <div
            id="sync-button"
            class={{
              tab: true,
              active: this.isSpotlighted,
            }}
            onClick={() => this.updateSpotlightState(!this.isSpotlighted)}
          >
            <span class="name">Sync</span>
            <dyte-icon
              id="icon"
              iconPack={this.iconPack}
              t={this.t}
              icon={this.isSpotlighted ? this.iconPack.checkmark : this.iconPack.warning}
              tabIndex={-1}
              aria-hidden={true}
            />
          </div>
        </dyte-tooltip>
      </Host>
    );
  }
}
