import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { DyteUIKitStore, Size } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

const parseIcon = (icon: string) => {
  try {
    return JSON.parse(icon);
  } catch (e) {
    return icon;
  }
};

export type IconVariant = 'primary' | 'secondary' | 'danger';

/**
 * An icon component which accepts an svg string and renders it.
 */
@Component({
  tag: 'dyte-icon',
  styleUrl: 'dyte-icon.css',
  shadow: true,
})
export class DyteIcon {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Icon */
  @Prop() icon: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Icon variant */
  @Prop({ reflect: true }) variant: IconVariant = 'primary';

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Size */
  @Prop({ reflect: true }) size: Size = 'lg';

  render() {
    return (
      <Host>
        <div class="icon-wrapper" innerHTML={parseIcon(this.icon)} part="wrapper"></div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
