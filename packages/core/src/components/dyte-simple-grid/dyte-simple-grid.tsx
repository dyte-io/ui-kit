import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { defaultConfig } from '../../lib/default-ui-config';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { Render } from '../../lib/render';
import { DyteClient, Peer } from '../../types/dyte-client';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { Dimensions, useGrid } from '../../lib/grid';
import { MediaConnectionState } from '@dytesdk/web-core';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * A grid component which renders only the participants in a simple grid.
 */
@Component({
  tag: 'dyte-simple-grid',
  styleUrl: 'dyte-simple-grid.css',
  shadow: true,
})
export class DyteSimpleGrid {
  private resizeObserver: ResizeObserver;

  /** Participants */
  @Prop() participants: Peer[] = [];

  /**
   * Aspect Ratio of participant tile
   *
   * Format: `width:height`
   */
  @Prop() aspectRatio: string = '16:9';

  /** Gap between participant tiles */
  @Prop() gap: number = 8;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Meeting object */
  @Prop() meeting: DyteClient;

  /** States object */
  @Prop() states: States;

  /** UI Config */
  @Prop() config: UIConfig = defaultConfig;

  /** Icon Pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() dimensions: Dimensions = { width: 0, height: 0 };

  @State() mediaConnection: MediaConnectionState;

  @Element() host: HTMLDyteSimpleGridElement;

  private setHostDimensions = () => {
    const { clientWidth: width, clientHeight: height } = this.host;
    this.dimensions = { width, height };
  };

  connectedCallback() {
    this.resizeObserver = new ResizeObserver(this.setHostDimensions);
    this.resizeObserver.observe(this.host);
    const { meta } = this.meeting;
    this.mediaConnection = { ...meta.mediaState };
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const defaults = {
      meeting: this.meeting,
      config: this.config,
      states: this.states,
      size: this.size,
      iconPack: this.iconPack,
      t: this.t,
    };

    const { width, height, getPosition } = useGrid({
      dimensions: this.dimensions,
      count: this.participants.length,
      aspectRatio: this.aspectRatio,
      gap: this.gap,
    });

    return (
      <Host>
        {this.participants.map((participant, index) => {
          const { top, left } = getPosition(index);

          return (
            <Render
              element="dyte-participant-tile"
              defaults={defaults}
              props={{
                participant,
                style: {
                  position: 'absolute',
                  top: `${top}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                },
                key: participant.id,
                'data-participant': participant.id,
                mediaConnection: this.mediaConnection,
              }}
              childProps={{ participant }}
              deepProps
            />
          );
        })}
        <slot />
      </Host>
    );
  }
}
