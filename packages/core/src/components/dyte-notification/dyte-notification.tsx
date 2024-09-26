import { Component, Host, h, Prop, EventEmitter, Event, Watch, State } from '@stencil/core';
import { IconPack } from '../../lib/icons';
import { DyteI18n } from '../../lib/lang';
import { Notification, Size } from '../../types/props';
import { TextMessageView } from '../dyte-text-message/components/TextMessage';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which shows a notification.
 *
 * You need to remove the element after you receive the
 * `dyteNotificationDismiss` event.
 */
@Component({
  tag: 'dyte-notification',
  styleUrl: 'dyte-notification.css',
  shadow: true,
})
export class DyteNotification {
  private componentPropsCleanupFn: () => void = () => {};
  /** Message */
  @Prop() notification!: Notification;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = DyteUIKitStore.state.componentProps.t;

  /** Dismiss event */
  @Event({ eventName: 'dyteNotificationDismiss' }) dismiss: EventEmitter<string>;

  @State() imageState: 'loading' | 'loaded' | 'errored' = 'loading';

  connectedCallback() {
    this.notificationChanged(this.notification);
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  @Watch('notification')
  notificationChanged(notification: Notification) {
    if (notification != null && typeof notification.duration === 'number') {
      setTimeout(() => {
        this.dismiss.emit(notification.id);
      }, notification.duration);
    }
  }

  render() {
    return (
      <Host>
        <div class="ctr">
          {this.notification.icon != null && (
            <dyte-icon
              class="icon"
              icon={this.notification.icon}
              variant={this.notification.iconVariant ?? 'primary'}
              iconPack={this.iconPack}
              t={this.t}
            />
          )}
          {this.notification.image != null &&
            this.notification.icon == null &&
            this.imageState !== 'errored' && (
              <img
                src={this.notification.image}
                class={{ loaded: this.imageState === 'loaded' }}
                onLoad={() => (this.imageState = 'loaded')}
                onError={() => (this.imageState = 'errored')}
              />
            )}
          <p class="message">
            <TextMessageView message={this.notification.message} />
          </p>
          <div class="right">
            {this.notification.button != null && (
              <dyte-button
                size="sm"
                variant={this.notification.button.variant}
                onClick={() => this.notification.button.onClick()}
                iconPack={this.iconPack}
                t={this.t}
              >
                {this.notification.button.text}
              </dyte-button>
            )}
            <dyte-icon
              aria-label={this.t('dismiss')}
              class="dismiss"
              icon={this.iconPack.dismiss}
              onClick={() => this.dismiss.emit(this.notification.id)}
              iconPack={this.iconPack}
              t={this.t}
            />
          </div>
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
