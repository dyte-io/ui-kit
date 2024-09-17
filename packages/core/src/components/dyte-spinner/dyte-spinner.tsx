import { Component, Host, h, Prop } from '@stencil/core';
import { Size } from '../../exports';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';

/**
 * A component which shows an animating spinner.
 */
@Component({
  tag: 'dyte-spinner',
  styleUrl: 'dyte-spinner.css',
  shadow: true,
})
export class DyteSpinner {
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
}
