import { Component, Host, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import type { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultConfig } from '../../lib/default-ui-config';
import { SyncWithStore } from '../../utils/sync-with-store';
import { DytePermissionsPreset } from '@dytesdk/web-core';

export type AIView = 'default' | 'sidebar' | 'full-screen';

@Component({
  tag: 'dyte-ai',
  styleUrl: 'dyte-ai.css',
  shadow: true,
})
export class DyteAi {
  private keydownListener: (e: KeyboardEvent) => void;

  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** States object */
  @SyncWithStore()
  @Prop()
  states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** View type */
  @Prop({ reflect: true }) view: AIView = 'sidebar';

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.viewChanged(this.view);
  }

  disconnectedCallback() {
    this.keydownListener && document.removeEventListener('keydown', this.keydownListener);
  }

  @Watch('view')
  viewChanged(view: AIView) {
    if (view === 'full-screen') {
      this.keydownListener = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.keydownListener);
    }
  }

  private close = () => {
    this.stateUpdate.emit({ activeAI: false });
  };

  render() {
    if (
      !(this.meeting?.self?.permissions as DytePermissionsPreset).transcriptionEnabled ||
      !this.states?.activeAI
    ) {
      return null;
    }

    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      size: this.size,
      t: this.t,
      iconPack: this.iconPack,
    };

    return (
      <Host>
        {/* Full screen view, shows the navigation header */}
        <h3 class="title">{this.t('ai.transcriptions')}</h3>

        {/* Close button */}
        <dyte-button
          variant="ghost"
          kind="icon"
          class="close"
          onClick={this.close}
          aria-label={this.t('close')}
        >
          <dyte-icon icon={this.iconPack.dismiss} />
        </dyte-button>

        <dyte-ai-transcriptions {...defaults}></dyte-ai-transcriptions>
      </Host>
    );
  }
}
