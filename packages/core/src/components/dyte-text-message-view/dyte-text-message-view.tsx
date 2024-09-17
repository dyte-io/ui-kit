import { Component, h, Prop } from '@stencil/core';
import { hasOnlyEmojis } from '../../utils/string';

/**
 * A component which renders a text message from chat.
 */
@Component({
  tag: 'dyte-text-message-view',
  styleUrl: 'dyte-text-message-view.css',
})
export class DyteTextMessageView {
  /** Text message */
  @Prop() text!: string;

  /** Renders text as markdown (default = true) */
  @Prop() isMarkdown: boolean = false;

  render() {
    return (
      <p class={{ text: true, emoji: hasOnlyEmojis(this.text) }}>
        {this.isMarkdown ? <dyte-markdown-view text={this.text} /> : this.text}
      </p>
    );
  }
}
