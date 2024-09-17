import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import {
  DyteI18n,
  IconPack,
  Size,
  UIConfig,
  defaultConfig,
  defaultIconPack,
  generateConfig,
  provideDyteDesignSystem,
  useLanguage,
} from '../../exports';
import { getSize } from '../../utils/size';
import { getIconPack } from '../../lib/icons';

@Component({
  tag: 'dyte-ui-provider',
})
export class DyteUiProvider {
  @Element() hostEl: HTMLDyteUiProviderElement;

  /** dyte meeting object */
  @Prop() meeting: Meeting;

  /** Size */
  @Prop({ reflect: true, mutable: true }) size: Size;

  /** UI Config */
  @Prop({ mutable: true }) config: UIConfig = defaultConfig;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon Pack URL */
  @Prop({ reflect: true }) iconPackUrl: string;

  /** Whether to load config from preset */
  @Prop() loadConfigFromPreset: boolean = true;

  /** Whether to apply the design system on the document root from config */
  @Prop() applyDesignSystem: boolean = true;

  /** Whether to join the meeting room */
  @Prop() joinRoom: boolean = true;

  @State() isReady = false;

  @State() iconPack: IconPack = defaultIconPack;

  @Watch('iconPackUrl')
  async iconPackUrlChanged(url: string) {
    this.iconPack = await getIconPack(url);
  }

  @Watch('meeting')
  async meetingChanged(meeting: Meeting) {
    if (!meeting) return;
    if (!meeting.self.roomJoined && this.joinRoom) {
      this.isReady = false;
      await meeting.joinRoom();
      this.isReady = true;
    }

    if (this.loadConfigFromPreset && meeting.self.config != null) {
      const theme = meeting.self.config;
      const { config } = generateConfig(theme, meeting);

      if (this.config === defaultConfig) {
        // only override the config if the object is same as defaultConfig
        // which means it's a different object passed via prop
        this.config = {
          ...defaultConfig,
          ...config,
          designTokens: { ...defaultConfig.designTokens, ...config.designTokens },
        };
      }
    }

    if (
      this.applyDesignSystem &&
      this.config?.designTokens != null &&
      typeof document !== 'undefined'
    ) {
      provideDyteDesignSystem(document.documentElement, this.config.designTokens);
    }
    Array.from(this.hostEl.children)
      .filter((element) => element.tagName.startsWith('DYTE-'))
      .forEach((element) => {
        element['meeting'] = meeting;
        element['config'] = this.config;
        element['size'] = this.size;
        element['iconPack'] = this.iconPack;
        element['t'] = this.t;
      });
  }

  private resizeObserver: ResizeObserver;

  connectedCallback() {
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.hostEl);
    this.meetingChanged(this.meeting);
    this.iconPackUrlChanged(this.iconPackUrl);
  }

  private handleResize() {
    this.size = getSize(this.hostEl.clientWidth);
  }

  render() {
    if (!this.isReady) return null;
    return <slot />;
  }
}
