import { Component, h, Host, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../exports';

@Component({
  tag: 'dyte-information-tooltip',
  styleUrl: 'dyte-information-tooltip.css',
  shadow: true,
})
export class DyteInformationTooltip {
  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  render() {
    return (
      <Host>
        <div class="tooltip-container">
          <dyte-icon icon={this.iconPack.info} size="sm"></dyte-icon>
          <div class="tooltip">
            <slot name="tootlip-text" />
          </div>
        </div>
      </Host>
    );
  }
}
