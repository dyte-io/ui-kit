import { Component, Host, h, Prop, EventEmitter, Event, Watch, State } from '@stencil/core';
import { DyteI18n } from '../../lib/lang';
import { Transcript } from '../../types/props';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which shows a transcript.
 *
 * You need to remove the element after you receive the
 * `dyteTranscriptDismiss` event.
 */
@Component({
  tag: 'dyte-transcript',
  styleUrl: 'dyte-transcript.css',
  shadow: true,
})
export class DyteTranscript {
  private componentPropsCleanupFn: () => void = () => {};
  /** Message */
  @Prop() transcript!: Transcript & { renderedId?: string };

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Dismiss event */
  @Event({ eventName: 'dyteTranscriptDismiss' }) dismiss: EventEmitter<{
    id: string;
    renderedId: string;
  }>;

  @State() timeout: NodeJS.Timeout;

  connectedCallback() {
    this.transcriptChanged(this.transcript);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('transcript')
  transcriptChanged(
    transcript: Transcript & { renderedId?: string },
    oldTranscript?: Transcript & { renderedId?: string }
  ) {
    if (
      oldTranscript?.renderedId === transcript.renderedId &&
      oldTranscript?.transcript === transcript.transcript
    ) {
      return;
    }

    clearTimeout(this.timeout);

    if (!transcript?.name || !transcript?.transcript) {
      return;
    }

    const { id, renderedId } = transcript;

    this.timeout = setTimeout(() => {
      this.dismiss.emit({ id, renderedId });
    }, 10000);
  }

  render() {
    return (
      <Host>
        <div class="ctr">
          <p class="message">
            <span class="name">{this.transcript.name}</span>: {this.transcript.transcript}
          </p>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
