import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { SyncWithStore } from '../../utils/sync-with-store';
import { DyteI18n, defaultIconPack, useLanguage } from '../../exports';

export interface DyteSidebarTab {
  id: string;
  name: string | HTMLElement;
}

export type DyteSidebarView = 'sidebar' | 'full-screen';

@Component({
  tag: 'dyte-sidebar-ui',
  styleUrl: 'dyte-sidebar-ui.css',
  shadow: true,
})
export class DyteSidebarUi {
  /** View */
  @Prop({ reflect: true }) view: DyteSidebarView = 'sidebar';

  /** Tabs */
  @Prop() tabs: DyteSidebarTab[] = [];

  /** Hide Main Header */
  @Prop() hideHeader: boolean = false;

  /** Hide Close Action */
  @Prop() hideCloseAction: boolean = false;

  /** Default tab to open */
  @Prop() currentTab: string;

  /** Icon Pack */
  @Prop() iconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Tab change event */
  @Event() tabChange: EventEmitter<string>;

  /** Tab change event */
  @Event() sidebarClose: EventEmitter<void>;

  private onClose = () => {
    this.sidebarClose.emit();
  };

  render() {
    const isFullScreen = this.view === 'full-screen';

    const activeTab = this.tabs.find((tab) => tab.id === this.currentTab);

    return (
      <Host class={this.view}>
        {/* Close button */}
        {!this.hideCloseAction && (
          <dyte-button
            variant="ghost"
            kind="icon"
            class="close"
            onClick={this.onClose}
            aria-label={this.t('close')}
          >
            <dyte-icon icon={this.iconPack.dismiss} />
          </dyte-button>
        )}

        {activeTab && !this.hideHeader && (
          <header class="main-header">
            <h3>{activeTab.name}</h3>
            <slot name="pinned-state" />
          </header>
        )}

        {isFullScreen && (
          <header class="mobile-tabs">
            {this.tabs.map((tab) => (
              <button
                onClick={() => {
                  this.tabChange.emit(tab.id);
                }}
                class={{
                  active: this.currentTab === tab.id,
                }}
              >
                {tab.name}
              </button>
            ))}
          </header>
        )}

        <slot name={this.currentTab} />
      </Host>
    );
  }
}
