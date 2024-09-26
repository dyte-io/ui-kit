import { Component, Host, h, Prop } from '@stencil/core';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-ai-chat',
  styleUrl: 'dyte-ai-chat.css',
  shadow: true,
})
export class DyteAiChat {
  private componentPropsCleanupFn: () => void = () => {};

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

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
