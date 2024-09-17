import { defaultIconPack, IconPack } from '../../lib/icons';
import { Meeting, Participant, Peer } from '../../types/dyte-client';
import { Size } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { ParticipantsViewMode } from '../dyte-participants/dyte-participants';
import { defaultConfig } from '../../exports';
import { Render } from '../../lib/render';
import storeState from '../../lib/store';

/**
 * A component which lists all participants, with ability to
 * run privileged actions on each participant according to your permissions.
 */
@Component({
  tag: 'dyte-participants-stage-list',
  styleUrl: 'dyte-participants-stage-list.css',
  shadow: true,
})
export class DyteParticipants {
  private participantJoinedListener: (data: any) => void;
  private participantLeftListener: (data: any) => void;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** View mode for participants list */
  @Prop() view: ParticipantsViewMode = 'sidebar';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Search */
  @Prop() search: string = '';

  @State() participants: Peer[] = [];

  @State() showStageList: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.searchChanged(this.search);
  }

  disconnectedCallback() {
    const { participants, stage } = this.meeting;
    if (this.meeting == null) return;
    this.participantJoinedListener &&
      this.meeting.participants.joined.removeListener(
        'participantJoined',
        this.participantJoinedListener
      );
    this.participantLeftListener &&
      this.meeting.participants.joined.removeListener(
        'participantLeft',
        this.participantLeftListener
      );
    participants.joined.removeListener('stageStatusUpdate', this.updateStageList);
    stage?.removeListener('stageStatusUpdate', this.updateStageList);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    this.participantJoinedListener = (participant: Participant) => {
      if (participant.stageStatus !== 'ON_STAGE') return;
      // Do not append if participant name or id does not match search query
      const lowerCaseSearch = this.search.toLowerCase();
      if (
        !participant.name.toLowerCase().includes(lowerCaseSearch) ||
        !participant.id.toLowerCase().includes(lowerCaseSearch)
      )
        return;
      this.participants = [
        ...this.participants.filter((p) => p.id !== participant.id),
        participant,
      ];
    };
    this.participantLeftListener = (participant: Participant) => {
      this.participants = this.participants.filter((p) => p.id !== participant.id);
    };

    meeting.participants.joined.addListener('participantJoined', this.participantJoinedListener);
    meeting.participants.joined.addListener('participantLeft', this.participantLeftListener);
    this.updateStageList();
    meeting?.participants.joined.on('stageStatusUpdate', this.updateStageList);
    meeting?.stage.on('stageStatusUpdate', this.updateStageList);
  }

  @Watch('search')
  searchChanged(search: string) {
    this.getParticipants(search);
  }

  private getParticipants(search = this.search) {
    let list: Peer[] = this.meeting.stage.status === 'ON_STAGE' ? [this.meeting.self] : [];
    list = [
      ...list,
      ...this.meeting.participants.joined.toArray().filter((p) => p.stageStatus === 'ON_STAGE'),
    ];

    if (search === '') this.participants = list;
    else {
      this.participants = list.filter((p) =>
        (p.name ?? p.id).toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  private updateStageList = () => {
    if (this.meeting?.meta.viewType === 'LIVESTREAM') {
      this.showStageList = this.meeting?.stage?.status === 'ON_STAGE';
    } else this.showStageList = true;
    this.getParticipants(this.search);
  };

  render() {
    if (!this.showStageList) return;
    const defaults = {
      meeting: this.meeting,
      view: this.view,
      t: this.t,
      config: this.config,
      states: storeState,
      size: this.size,
      iconPack: this.iconPack,
    };
    return (
      <Host>
        <div class="participants-container">
          <div class="heading-count" part="heading-count">
            {this.t('participants')} ({this.participants.length})
          </div>
          <ul class="participants" part="participants">
            {this.participants.map((participant) => (
              <Render
                element="dyte-participant"
                defaults={defaults}
                props={{ role: 'listitem', participant, key: participant.id }}
                childProps={{ ...defaults, participant, size: this.size }}
                deepProps={true}
              />
            ))}
            {this.participants.length === 0 && (
              <div class="empty-message" part="empty-message">
                {this.search.length > 0 ? this.t('search.could_not_find') : this.t('search.empty')}
              </div>
            )}
          </ul>
        </div>
      </Host>
    );
  }
}
