import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import storeState, { onChange } from '../../lib/store';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { canViewPolls } from '../../utils/sidebar';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';

/**
 * A button which toggles visibility of polls.
 *
 * You need to pass the `meeting` object to it to see the unread polls count badge.
 *
 * When clicked it emits a `dyteStateUpdate` event with the data:
 *
 * ```ts
 * { activeSidebar: boolean; sidebar: 'polls' }
 * ```
 */
@Component({
  tag: 'dyte-polls-toggle',
  styleUrl: 'dyte-polls-toggle.css',
  shadow: true,
})
export class DytePollsToggle {
  private removeStateChangeListener: () => void;

  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() pollsActive: boolean = false;

  @State() unreadPollsCount: number = 0;

  @State() canViewPolls: boolean = false;

  private onPollsUpdate = ({ newPoll }) => {
    if (newPoll === true) this.unreadPollsCount += 1;
  };

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.statesChanged(this.states);
    this.removeStateChangeListener = onChange('sidebar', () => this.statesChanged());
  }

  disconnectedCallback() {
    this.removeStateChangeListener && this.removeStateChangeListener();
    this.meeting?.polls?.removeListener('pollsUpdate', this.onPollsUpdate);
    this.meeting?.self?.permissions.removeListener('pollsUpdate', this.updateCanView);
    this.meeting?.stage?.removeListener('stageStatusUpdate', this.updateCanView);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting && meeting.polls) {
      this.unreadPollsCount = meeting.polls.items.length;

      this.meeting.polls.addListener('pollsUpdate', this.onPollsUpdate);
      meeting?.self?.permissions.addListener('pollsUpdate', this.updateCanView);
      this.canViewPolls = canViewPolls(meeting);
      meeting?.stage?.on('stageStatusUpdate', this.updateCanView);
    }
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || storeState;
    if (states != null) {
      this.pollsActive = states.activeSidebar === true && states.sidebar === 'polls';
    }
  }

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private togglePollsTab() {
    const states = this.states || storeState;
    this.unreadPollsCount = 0;
    this.pollsActive = !(states?.activeSidebar && states?.sidebar === 'polls');
    this.stateUpdate.emit({
      activeSidebar: this.pollsActive,
      sidebar: this.pollsActive ? 'polls' : undefined,
      activeMoreMenu: false,
      activeAI: false,
    });
    storeState.activeSidebar = this.pollsActive;
    storeState.sidebar = this.pollsActive ? 'polls' : undefined;
    storeState.activeMoreMenu = false;
    storeState.activeAI = false;
  }

  private updateCanView = () => {
    this.canViewPolls = canViewPolls(this.meeting);
  };

  render() {
    if (!this.canViewPolls) return;
    const text = this.t('polls');
    // TODO(callmetarush): Just showing polls for all V2 users irrespective of themes
    // untill we get ui theme for V2.

    return (
      <Host title={text}>
        {this.unreadPollsCount !== 0 && !this.pollsActive && (
          <div class="unread-count" part="unread-count">
            <span>{this.unreadPollsCount <= 100 ? this.unreadPollsCount : '99+'}</span>
          </div>
        )}
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          class={{ active: this.pollsActive }}
          onClick={() => this.togglePollsTab()}
          icon={this.iconPack.poll}
          label={text}
          variant={this.variant}
        />
      </Host>
    );
  }
}
