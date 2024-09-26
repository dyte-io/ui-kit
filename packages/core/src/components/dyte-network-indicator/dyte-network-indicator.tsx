import { DyteParticipant } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { defaultIconPack, DyteI18n, DyteUIKitStore, IconPack } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting, Peer } from '../../types/dyte-client';
import { MediaScoreUpdateParams } from '../../types/web-core';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-network-indicator',
  styleUrl: 'dyte-network-indicator.css',
  shadow: true,
})
export class DyteNetworkIndicator {
  private componentPropsCleanupFn: () => void = () => {};
  /** Participant or Self */
  @Prop() participant: Peer;

  /** Meeting */
  @Prop() meeting: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Is for screenshare */
  @Prop() isScreenShare = false;

  @State() score = 10;

  connectedCallback() {
    this.participantChanged(this.participant);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('participant')
  participantChanged(participant: Peer) {
    if (!participant) return;

    (participant as DyteParticipant).addListener('mediaScoreUpdate', this.onMediaScoreUpdate);
  }

  disconnectedCallback() {
    (this.participant as DyteParticipant)?.removeListener(
      'mediaScoreUpdate',
      this.onMediaScoreUpdate
    );

    this.componentPropsCleanupFn();
  }

  private onMediaScoreUpdate = ({ kind, isScreenshare, score }: MediaScoreUpdateParams) => {
    if (kind === 'video' || (this.isScreenShare && isScreenshare)) {
      this.score = score;
    }
  };

  render() {
    if (this.meeting && this.meeting.self.userId === this.participant.userId) {
      return null;
    }

    let signal_strength = Math.round(this.score / 2);
    let signal_status: 'good' | 'poor' | 'poorest' = 'good';

    // make sure signal strength is within bounds [1,3]
    // do not show if it is good
    if (signal_strength > 3) {
      return null;
    } else if (signal_strength < 1) {
      signal_strength = 1;
    }

    switch (signal_strength) {
      case 3:
      case 2:
        signal_status = 'poor';
        break;
      case 1:
        signal_status = 'poorest';
    }

    return (
      <Host>
        {/* actual icon */}
        <dyte-icon icon={this.iconPack[`signal_${signal_strength}`]} class={signal_status} />
        {/* background icon */}
        <dyte-icon icon={this.iconPack.signal_5} class="bg-signal" />
      </Host>
    );
  }
}
