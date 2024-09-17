import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { Size } from '../../exports';

@Component({
  tag: 'dyte-spotlight-indicator',
  styleUrl: 'dyte-spotlight-indicator.css',
  shadow: true,
})
export class DyteSpotlightIndicator {
  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

  @State() canSpotlight: boolean;

  @State() isSpotlighted: boolean;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.self.permissions.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );
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
