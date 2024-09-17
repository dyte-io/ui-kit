import { Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import { defaultConfig } from '../../lib/default-ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import { Meeting } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import storeState from '../../lib/store';

export interface ModalDataConfig {
  title: string;
  label: {
    accept: string;
    reject: string;
  };
  description: string;
}

@Component({
  tag: 'dyte-join-stage',
  styleUrl: 'dyte-join-stage.css',
  shadow: true,
})
export class DyteJoinStage {
  /** Meeting object */
  @Prop() meeting: Meeting;

  /** UI Config */
  @Prop() config: UIConfig = defaultConfig;

  /** States object */
  @Prop() states: States;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Content Config */
  @Prop() dataConfig: ModalDataConfig = {
    title: this.t('stage.join_title'),
    label: {
      accept: this.t('stage.join_confirm'),
      reject: this.t('stage.join_cancel'),
    },
    description: this.t('stage.join_summary'),
  };

  /** Emits updated state data */
  @Event({ eventName: 'dyteStateUpdate' }) stateUpdate: EventEmitter<States>;

  /** Event which is emitted when user confirms joining stage */
  @Event({ eventName: 'dyteJoinStage' }) joinStage: EventEmitter<void>;

  /** Event which is emitted when user cancel joining stage */
  @Event({ eventName: 'dyteLeaveStage' }) leaveStage: EventEmitter<void>;

  @State() isLoading: boolean = false;

  render() {
    const defaults = {
      meeting: this.meeting,
      size: this.size,
      states: this.states || storeState,
      config: this.config,
      iconPack: this.iconPack,
      t: this.t,
    };

    return (
      <Host class={{ stage: true }}>
        <header>
          <h2>{this.dataConfig.title}</h2>
        </header>
        <Render
          element="dyte-participant-setup"
          defaults={defaults}
          props={{ participant: this.meeting?.self, size: 'md' }}
          childProps={{ participant: this.meeting?.self, size: 'md' }}
          deepProps
        />
        <div class="summary">{this.dataConfig.description}</div>
        <div class="container">
          <dyte-button
            variant="secondary"
            onClick={() => this.leaveStage.emit()}
            title={this.dataConfig.label.reject}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.dataConfig.label.reject}
          </dyte-button>
          <dyte-button
            onClick={() => {
              if (this.isLoading) return;
              this.isLoading = true;
              this.joinStage.emit();
            }}
            title={this.dataConfig.label.accept}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.isLoading ? (
              <dyte-icon icon={this.iconPack.spinner} />
            ) : (
              this.dataConfig.label.accept
            )}
          </dyte-button>
        </div>
      </Host>
    );
  }
}
