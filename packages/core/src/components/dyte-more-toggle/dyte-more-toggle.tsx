import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Size, States } from '../../types/props';
import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { SyncWithStore } from '../../utils/sync-with-store';

/**
 * A button which toggles visibility of a more menu.
 *
 * When clicked it emits a `dyteStateUpdate` event with the data:
 *
 * ```ts
 * { activeMoreMenu: boolean; }
 * ```
 */
@Component({
  tag: 'dyte-more-toggle',
  styleUrl: 'dyte-more-toggle.css',
  shadow: true,
})
export class DyteMoreToggle {
  @Element() host: HTMLDyteMoreToggleElement;
  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    /** A11y */
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleOnClick);
    // };
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleOnClick);
  }

  private handleKeyDown = ({ key }: { key: string }) => {
    if (key === 'Escape') {
      this.stateUpdate.emit({ activeMoreMenu: false });
    }
  };

  private handleOnClick = (e: MouseEvent) => {
    if (!e.composedPath().includes(this.host) && this.states.activeMoreMenu) {
      this.stateUpdate.emit({ activeMoreMenu: false });
    }
  };

  private toggleMoreMenu = () => {
    this.stateUpdate.emit({ activeMoreMenu: !this.states.activeMoreMenu });
  };

  render() {
    const text = this.t('more');

    return (
      <Host title={text}>
        {this.states.activeMoreMenu && (
          <div class="more-menu">
            <slot name="more-elements" />
          </div>
        )}
        <dyte-controlbar-button
          size={this.size}
          iconPack={this.iconPack}
          onClick={(e) => {
            e.stopPropagation();
            this.toggleMoreMenu();
          }}
          icon={this.iconPack.horizontal_dots}
          label={text}
          part="controlbar-button"
        ></dyte-controlbar-button>
        <slot name="expanded" />
      </Host>
    );
  }
}
