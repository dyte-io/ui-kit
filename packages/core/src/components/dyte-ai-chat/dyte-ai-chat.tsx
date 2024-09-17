import { Component, Host, h, Prop } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';

@Component({
  tag: 'dyte-ai-chat',
  styleUrl: 'dyte-ai-chat.css',
  shadow: true,
})
export class DyteAiChat {
  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <p class="private-message">{this.t('ai.chat.tooltip')}</p>

        <div class="hint-message">
          <p>
            {this.t('ask')} <i>"{this.t('ai.chat.summerise')}"</i>
            <br /> or <br />
            {this.t('type')} <i>"{this.t('ai.chat.agenda')}"</i>
          </p>
        </div>
      </Host>
    );
  }
}
