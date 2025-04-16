import type { RecordingState } from '@dytesdk/web-core';
import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { SyncWithStore } from '../../utils/sync-with-store';
import { Size } from '../../types/props';

/**
 * A component which indicates the recording status of a meeting.
 *
 * It will not render anything if no recording is taking place.
 */
@Component({
  tag: 'dyte-recording-indicator',
  styleUrl: 'dyte-recording-indicator.css',
  shadow: true,
})
export class DyteRecordingIndicator {
  private updateRecordingStatus: (recordingState: RecordingState) => void;

  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  @State() isRecording: boolean;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.recording.removeListener('recordingUpdate', this.updateRecordingStatus);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.setIsRecording(meeting.recording.recordingState);

      this.updateRecordingStatus = (recordingState) => {
        this.setIsRecording(recordingState);
      };
      meeting.recording.addListener('recordingUpdate', this.updateRecordingStatus);
    }
  }

  private setIsRecording = (recordingState: RecordingState) => {
    this.isRecording = recordingState === 'RECORDING';
  };

  render() {
    return (
      <Host data-hidden={!this.isRecording}>
        {this.isRecording && (
          <div class="indicator" aria-label={this.t('recording.indicator')} part="indicator">
            <dyte-icon
              icon={this.iconPack.recording}
              aria-hidden={true}
              tabIndex={-1}
              part="icon"
            />
            <span>{this.t('recording.label')}</span>
          </div>
        )}
      </Host>
    );
  }
}
