import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { showLivestream } from '../../utils/livestream';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

export type ViewerCountVariant = 'primary' | 'embedded';

/**
 * A component which shows count of total joined participants in a meeting.
 */
@Component({
  tag: 'dyte-viewer-count',
  styleUrl: 'dyte-viewer-count.css',
  shadow: true,
})
export class DyteViewerCount {
  private componentPropsCleanupFn: () => void = () => {};
  private countListener: () => void;

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** Viewer count variant */
  @Prop({ reflect: true }) variant: ViewerCountVariant = 'primary';

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() viewerCount: number = 0;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  private disconnectMeeting = (meeting: Meeting) => {
    if (meeting != null && this.countListener != null) {
      meeting.livestream?.removeListener('viewerCountUpdate', this.countListener);
    }
  };

  disconnectedCallback() {
    this.disconnectMeeting(this.meeting);
    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting, oldMeeting?: Meeting) {
    this.disconnectMeeting(oldMeeting);
    if (meeting != null) {
      this.countListener = () => {
        this.viewerCount = meeting.livestream?.viewerCount;
      };
      this.countListener();
      meeting.livestream?.addListener('viewerCountUpdate', this.countListener);
    }
  }

  render() {
    if (!showLivestream(this.meeting)) return null;
    return (
      <Host tabIndex={0} role="log" aria-label={`${this.viewerCount} ${this.t('viewers')}`}>
        <dyte-icon
          icon={this.iconPack.viewers}
          tabIndex={-1}
          aria-hidden={true}
          part="icon"
          iconPack={this.iconPack}
          t={this.t}
        />
        {this.viewerCount} {this.t('viewers')}
      </Host>
    );
  }
}
