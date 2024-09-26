import { Component, Host, h, Prop } from '@stencil/core';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Size } from '../../types/props';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { Placement } from '../../types/floating-ui';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A menu component.
 *
 * @slot - Default slot where you put the contents that you want inside menu
 * @slot trigger - Slot where you put your trigger element, clicking on which will open the menu
 */
@Component({
  tag: 'dyte-menu',
  styleUrl: 'dyte-menu.css',
  shadow: true,
})
export class DyteMenu {
  private componentPropsCleanupFn: () => void = () => {};
  private triggerEl: HTMLSpanElement;
  private menuListEl: HTMLSpanElement;

  private clickedThis: boolean = false;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Placement of menu */
  @Prop() placement: Placement = 'bottom-end';

  /** Offset in px */
  @Prop() offset: number = 10;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  componentDidLoad() {
    document.addEventListener('click', this.handleOutsideClick);
    this.update();
  }

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    this.componentPropsCleanupFn();
  }

  private handleOutsideClick = () => {
    // handles clicking on other menu triggers
    if (!this.clickedThis) {
      // if other trigger is clicked, hide this menu-list
      this.menuListEl.style.display = 'none';
    }
    // reset the value
    this.clickedThis = false;
  };

  private update() {
    computePosition(this.triggerEl, this.menuListEl, {
      placement: this.placement,
      middleware: [offset(this.offset), flip(), shift({ padding: 5 })],
    }).then(({ x, y }) => {
      Object.assign(this.menuListEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  render() {
    return (
      <Host>
        <span
          id="trigger"
          ref={(el) => (this.triggerEl = el)}
          onClick={() => {
            this.clickedThis = true;
            if (this.menuListEl.style.display !== 'block') {
              this.menuListEl.style.display = 'block';
              this.update();
            } else {
              this.menuListEl.style.display = 'none';
            }
          }}
        >
          <slot name="trigger"></slot>
        </span>
        <span part="menu-list" id="menu-list" ref={(el) => (this.menuListEl = el)}>
          <slot></slot>
        </span>
      </Host>
    );
  }
}
