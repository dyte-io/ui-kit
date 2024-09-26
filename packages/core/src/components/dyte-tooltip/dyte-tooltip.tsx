import {
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  writeTask,
} from '@stencil/core';
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Size } from '../../types/props';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { Placement } from '../../types/floating-ui';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

export type TooltipVariant = 'primary' | 'secondary';
export type TooltipKind = 'inline' | 'block';

/**
 * Tooltip component which follows Dyte's Design System.
 *
 * @slot - Default slot for trigger
 * @slot tooltip - Slot for content inside the tooltip
 */
@Component({
  tag: 'dyte-tooltip',
  styleUrl: 'dyte-tooltip.css',
  shadow: true,
})
export class DyteMenu {
  private componentPropsCleanupFn: () => void = () => {};
  private triggerEl: HTMLSpanElement;
  private tooltipEl: HTMLDivElement;
  private arrowEl: HTMLDivElement;

  /** Tooltip label */
  @Prop() label: string = '';

  /** Tooltip variant */
  @Prop({ reflect: true }) variant: TooltipVariant = 'secondary';

  /** Disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Open */
  @Prop({ reflect: true }) open: boolean = false;

  /** Tooltip kind */
  @Prop({ reflect: true }) kind: TooltipKind = 'inline';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Placement of menu */
  @Prop() placement: Placement = 'top';

  /** Delay before showing the tooltip */
  @Prop() delay: number = 0;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  @State() isInFocus: boolean = false;

  /** Event handler called when the open state of the tooltip changes. */
  @Event() dyteOpenChange: EventEmitter<boolean>;

  componentDidLoad() {
    this.triggerEl.addEventListener('focusin', this.showMenu);
    this.triggerEl.addEventListener('mouseenter', this.showMenu);

    this.triggerEl.addEventListener('focusout', this.hideMenu);
    this.triggerEl.addEventListener('mouseleave', this.hideMenu);

    writeTask(() => {
      this.openChanged(this.open);
    });
  }

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    if (!this.triggerEl) return;
    this.triggerEl.removeEventListener('focusin', this.showMenu);
    this.triggerEl.removeEventListener('mouseenter', this.showMenu);

    this.triggerEl.removeEventListener('focusout', this.hideMenu);
    this.triggerEl.removeEventListener('mouseleave', this.hideMenu);
    this.triggerEl = undefined;

    this.componentPropsCleanupFn();
  }

  @Watch('open')
  openChanged(open: boolean) {
    if (open) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }

  private update() {
    computePosition(this.triggerEl, this.tooltipEl, {
      placement: this.placement,
      middleware: [offset(8), flip(), shift({ padding: 5 }), arrow({ element: this.arrowEl })],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.tooltipEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];

      Object.assign(this.arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  }

  private showMenu = () => {
    if (this.disabled) return;

    this.isInFocus = true;
    setTimeout(() => {
      if (this.isInFocus) {
        this.tooltipEl.style.display = 'block';
        this.update();
        this.dyteOpenChange.emit(true);
        if (this.size === 'sm') {
          setTimeout(() => {
            if (this.isInFocus) {
              this.hideMenu();
            }
          }, 1000);
        }
      }
    }, this.delay);
  };

  private hideMenu = () => {
    if (this.open || this.disabled) return;

    this.isInFocus = false;
    this.tooltipEl.style.display = 'none';
    this.dyteOpenChange.emit(false);
  };

  render() {
    return (
      <Host>
        <span part="trigger" id="trigger" ref={(el) => (this.triggerEl = el)}>
          <slot></slot>
        </span>
        <div
          part="tooltip"
          class="tooltip"
          id="tooltip"
          role="tooltip"
          ref={(el) => (this.tooltipEl = el)}
        >
          <div id="arrow" ref={(el) => (this.arrowEl = el)} part="arrow"></div>
          {this.label}
          <slot name="tooltip" />
        </div>
      </Host>
    );
  }
}
