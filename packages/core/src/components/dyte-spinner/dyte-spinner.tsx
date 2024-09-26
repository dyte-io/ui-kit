import { Component, Host, h, Prop } from '@stencil/core';
import { DyteUIKitStore, Size } from '../../exports';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which shows an animating spinner.
 */
@Component({
  tag: 'dyte-spinner',
  styleUrl: 'dyte-spinner.css',
  shadow: true,
})
export class DyteSpinner {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Size */
  @Prop({ reflect: true }) size: Size = 'md';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  render() {
    return (
      <Host>
        <dyte-icon
          class="spinner"
          icon={this.iconPack.spinner}
          iconPack={this.iconPack}
          t={this.t}
        />
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
