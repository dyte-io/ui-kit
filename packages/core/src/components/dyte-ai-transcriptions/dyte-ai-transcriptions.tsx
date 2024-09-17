import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { ChatHead } from '../dyte-chat/components/ChatHead';
import { Meeting } from '../../types/dyte-client';
import { Transcript } from '../../types/props';
import { smoothScrollToBottom } from '../../utils/scroll';
import clone from '../../utils/clone';

@Component({
  tag: 'dyte-ai-transcriptions',
  styleUrl: 'dyte-ai-transcriptions.css',
  shadow: true,
})
export class DyteAiTranscriptions {
  private contentContainer!: HTMLDivElement;

  @State() participantQuery = '';

  @State() isProcessing = false;

  @State() captionViewEnabled = false;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Meeting object */
  @Prop() meeting!: Meeting;

  @State() transcriptions: Transcript[] = [];

  /** Initial transcriptions */
  @Prop() initialTranscriptions: Transcript[];

  // private transcriptionHandler(data: Transcript) {
  //   this.transcriptions = [...this.transcriptions, data];
  // }

  private transcriptionsReducer(acc: Transcript[], t: Transcript) {
    if (!acc.length || acc[acc.length - 1].peerId !== t.peerId) {
      return acc.concat(t);
    }

    const lastElement = acc[acc.length - 1];
    if (lastElement.id === t.id) {
      lastElement.transcript = t.transcript;
      acc.pop();
      return acc.concat(lastElement);
    }

    return acc.concat(t);
  }

  connectedCallback() {
    if (!this.meeting) return;

    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    this.meeting?.ai?.off('transcript', this.onTranscriptHandler);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    this.transcriptions = clone(meeting?.ai?.transcripts);
    this.transcriptions = this.transcriptions.reduce(this.transcriptionsReducer, []);

    meeting?.ai?.on('transcript', this.onTranscriptHandler);
  }

  @Watch('transcriptions')
  transcriptionsChanged() {
    setTimeout(() => {
      smoothScrollToBottom(this.contentContainer, false);
    }, 100);
  }

  private onTranscriptHandler = (data: Transcript) => {
    this.transcriptions = this.transcriptionsReducer(this.transcriptions, data);
  };

  renderTranscripts() {
    const transcripts = this.transcriptions.filter((t) =>
      this.participantQuery
        ? t.name.toLowerCase().includes(this.participantQuery.toLowerCase())
        : true
    );

    const renderedTranscripts = [];
    transcripts.forEach((transcript) => {
      const t = {
        name: transcript.name,
        date: transcript.date,
        peerId: transcript.peerId,
        transcript: transcript.transcript,
      };

      if (!renderedTranscripts.length) {
        renderedTranscripts.push(t);
        return;
      }

      const lastTranscript = renderedTranscripts[renderedTranscripts.length - 1];

      if (transcript.peerId !== lastTranscript.peerId) {
        renderedTranscripts.push(t);
        return;
      }

      lastTranscript.transcript += ' ' + transcript.transcript;
    });

    return renderedTranscripts.map((transcription) => {
      return (
        <div class="message">
          <ChatHead
            name={transcription.name}
            time={new Date(transcription.date)}
            now={new Date()}
          />
          <div class="body">{transcription.transcript}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <Host>
        {/* <div class="caption-view">
          <div>{this.t('ai.caption_view')}</div>
          <dyte-switch
            checked={this.captionViewEnabled}
            onDyteChange={(e) => {
              this.captionViewEnabled = e.detail;
            }}
          />
        </div> */}

        <div class="search-bar">
          <input
            type="text"
            placeholder="Search Participant"
            value={this.participantQuery}
            onInput={(e) => (this.participantQuery = (e.target as HTMLInputElement).value)}
          />
        </div>

        {this.isProcessing && (
          <div class="processing">
            <p>Processing audio....</p>
          </div>
        )}

        {!this.isProcessing && (
          <div
            class="content scrollbar"
            ref={(el) => (this.contentContainer = el as HTMLDivElement)}
          >
            <div class="started-message">Transcription started</div>

            {this.renderTranscripts()}
          </div>
        )}

        {this.captionViewEnabled && <dyte-ai-caption />}
      </Host>
    );
  }
}
