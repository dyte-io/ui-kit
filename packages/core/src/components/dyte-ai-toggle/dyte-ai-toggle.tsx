import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';

import { Size, States } from '../../types/props';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { Meeting } from '../../types/dyte-client';
import { DytePermissionsPreset } from '@dytesdk/web-core';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

@Component({
  tag: 'dyte-ai-toggle',
  styleUrl: 'dyte-ai-toggle.css',
  shadow: true,
})
export class DyteAiToggle {
  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** States object */
  @Prop() states: States;

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() aiActive: boolean = false;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @Watch('states')
  statesChanged(s?: States) {
    const states = s || DyteUIKitStore.state;
    this.aiActive = states.activeAI;
  }

  private componentPropsCleanupFn: () => void = () => {};

  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }

  private toggleAI() {
    const states = this.states || DyteUIKitStore.state;
    this.aiActive = !states?.activeAI;
    this.stateUpdate.emit({
      activeAI: this.aiActive,
      activeMoreMenu: false,
      activeSidebar: false,
    });
    DyteUIKitStore.state.activeAI = this.aiActive;
    DyteUIKitStore.state.activeMoreMenu = false;
    DyteUIKitStore.state.activeSidebar = false;
  }

  render() {
    const text = this.t('ai.meeting_ai');

    if (!(this.meeting?.self?.permissions as DytePermissionsPreset).transcriptionEnabled) {
      return null;
    }

    return (
      <Host title={text}>
        <dyte-controlbar-button
          part="controlbar-button"
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          class={{ active: this.aiActive }}
          onClick={() => this.toggleAI()}
          icon={this.iconPack.meeting_ai}
          label={text}
          variant={this.variant}
          brandIcon
        />
      </Host>
    );
  }
}
