import { Component, h, Host, Prop } from '@stencil/core';
import { DyteUIKitStore, IconPack } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-information-tooltip',
  styleUrl: 'dyte-information-tooltip.css',
  shadow: true,
})
export class DyteInformationTooltip {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

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

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}