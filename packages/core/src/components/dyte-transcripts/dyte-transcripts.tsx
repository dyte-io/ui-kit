import { Component, Host, h, Prop, State, Element, Watch, writeTask } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';

import { Transcript, States } from '../../types/props';
import { DyteI18n } from '../../lib/lang';
import { UIConfig } from '../../types/ui-config';
import { defaultConfig, DyteUIKitStore } from '../../exports';

import clone from '../../utils/clone';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which handles transcripts.
 *
 * You can configure which transcripts you want to see and which ones you want to hear.
 * There are also certain limits which you can set as well.
 */
@Component({
  tag: 'dyte-transcripts',
  styleUrl: 'dyte-transcripts.css',
  shadow: true,
})
export class DyteTranscripts {
  private componentPropsCleanupFn: () => void = () => {};
  private disconnectTimeout: NodeJS.Timeout;

  @Element() host: HTMLDyteTranscriptsElement;

  /** Meeting object */
  @Prop() meeting: Meeting = DyteUIKitStore.state.componentProps.meeting;

  /** States object */
  @Prop() states: States = DyteUIKitStore.state;

  /** Config object */
  @Prop() config: UIConfig = DyteUIKitStore.state.componentProps.config;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() transcripts: Array<Transcript & { renderedId?: string }> = [];

  @State() listenerAttached = false;

  connectedCallback() {
    this.meetingChanged(this.meeting);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  private addListener(meeting: Meeting) {
    meeting?.ai?.addListener('transcript', this.onTranscript);
    this.listenerAttached = true;
  }

  private clearListeners(meeting: Meeting) {
    this.onTranscript && meeting?.ai?.removeListener('transcript', this.onTranscript);
    this.listenerAttached = false;
    clearTimeout(this.disconnectTimeout);
    this.transcripts = [];
  }

  disconnectedCallback() {
    if (this.meeting == null) return;
    this.clearListeners(this.meeting);

    this.componentPropsCleanupFn();
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting, oldMeeting?: Meeting) {
    clearTimeout(this.disconnectTimeout);
    if (oldMeeting !== undefined) this.clearListeners(oldMeeting);
    if (meeting == null) return;

    if (this.states.activeCaptions) {
      this.addListener(meeting);
    }
  }

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || DyteUIKitStore.state;
    if (states.activeCaptions && !this.listenerAttached) {
      this.addListener(this.meeting);
    }

    if (!states.activeCaptions && this.listenerAttached) {
      this.clearListeners(this.meeting);
    }
  }

  private onTranscript = (transcript: Transcript) => {
    if (transcript.transcript) {
      this.add(transcript);
    }
  };

  private transcriptionsReducer(acc: Transcript[], t: Transcript) {
    if (!acc.length) {
      return [t];
    }

    let lastElement = acc[acc.length - 1];

    if (lastElement.peerId !== t.peerId) {
      return acc.concat(t);
    }

    if (lastElement.id === t.id) {
      lastElement.transcript = t.transcript;
      acc.pop();
      return acc.concat(clone(lastElement));
    }

    return acc.concat(t);
  }

  private add(transcript: Transcript) {
    // show transcripts only if tab is in focus and a maximum of 3 at a time
    // this.transcripts.splice(0, this.transcripts.length - 2);
    this.transcripts = this.transcriptionsReducer(this.transcripts, transcript);
  }

  private remove(renderedId: string) {
    this.transcripts = this.transcripts.filter(
      (transcript) => transcript.renderedId !== renderedId
    );
  }

  private handleDismiss(e: CustomEvent<{ id: string; renderedId: string }>) {
    e.stopPropagation();

    const { id, renderedId } = e.detail;
    const el = this.host.shadowRoot.querySelector(`[data-id="${id}"]`);
    // exit animation
    el?.classList.add('exit');

    setTimeout(() => {
      writeTask(() => {
        this.remove(renderedId);
      });
    }, 400);
  }

  renderTranscripts() {
    const renderedTranscripts = [];
    this.transcripts.forEach((transcript) => {
      const t = {
        name: transcript.name,
        date: transcript.date,
        peerId: transcript.peerId,
        transcript: transcript.transcript,
        id: transcript.id,
        renderedId: transcript.id,
      };

      if (!renderedTranscripts.length) {
        transcript.renderedId = t.renderedId;
        renderedTranscripts.push(t);
        return;
      }

      const lastTranscript = renderedTranscripts[renderedTranscripts.length - 1];

      const maxTranscriptLength = 400;
      if (
        lastTranscript.transcript.length + t.transcript.length > maxTranscriptLength ||
        lastTranscript.peerId !== transcript.peerId
      ) {
        transcript.renderedId = t.renderedId;
        renderedTranscripts.push(t);
        return;
      }

      lastTranscript.transcript += ' ' + transcript.transcript;
      transcript.renderedId = lastTranscript.renderedId;
    });

    renderedTranscripts.splice(0, renderedTranscripts.length - 2);
    return renderedTranscripts?.map((transcript) => (
      <dyte-transcript
        key={transcript.id}
        data-id={transcript.id}
        transcript={transcript}
        onDyteTranscriptDismiss={(e: CustomEvent<{ id: string; renderedId: string }>) =>
          this.handleDismiss(e)
        }
        t={this.t}
      />
    ));
  }

  render() {
    if (!this.states.activeCaptions) return;
    return <Host>{this.renderTranscripts()}</Host>;
  }
}
