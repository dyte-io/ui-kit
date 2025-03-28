import { Component, h, Host, Prop } from '@stencil/core';
import { SyncWithStore } from '../../utils/sync-with-store';
import { IconPack, defaultIconPack } from '../../exports';

@Component({
  tag: 'dyte-information-tooltip',
  styleUrl: 'dyte-information-tooltip.css',
  shadow: true,
})
export class DyteInformationTooltip {
  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

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
