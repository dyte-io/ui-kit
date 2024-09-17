import type { LivestreamState } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Size, DyteI18n, IconPack, defaultIconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { showLivestream } from '../../utils/livestream';

@Component({
  tag: 'dyte-livestream-indicator',
  styleUrl: 'dyte-livestream-indicator.css',
  shadow: true,
})
export class DyteLivestreamIndicator {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() isLivestreaming: boolean;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    this.meeting?.livestream?.removeListener('livestreamUpdate', this.setIsLivestreaming);
  }
  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;
    this.setIsLivestreaming(this.meeting.livestream?.state);
    this.meeting.livestream?.on('livestreamUpdate', this.setIsLivestreaming);
  }

  private setIsLivestreaming = (state: LivestreamState) => {
    this.isLivestreaming = state === 'LIVESTREAMING';
  };

  render() {
    if (!showLivestream(this.meeting) || !this.isLivestreaming) return;

    return (
      <Host>
        <div class="indicator" aria-label={this.t('livestream.indicator')} part="indicator">
          <dyte-icon icon={this.iconPack.start_livestream} size={this.size} />
          <span>{this.t('LIVE')}</span>
        </div>
      </Host>
    );
  }
}
