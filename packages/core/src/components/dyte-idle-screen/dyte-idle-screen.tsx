import { Component, Host, h, Prop } from '@stencil/core';
import { defaultConfig } from '../../exports';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { useLanguage, DyteI18n } from '../../lib/lang';
import { UIConfig } from '../../types/ui-config';
import { SyncWithStore } from '../../utils/sync-with-store';
import { Meeting } from '../../types/dyte-client';

/**
 * A screen that handles the idle state,
 * i.e; when you are waiting for data about the meeting, specifically the `meeting` object.
 */
@Component({
  tag: 'dyte-idle-screen',
  styleUrl: 'dyte-idle-screen.css',
  shadow: true,
})
export class DyteIdleScreen {
  /** Meeting */
  @SyncWithStore()
  @Prop()
  meeting: Meeting;

  /** Config object */
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
          <div class="ctr" part="container">
            <dyte-logo meeting={this.meeting} config={this.config} t={this.t} part="logo" />
            <dyte-spinner
              aria-label="Idle, waiting for meeting data"
              part="spinner"
              iconPack={this.iconPack}
            />
          </div>
        </slot>
      </Host>
    );
  }
}
