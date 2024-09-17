import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
  Watch,
  Element,
} from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { DefaultProps, lenChildren, Render } from '../../lib/render';
import { Meeting, Participant, Peer } from '../../types/dyte-client';
import { formatName, shorten } from '../../utils/string';
import storeState from '../../lib/store';
import { defaultConfig, UIConfig } from '../../exports';
import { FlagsmithFeatureFlags } from '../../utils/flags';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { DyteParticipant as DyteParticipantType } from '@dytesdk/web-core';

export type ParticipantViewMode = 'sidebar';

/**
 * A participant entry component used inside `dyte-participants` which shows data like:
 * name, picture and media device status.
 *
 * You can perform privileged actions on the participant too.
 */
@Component({
  tag: 'dyte-participant',
  styleUrl: 'dyte-participant.css',
  shadow: true,
})
export class DyteParticipant {
  private audioUpdateListener: (data: Pick<Peer, 'audioEnabled' | 'audioTrack'>) => void;
  private videoUpdateListener: (data: Pick<Peer, 'videoEnabled' | 'videoTrack'>) => void;

  private pinnedListener = ({ isPinned }: Peer) => {
    this.isPinned = isPinned;
  };

  private stageListener = ({ stageStatus }: Peer) => {
    this.isOnStage = stageStatus === 'ON_STAGE';
  };

  @Element() host: HTMLDyteParticipantElement;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Show participant summary */
  @Prop() view: ParticipantViewMode = 'sidebar';

  /** Participant object */
  @Prop() participant: Peer;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Config object */
  @Prop() config: UIConfig = defaultConfig;

  /**
   * Emit dyte notifications
   */
  @Event({ bubbles: true, composed: true }) dyteSendNotification: EventEmitter<{
    trace: string;
    message: string;
  }>;

  @State() audioEnabled: boolean = false;
  @State() videoEnabled: boolean = false;
  @State() isPinned: boolean = false;
  @State() isOnStage: boolean = false;

  @State() canDisableParticipantAudio: boolean = false;
  @State() canDisableParticipantVideo: boolean = false;
  @State() canKickParticipant: boolean = false;
  @State() canPinParticipant: boolean = false;
  @State() canAllowParticipantOnStage: boolean = false;

  @State() menuOpen: boolean = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.participantChanged(this.participant);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    this.meeting?.self.permissions.removeListener(
      'permissionsUpdate',
      this.permissionsUpdateListener
    );
    if (this.participant == null || this.participant.removeListener == undefined) return;
    this.audioUpdateListener &&
      (this.participant as DyteParticipantType).removeListener(
        'audioUpdate',
        this.audioUpdateListener
      );
    this.videoUpdateListener &&
      (this.participant as DyteParticipantType).removeListener(
        'videoUpdate',
        this.videoUpdateListener
      );
    (this.participant as DyteParticipantType).removeListener('pinned', this.pinnedListener);
    (this.participant as DyteParticipantType).removeListener('unpinned', this.pinnedListener);
    (this.participant as DyteParticipantType).removeListener(
      'stageStatusUpdate',
      this.stageListener
    );
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      const { self } = meeting;
      this.canDisableParticipantAudio =
        self.permissions.canAllowParticipantAudio || self.permissions.canDisableParticipantAudio;
      this.canDisableParticipantVideo =
        self.permissions.canAllowParticipantVideo || self.permissions.canDisableParticipantVideo;
      this.canKickParticipant =
        self.permissions.kickParticipant &&
        this.meeting?.__internals__.features.hasFeature(FlagsmithFeatureFlags.DISABLE_KICKING) !==
          true &&
        (this.meeting?.__internals__.features.hasFeature(
          FlagsmithFeatureFlags.ADMIN_CANTREMOVE_ADMIN
        ) !== true ||
          this.participant?.presetName !== 'webinar_admin');
      this.canPinParticipant = self.permissions.pinParticipant;
      this.canAllowParticipantOnStage =
        self.permissions.acceptStageRequests &&
        self.permissions.stageEnabled &&
        (this.meeting?.__internals__.features.hasFeature(
          FlagsmithFeatureFlags.ADMIN_CANTREMOVE_ADMIN
        ) !== true ||
          this.participant?.presetName !== 'webinar_admin') &&
        (this.meeting?.__internals__.features.hasFeature(
          FlagsmithFeatureFlags.CANTINVITE_VIEWER
        ) !== true ||
          this.participant?.presetName !== 'webinar_viewer');

      meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
    }
  }

  @Watch('participant')
  participantChanged(participant: Peer) {
    if (participant != null) {
      this.audioEnabled = participant.audioEnabled;
      this.videoEnabled = participant.videoEnabled;
      this.isPinned = participant.isPinned;
      this.isOnStage = participant.stageStatus === 'ON_STAGE';
      this.audioUpdateListener = ({ audioEnabled }) => {
        this.audioEnabled = audioEnabled;
      };
      this.videoUpdateListener = ({ videoEnabled }) => {
        this.videoEnabled = videoEnabled;
      };
      if (participant.addListener == undefined) return;
      (participant as DyteParticipantType).addListener('audioUpdate', this.audioUpdateListener);
      (participant as DyteParticipantType).addListener('videoUpdate', this.videoUpdateListener);
      (participant as DyteParticipantType).addListener('pinned', this.pinnedListener);
      (participant as DyteParticipantType).addListener('unpinned', this.pinnedListener);
      (participant as DyteParticipantType).addListener('stageStatusUpdate', this.stageListener);
    }
  }

  private permissionsUpdateListener = () => {
    this.meetingChanged(this.meeting);
  };

  private inviteToStageToggle = async () => {
    const p = this.participant as Participant;
    const { stage } = this.meeting;
    // If request has been sent once, do nothing.
    if (p.stageStatus === 'ACCEPTED_TO_JOIN_STAGE') {
      // Send a notification to host telling that the user has been invited.
      this.dyteSendNotification.emit({
        message: `${p.name} ${this.t('stage.invited_notification')}`,
        trace: `join-stage-${p.id}`,
      });
      return;
    }
    if (this.isOnStage) {
      // NOTE (@madhugb): when a pinned participnat is removed from stage, we need to unpin them manually
      if (p.isPinned) p.unpin();
      await stage.kick([p.userId]);
    } else {
      await stage.grantAccess([p.userId]);
      // Send a notification to host telling that the user has been invited.
      this.dyteSendNotification.emit({
        message: `${p.name} ${this.t('stage.invited_notification')}`,
        trace: `join-stage-invite-${p.id}`,
      });
    }
    this.isOnStage = p.stageStatus === 'ON_STAGE';
  };

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = () => {
    // handles clicking on other menu triggers
    if (!this.clickedThis && this.menuOpen) {
      // if other trigger is clicked, hide this menu-list
      this.menuOpen = false;
    }
    this.clickedThis = false;
  };

  private clickedThis: boolean = false;

  private update = () => {
    const triggerEl = this.host.shadowRoot.getElementById('trigger');
    const menuListEl = this.host.shadowRoot.getElementById('menu-list');
    computePosition(triggerEl, menuListEl, {
      placement: 'bottom-end',
      middleware: [offset(10), flip(), shift({ padding: 5 })],
    }).then(({ x, y }) => {
      Object.assign(menuListEl.style, {
        right: `${x}px`,
        top: `${y}px`,
      });
    });
  };

  private onMenuToggle = () => {
    this.clickedThis = true;
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.update();
    }
  };

  render() {
    const isAudioRoom = this.meeting?.meta.viewType === 'AUDIO_ROOM';
    const isSelf = this.meeting?.self.id === this.participant.id;

    const showMenu =
      (this.canDisableParticipantAudio && this.audioEnabled) ||
      (this.canDisableParticipantVideo && this.videoEnabled && !isAudioRoom) ||
      this.canKickParticipant ||
      (this.canPinParticipant && this.isOnStage) ||
      this.canAllowParticipantOnStage;

    const name = formatName(this.participant?.name || '');
    // NOTE(@madhugb): Show some actions for only on stage / non-webinar participants
    // NOTE(@vaibhavshn): Update check after listeners are implemented
    const isActiveParticipant =
      this.isOnStage || ['GROUP_CALL', 'AUDIO_ROOM'].includes(this.meeting?.meta.viewType);

    const defaults: DefaultProps = {
      meeting: this.meeting,
      size: 'sm',
      states: storeState,
      config: this.config,
      iconPack: this.iconPack,
      t: this.t,
    };
    return (
      <Host>
        <div class="left">
          <dyte-avatar
            participant={this.participant}
            size="sm"
            iconPack={this.iconPack}
            t={this.t}
          />
          <p class="name" title={name}>
            {shorten(name, 16)} {this.meeting?.self.id === this.participant?.id && this.t('(you)')}
          </p>
        </div>
        {this.view === 'sidebar' && (
          <div class="right">
            {isActiveParticipant && (
              <dyte-icon
                class={{
                  red: !this.audioEnabled,
                }}
                iconPack={this.iconPack}
                t={this.t}
                icon={this.audioEnabled ? this.iconPack.mic_on : this.iconPack.mic_off}
              />
            )}

            {isActiveParticipant && !isAudioRoom && (
              <dyte-icon
                class={{
                  red: !this.videoEnabled,
                }}
                iconPack={this.iconPack}
                t={this.t}
                icon={this.videoEnabled ? this.iconPack.video_on : this.iconPack.video_off}
              />
            )}

            {(showMenu ||
              lenChildren({
                element: 'dyte-participant',
                defaults: defaults,
                childProps: {
                  participant: this.participant,
                },
              }) > 0) && (
              <div class="menu">
                <span id="trigger" onClick={this.onMenuToggle}>
                  <dyte-button
                    variant="ghost"
                    kind="icon"
                    slot="trigger"
                    iconPack={this.iconPack}
                    t={this.t}
                  >
                    <dyte-icon class="more" icon={this.iconPack.more_vertical} />
                  </dyte-button>
                </span>
                <span id="menu-list">
                  {this.menuOpen && (
                    <dyte-menu-list iconPack={this.iconPack} t={this.t}>
                      {this.canPinParticipant && isActiveParticipant && !isAudioRoom && (
                        <dyte-menu-item
                          onClick={() => {
                            if (this.isPinned) {
                              this.participant.unpin();
                            } else {
                              this.participant.pin();
                            }
                          }}
                          iconPack={this.iconPack}
                          t={this.t}
                        >
                          <dyte-icon
                            icon={this.isPinned ? this.iconPack.pin_off : this.iconPack.pin}
                            slot="start"
                            iconPack={this.iconPack}
                            t={this.t}
                          />
                          {this.isPinned ? this.t('unpin') : this.t('pin')}
                        </dyte-menu-item>
                      )}

                      {this.canDisableParticipantAudio && isActiveParticipant && this.audioEnabled && (
                        <dyte-menu-item
                          iconPack={this.iconPack}
                          t={this.t}
                          onClick={() => {
                            this.participant.disableAudio();
                          }}
                        >
                          <dyte-icon icon={this.iconPack.mic_off} slot="start" />
                          {this.t('mute')}
                        </dyte-menu-item>
                      )}

                      {this.canDisableParticipantVideo && isActiveParticipant && this.videoEnabled && (
                        <dyte-menu-item
                          iconPack={this.iconPack}
                          t={this.t}
                          onClick={() => {
                            this.participant.disableVideo();
                          }}
                        >
                          <dyte-icon
                            icon={this.iconPack.video_off}
                            slot="start"
                            iconPack={this.iconPack}
                            t={this.t}
                          />
                          {this.t('participants.turn_off_video')}
                        </dyte-menu-item>
                      )}

                      {this.canAllowParticipantOnStage &&
                        this.participant?.id !== this.meeting?.self.id && (
                          <dyte-menu-item
                            iconPack={this.iconPack}
                            t={this.t}
                            class={this.isOnStage ? 'red' : ''}
                            onClick={this.inviteToStageToggle}
                          >
                            <dyte-icon
                              iconPack={this.iconPack}
                              t={this.t}
                              icon={
                                this.isOnStage
                                  ? this.iconPack.leave_stage
                                  : this.iconPack.join_stage
                              }
                              slot="start"
                            />
                            {this.isOnStage
                              ? this.t('stage.remove_from_stage')
                              : this.t('stage.add_to_stage')}
                          </dyte-menu-item>
                        )}

                      {!isSelf && this.canKickParticipant && (
                        <dyte-menu-item
                          iconPack={this.iconPack}
                          t={this.t}
                          class="red"
                          onClick={() => {
                            this.meeting?.participants.kick(this.participant?.id);
                          }}
                        >
                          <dyte-icon
                            icon={this.iconPack.dismiss}
                            slot="start"
                            iconPack={this.iconPack}
                            t={this.t}
                          />
                          {this.t('kick')}
                        </dyte-menu-item>
                      )}
                      <slot>
                        <Render
                          element="dyte-participant"
                          defaults={defaults}
                          childProps={{
                            participant: this.participant,
                          }}
                          deepProps
                          onlyChildren
                        />
                      </slot>
                    </dyte-menu-list>
                  )}
                </span>
              </div>
            )}
          </div>
        )}
      </Host>
    );
  }
}
