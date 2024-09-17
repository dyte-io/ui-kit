import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { Meeting } from '../../types/dyte-client';
import { States } from '../../types/props';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { defaultIconPack, IconPack } from '../../lib/icons';
import storeState from '../../lib/store';

@Component({
  tag: 'dyte-mute-all-confirmation',
  styleUrl: 'dyte-mute-all-confirmation.css',
  shadow: true,
})
export class DyteMuteAllConfirmation {
  /** Meeting object */
  @Prop() meeting: Meeting;

  /** States object */
  @Prop() states: States;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() allowUnmute = true;

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  private onClose = () => {
    this.stateUpdate.emit({ activeMuteAllConfirmation: false });
    storeState.activeMuteAllConfirmation = false;
  };

  private onMuteAll = () => {
    this.meeting?.participants.disableAllAudio(this.allowUnmute);
    this.onClose();
  };

  render() {
    return (
      <Host>
        <div class="leave-modal">
          <div class="header">
            <h2 class="title">{this.t('mute_all.header')}</h2>
          </div>
          <p class="message">{this.t('mute_all.description')}</p>
          <div class="content">
            <div class="leave-meeting">
              <dyte-button
                variant="secondary"
                title={this.t('close')}
                onClick={this.onClose}
                iconPack={this.iconPack}
                t={this.t}
              >
                {this.t('cancel')}
              </dyte-button>
              <dyte-button
                variant="danger"
                title={this.t('mute_all')}
                onClick={this.onMuteAll}
                iconPack={this.iconPack}
                t={this.t}
              >
                {this.t('mute_all')}
              </dyte-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
