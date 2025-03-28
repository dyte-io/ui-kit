import { Component, Host, h, Prop } from '@stencil/core';
import { UIConfig } from '../../types/ui-config';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { defaultConfig } from '../../exports';
import { SyncWithStore } from '../../utils/sync-with-store';
import { Meeting } from '../../types/dyte-client';

@Component({
  tag: 'dyte-waiting-screen',
  styleUrl: 'dyte-waiting-screen.css',
  shadow: true,
})
export class DyteWaitingScreen {
  /** Meeting object */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

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

  render() {
    return (
      <Host>
        <slot>
          <div class="centered" part="content">
            <dyte-logo meeting={this.meeting} config={this.config} part="logo" t={this.t} />
            <p>{this.t('waitlist.body_text')}</p>
          </div>
        </slot>
      </Host>
    );
  }
}
