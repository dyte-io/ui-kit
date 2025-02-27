import { Component, Host, h, Prop } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { isLiveStreamViewer } from '../../utils/livestream';
import { Size } from '../../types/props';
import { DyteState } from '../../lib/coreReactivity';

/**
 * A component which shows count of total joined participants in a meeting.
 */
@Component({
  tag: 'dyte-participant-count',
  styleUrl: 'dyte-participant-count.css',
  shadow: true,
})
export class DyteParticipantCount {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

  @DyteState((m) => isLiveStreamViewer(m))
  private isViewer: boolean = false;

  @DyteState((m) => m.participants.joined.size + 1)
  private participantCount = 0;

  render() {
    if (this.isViewer) return null;
    return (
      <Host
        tabIndex={0}
        role="log"
        aria-label={`${this.participantCount} ${this.t('participants')}`}
      >
        <dyte-icon
          icon={this.iconPack.people}
          tabIndex={-1}
          aria-hidden={true}
          part="icon"
          iconPack={this.iconPack}
          t={this.t}
        />
        {this.participantCount}
      </Host>
    );
  }
}
