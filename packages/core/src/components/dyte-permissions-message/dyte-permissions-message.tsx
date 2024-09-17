import { Component, Host, h, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';
import type { DeviceConfig } from '@dytesdk/web-core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import storeState from '../../lib/store';

const steps = {
  ChromeDesktop: ['Chrome1.svg', 'Chrome2.svg', 'Chrome3.svg'],
};

/**
 * A component which shows permission related troubleshooting
 * information.
 */
@Component({
  tag: 'dyte-permissions-message',
  styleUrl: 'dyte-permissions-message.css',
  shadow: true,
})
export class DytePermissionsMessage {
  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Icon Pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** States object */
  @Prop() states: States;

  @State() device: DeviceConfig;

  @State() currentStep: number = 0;

  @State() svgSteps: string[] = [];

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  connectedCallback() {
    this.meetingChanged(this.meeting);
  }

  disconnectedCallback() {
    if (this.stepsTimer) clearTimeout(this.stepsTimer);
  }

  @Watch('meeting')
  meetingChanged(meeting: Meeting) {
    if (meeting != null) {
      this.device = meeting.self.device;
      const deviceType = this.device?.isMobile ? 'Mobile' : 'Desktop';
      const currentSteps = steps[this.device?.browserName + deviceType] ?? [];
      Promise.all(currentSteps.map(this.getImage)).then((currentImages) => {
        this.svgSteps = currentImages;
      });
    }
  }

  private getLink(media: 'audio' | 'video' | 'screenshare') {
    let kind;
    switch (media) {
      case 'audio':
        kind = 'microphone';
        break;
      case 'video':
        kind = 'camera';
        break;
      default:
        kind = 'screenshare';
        break;
    }
    const GOOGLE_SEARCH_BASE = 'https://www.google.com/search?q=';
    let query = `Allow+${kind}+access`;

    if (this.device != null) {
      const { browserName, isMobile } = this.device;

      query += '+' + browserName;

      if (isMobile) {
        query += '+mobile';
      }
    }

    return GOOGLE_SEARCH_BASE + query;
  }

  private continue = () => {
    this.stateUpdate.emit({
      activePermissionsMessage: { enabled: false },
    });
    storeState.activePermissionsMessage = { enabled: false };
  };

  private reload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private isDeniedBySystem() {
    const permissionsMessage = this.meeting?.self.mediaPermissions;
    if (permissionsMessage == null) return false;

    if (Object.values(permissionsMessage).includes('SYSTEM_DENIED')) {
      return true;
    }

    return false;
  }

  private getTitle() {
    const isDeniedBySystem = this.isDeniedBySystem();
    const media = this.states?.activePermissionsMessage?.kind ?? 'audio';
    if (isDeniedBySystem) {
      return this.t(`perm_sys_denied.${media}`);
    }
    return this.t(`perm_denied.${media}`);
  }

  private getMessage() {
    const { browserName, osName } = this.meeting.self.device;
    const isDeniedBySystem = this.isDeniedBySystem();
    const browser = browserName.toLowerCase() ?? 'others';
    const os = osName ?? 'others';
    const media = this.states?.activePermissionsMessage?.kind ?? 'audio';

    /* NOTE(ravindra-dyte):
      If in case a unknown browser or os doesn't have a translation,
      use the translation for `others`, instead of showing ugly error string,
      such as `perm_denied.video.yandex browser.message`.
    */
    if (isDeniedBySystem) {
      const systemErrorKey = `perm_sys_denied.${media}.${os.toLowerCase()}.message`;
      return this.t(systemErrorKey) === systemErrorKey
        ? this.t(`perm_sys_denied.${media}.others.message`)
        : this.t(systemErrorKey);
    }

    const browserErrorKey = `perm_denied.${media}.${browser}.message`;
    return this.t(browserErrorKey) === browserErrorKey
      ? this.t(`perm_denied.${media}.others.message`)
      : this.t(browserErrorKey);
  }

  private getImage = async (stepURL: string) => {
    function replaceAll(target, search, replacement) {
      return target.split(search).join(replacement);
    }
    const svgReq = await fetch(`https://assets.dyte.io/ui-kit/permissions/${stepURL}`);
    let svg = await svgReq.text();
    svg = replaceAll(svg, 'yoursite.com', location.host);
    svg = replaceAll(
      svg,
      'Yoursite',
      document.title.length > 14 ? `${document.title.slice(0, 14)}...` : document.title
    );
    return svg;
  };

  private nextStep = () => {
    this.currentStep = (this.currentStep + 1) % this.svgSteps.length;
  };

  private stepsTimer: NodeJS.Timeout;

  render() {
    const isDeniedBySystem = this.isDeniedBySystem();
    if (this.svgSteps.length > 0) {
      if (this.stepsTimer) clearTimeout(this.stepsTimer);
      this.stepsTimer = setTimeout(this.nextStep, 2500);
    }

    return (
      <Host>
        <h2>
          <dyte-icon
            class="text-icon"
            icon={this.iconPack.warning}
            iconPack={this.iconPack}
            t={this.t}
          />
          {this.getTitle()}
        </h2>
        {this.svgSteps.length > 0 && (
          <div class={'svg-container'}>
            {this.svgSteps.map((e, index) => (
              <p
                innerHTML={e}
                class="svg-ins"
                key={this.currentStep}
                hidden={index !== this.currentStep}
              ></p>
            ))}
          </div>
        )}
        <div>{this.getMessage()}</div>
        {!isDeniedBySystem && (
          <a
            class="need-help-link"
            href={this.getLink(this.states?.activePermissionsMessage?.kind ?? 'audio')}
            target="_blank"
            rel="noreferrer external noreferrer noopener"
          >
            <dyte-icon
              class="text-icon"
              icon={this.iconPack.attach}
              iconPack={this.iconPack}
              t={this.t}
            />
            {this.t('cta.help')}
          </a>
        )}

        <div class="actions">
          <dyte-button
            size="lg"
            kind="wide"
            variant="secondary"
            onClick={this.continue}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('cta.continue')}
          </dyte-button>
          <dyte-button
            size="lg"
            kind="wide"
            onClick={this.reload}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('cta.reload')}
          </dyte-button>
        </div>

        <slot></slot>
      </Host>
    );
  }
}
