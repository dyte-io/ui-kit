import { Component, h, Prop, Watch } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import uiStore from '../../utils/sync-with-store/ui-store';
import { DyteI18n, IconPack } from '../../exports';

@Component({
  tag: 'dyte-ui-provider',
})
export class DyteUiProvider {
  /** Meeting */
  @Prop() meeting: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack;

  /** Language utility */
  @Prop() t: DyteI18n;

  /** Do not render children until meeting is initialized
   * @default false
   */
  @Prop() noRenderUntilMeeting: boolean = false;

  connectedCallback() {
    this.onMeetingChange(this.meeting);
    this.onIconPackChange(this.iconPack);
    this.onTChange(this.t);
  }

  @Watch('meeting')
  onMeetingChange(newMeeting: Meeting) {
    uiStore.state.meeting = newMeeting;
  }

  @Watch('iconPack')
  onIconPackChange(newIconPack: IconPack) {
    uiStore.state.iconPack = newIconPack;
  }

  @Watch('t')
  onTChange(newT: DyteI18n) {
    uiStore.state.t = newT;
  }

  render() {
    if (this.noRenderUntilMeeting && !this.meeting) {
      return null;
    }

    return <slot />;
  }
}
