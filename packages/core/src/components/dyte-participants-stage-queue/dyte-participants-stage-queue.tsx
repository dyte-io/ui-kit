import { Component, h, Prop, State, Watch } from '@stencil/core';
import { UIConfig, Size, IconPack, defaultIconPack, DyteI18n, defaultConfig } from '../../exports';
import { useLanguage } from '../../lib/lang';
import { Meeting, Participant, Peer } from '../../types/dyte-client';
import { SyncWithStore } from '../../utils/sync-with-store';
import { ParticipantsViewMode } from '../dyte-participants/dyte-participants';

@Component({
  tag: 'dyte-participants-stage-queue',
  styleUrl: 'dyte-participants-stage-queue.css',
  shadow: true,
})
export class DyteParticipantsStaged {
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** View mode for participants list */
  @Prop() view: ParticipantsViewMode = 'sidebar';

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  @State() stageRequestedParticipants: Peer[] = [];

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    const { stage } = this.meeting;
    stage?.removeListener('stageAccessRequestUpdate', this.updateRequestList);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting == null) return;

    this.updateRequestList();
    meeting.participants.joined.on('stageStatusUpdate', (e) => {
      this.updateStageRequestedParticipants();
    });
    meeting.stage?.on('stageAccessRequestUpdate', this.updateRequestList);
  }

  private updateStageRequestedParticipants = () => {
    this.stageRequestedParticipants = this.meeting.participants.joined
      .toArray()
      .filter((p: Participant) => p.stageStatus === 'REQUESTED_TO_JOIN_STAGE');
  };

  private acceptStageRequest = async (p: Peer) => {
    const { userId } = p;
    await this.meeting.stage.grantAccess([userId]);
  };

  private rejectStageRequest = async (p: Peer) => {
    const { userId } = p;
    await this.meeting.stage.denyAccess([userId]);
  };

  private acceptAllStageRequest = async () => {
    await this.meeting.stage.grantAccess(this.stageRequestedParticipants.map((p) => p.userId));
  };

  private denyAllStageRequest = async () => {
    await this.meeting.stage?.denyAccess(this.stageRequestedParticipants.map((p) => p.userId));
  };

  private shouldShowStageRequests = () => {
    return (
      this.meeting.self.permissions.stageEnabled &&
      this.meeting.self.permissions.acceptStageRequests &&
      this.stageRequestedParticipants.length > 0
    );
  };

  private updateRequestList = async (stageRequests?: any[]) => {
    if (
      !this.meeting.self.permissions.acceptStageRequests ||
      !this.meeting.self.permissions.stageEnabled
    ) {
      this.stageRequestedParticipants = [];
      return;
    }
    if (
      this.meeting.meta.viewType === 'LIVESTREAM' ||
      this.meeting?.self?.permissions?.mediaRoomType === 'HIVE'
    ) {
      if (!stageRequests) {
        stageRequests = (await this.meeting.stage?.getAccessRequests())?.stageRequests ?? [];
      }

      /**
       * NOTE(ishita1805): Temporarily mapping `displayName` to `name` till socket service sends the correct key.
       */
      this.stageRequestedParticipants = stageRequests.map((p: any) => {
        return {
          ...p,
          name: p.displayName,
        };
      }) as unknown as Peer[];
    } else {
      this.stageRequestedParticipants = [
        this.meeting.self,
        ...this.meeting.participants.joined.toArray(),
      ]?.filter((p: Peer) => p.stageStatus === 'REQUESTED_TO_JOIN_STAGE');
    }
  };

  render() {
    if (this.view !== 'sidebar' || !this.shouldShowStageRequests()) return;
    return (
      <div class="stage-requested-participants">
        <div class="heading-count" part="staged-heading-count">
          {this.t('stage_request.header_title')} ({this.stageRequestedParticipants.length})
        </div>
        <ul class="participants" part="staged-participants">
          {this.stageRequestedParticipants.map((participant) => (
            <li class="waiting-participant" key={participant.id}>
              <div class="participant-details">
                <dyte-avatar
                  participant={participant}
                  size="sm"
                  iconPack={this.iconPack}
                  t={this.t}
                />
                <p class="name" title={participant.name}>
                  {participant.name}
                </p>
              </div>
              <div class="waitlist-controls">
                <dyte-tooltip label={this.t('stage_request.deny_request')} variant="secondary">
                  <dyte-button
                    variant="secondary"
                    kind="icon"
                    onClick={() => this.rejectStageRequest(participant)}
                  >
                    <dyte-icon class="deny" icon={this.iconPack.dismiss} />
                  </dyte-button>
                </dyte-tooltip>
                <dyte-tooltip label={this.t('stage_request.accept_request')} variant="secondary">
                  <dyte-button
                    variant="secondary"
                    kind="icon"
                    onClick={() => this.acceptStageRequest(participant)}
                  >
                    <dyte-icon class="accept" icon={this.iconPack.checkmark} />
                  </dyte-button>
                </dyte-tooltip>
              </div>
            </li>
          ))}
        </ul>
        <div class="bulk-actions">
          <dyte-button
            class="accept-all-button"
            variant="secondary"
            onClick={this.acceptAllStageRequest}
          >
            {this.t('stage_request.accept_all')}
          </dyte-button>
          <dyte-button class="deny-all-button" variant="danger" onClick={this.denyAllStageRequest}>
            {this.t('stage_request.deny_all')}
          </dyte-button>
        </div>
      </div>
    );
  }
}
