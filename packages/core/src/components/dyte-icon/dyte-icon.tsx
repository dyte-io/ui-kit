import { Component, Host, h, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { Size } from '../../exports';

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
  /** Icon */
  @Prop() icon: string;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Icon variant */
  @Prop({ reflect: true }) variant: IconVariant = 'primary';

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size = 'lg';

  render() {
    return (
      <Host>
        <div class="icon-wrapper" innerHTML={parseIcon(this.icon)} part="wrapper"></div>
      </Host>
    );
  }
}
