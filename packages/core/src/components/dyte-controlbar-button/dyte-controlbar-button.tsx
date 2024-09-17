import { Component, Host, h, Prop } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { Size } from '../../types/props';

export type ControlBarVariant = 'button' | 'horizontal';

/**
 * A skeleton component used for composing custom controlbar buttons.
 */
@Component({
  tag: 'dyte-controlbar-button',
  styleUrl: 'dyte-controlbar-button.css',
  shadow: true,
})
export class DyteControlbarButton {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Whether to show warning icon */
  @Prop() showWarning: boolean = false;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Label of button */
  @Prop() label: string;

  /** Icon */
  @Prop() icon: string;

  /**
   * Loading state
   * Ignores current icon and shows a spinner if true
   */
  @Prop() isLoading: boolean;

  /** Whether button is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Whether icon requires brand color */
  @Prop({ reflect: true }) brandIcon = false;

  render() {
    return (
      <Host>
        <button aria-label={this.label} part="button">
          {this.isLoading ? (
            <dyte-spinner id="icon" part="spinner" iconPack={this.iconPack} t={this.t} />
          ) : (
            <dyte-icon
              id="icon"
              icon={this.icon}
              tabIndex={-1}
              aria-hidden={true}
              part="icon"
              iconPack={this.iconPack}
              t={this.t}
            />
          )}
          <span class="label" part="label">
            {this.label}
          </span>
          {this.showWarning && (
            <dyte-icon
              id="warning-indicator"
              icon={this.iconPack.warning}
              part="warning-indicator"
              iconPack={this.iconPack}
              t={this.t}
            />
          )}
        </button>
      </Host>
    );
  }
}
