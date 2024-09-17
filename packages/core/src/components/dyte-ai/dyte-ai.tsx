import { Component, Host, h, State, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import type { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import { defaultConfig } from '../../lib/default-ui-config';
import storeState from '../../lib/store';
import { DytePermissionsPreset } from '@dytesdk/web-core';

export type AIView = 'default' | 'sidebar' | 'full-screen';

export type AISection = 'home' | 'transcriptions' | 'personal';

@Component({
  tag: 'dyte-ai',
  styleUrl: 'dyte-ai.css',
  shadow: true,
})
export class DyteAi {
  private keydownListener: (e: KeyboardEvent) => void;

  /** Default section */
  @Prop() defaultSection: AISection = 'home';

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** States object */
  @Prop() states: States;

  /** Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** View type */
  @Prop({ reflect: true }) view: AIView = 'sidebar';

  @State() tab: AISection = this.defaultSection;

  @State() newTranscriptionAvailable = false;

  @State() newAiMessageAvailable = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.viewChanged(this.view);

    this.meeting?.meta?.on('transcript', this.transcriptionHandler);
  }

  disconnectedCallback() {
    this.keydownListener && document.removeEventListener('keydown', this.keydownListener);

    this.meeting?.meta?.off('transcript', this.transcriptionHandler);
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

  @Watch('tab')
  tabChanged(tab: AISection) {
    if (tab === 'transcriptions' && this.newTranscriptionAvailable) {
      this.newTranscriptionAvailable = false;
    }

    if (tab === 'home' && this.newAiMessageAvailable) {
      this.newAiMessageAvailable = false;
    }
  }

  private viewSection(section: AISection) {
    this.tab = section;
    storeState.activeSidebar = true;
  }

  private close = () => {
    this.stateUpdate.emit({ activeAI: false });
    storeState.activeAI = false;
  };

  private transcriptionHandler = () => {
    if (this.tab !== 'transcriptions') {
      this.newTranscriptionAvailable = true;
    }
  };

  // private aiMessageHandler = () => {
  //   if (this.tab !== 'home') {
  //     this.newAiMessageAvailable = true;
  //   }
  // };

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
      states: this.states || storeState,
      size: this.size,
      t: this.t,
      iconPack: this.iconPack,
    };

    // const aiClient = this.middlewares.speech;

    return (
      <Host>
        {/* Full screen view, shows the navigation header */}
        <h3 class="title">{this.t('ai')}</h3>

        <div id="mobile-header">
          <dyte-button
            variant="ghost"
            class={{ active: this.tab === 'home' }}
            onClick={() => this.viewSection('home')}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('ai.home')}
            {this.newAiMessageAvailable && <span class="dot">.</span>}
          </dyte-button>
          <dyte-button
            variant="ghost"
            class={{ active: this.tab === 'transcriptions' }}
            onClick={() => this.viewSection('transcriptions')}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('ai.transcriptions')}
            {this.newTranscriptionAvailable && <span class="dot">.</span>}
          </dyte-button>
          {/* <dyte-button
            variant="ghost"
            class={{ active: this.tab === 'personal' }}
            onClick={() => this.viewSection('personal')}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('ai.personal')}
          </dyte-button> */}
        </div>

        {/* Close button */}
        <dyte-button
          variant="ghost"
          kind="icon"
          class="close"
          onClick={this.close}
          aria-label={this.t('close')}
          iconPack={this.iconPack}
          t={this.t}
        >
          <dyte-icon icon={this.iconPack.dismiss} iconPack={this.iconPack} t={this.t} />
        </dyte-button>

        {/* Enabled section */}
        {this.tab === 'home' && (
          <Render
            element="dyte-ai-home"
            defaults={defaults}
            props={{
              // aiClient: aiClient,
              // initialMessages: aiClient.aiMesssages,
              meeting: this.meeting,
            }}
          />
        )}
        {this.tab === 'transcriptions' && (
          <Render
            element="dyte-ai-transcriptions"
            defaults={defaults}
            // props={{ aiClient: aiClient, initialTranscriptions: aiClient.transcriptions }}
          />
        )}
        {this.tab === 'personal' && <Render element="dyte-ai-chat" defaults={defaults} />}
      </Host>
    );
  }
}
