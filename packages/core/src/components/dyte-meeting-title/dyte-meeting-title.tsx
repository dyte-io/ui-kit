import { Meeting } from '../../types/dyte-client';
import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';

/**
 * Displays the title of the meeting.
 */
@Component({
  tag: 'dyte-meeting-title',
  styleUrl: 'dyte-meeting-title.css',
  shadow: true,
})
export class DyteMeetingTitle {
  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    const title = this.meeting?.meta.meetingTitle;

    if (title == null) return null;

    return (
      <Host tabIndex={0} role="banner" aria-label={title}>
        <dyte-tooltip label={title} part="tooltip" iconPack={this.iconPack} t={this.t}>
          <div class="title" part="title">
            {title}
          </div>
        </dyte-tooltip>
      </Host>
    );
  }
}
