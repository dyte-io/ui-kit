import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Size, States } from '../../types/props';
import {
  exitFullSreen,
  isFullScreenEnabled,
  isFullScreenSupported,
  requestFullScreen,
} from '../../utils/full-screen';
import { ControlBarVariant } from '../dyte-controlbar-button/dyte-controlbar-button';
import { DyteUIKitStore } from '../../lib/store';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A button which toggles full screen mode for any
 * existing `dyte-meeting` component in the DOM.
 */
@Component({
  tag: 'dyte-fullscreen-toggle',
  styleUrl: 'dyte-fullscreen-toggle.css',
  shadow: true,
})
export class DyteFullscreenToggle {
  private componentPropsCleanupFn: () => void = () => {};
  /** States object */
  @Prop() states: States;

  /** Target Element to fullscreen */
  @Prop() targetElement: HTMLElement;

  /** Variant */
  @Prop({ reflect: true }) variant: ControlBarVariant = 'button';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  @State() fullScreenActive: boolean = false;
  @State() isFullScreenSupported: boolean = true;

  connectedCallback() {
    this.isFullScreenSupported = isFullScreenSupported();
    this.onFullScreenchange();
    window.addEventListener('webkitfullscreenchange', this.onFullScreenchange);
    window.addEventListener('fullscreenchange', this.onFullScreenchange);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    window.removeEventListener('webkitfullscreenchange', this.onFullScreenchange);
    window.removeEventListener('fullscreenchange', this.onFullScreenchange);

    this.componentPropsCleanupFn();
  }

  private onFullScreenchange = () => {
    this.fullScreenActive = isFullScreenEnabled();
  };

  private toggleFullScreen = () => {
    let fullScreenElement = this.targetElement || document.querySelector('dyte-meeting');
    if (!fullScreenElement) return;

    if (!this.fullScreenActive) {
      requestFullScreen(fullScreenElement);
      this.fullScreenActive = true;
    } else {
      exitFullSreen();
      this.fullScreenActive = false;
    }
    this.stateUpdate.emit({ activeMoreMenu: false });
    DyteUIKitStore.state.activeMoreMenu = false;
  };

  render() {
    if (!this.isFullScreenSupported) {
      return null;
    }

    return (
      <Host title={this.t('full_screen')}>
        <dyte-controlbar-button
          size={this.size}
          iconPack={this.iconPack}
          t={this.t}
          onClick={this.toggleFullScreen}
          icon={
            this.fullScreenActive
              ? this.iconPack.full_screen_minimize
              : this.iconPack.full_screen_maximize
          }
          label={this.fullScreenActive ? this.t('full_screen.exit') : this.t('full_screen')}
          variant={this.variant}
        />
      </Host>
    );
  }
}
