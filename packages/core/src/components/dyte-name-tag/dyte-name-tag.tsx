import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { Size } from '../../types/props';
import { Meeting, Peer } from '../../types/dyte-client';
import { formatName, shorten } from '../../utils/string';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { IconPack, defaultIconPack } from '../../lib/icons';

export type DyteNameTagVariant = 'default' | 'text';

/**
 * A component which shows a participant's name.
 */
@Component({
  tag: 'dyte-name-tag',
  styleUrl: 'dyte-name-tag.css',
  shadow: true,
})
export class DyteNameTag {
  /** Participant object */
  @Prop() participant!: Peer;

  /** Meeting object */
  @Prop() meeting: Meeting;

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Whether it is used in a screen share view */
  @Prop() isScreenShare: boolean = false;

  /** Name tag variant */
  @Prop({ reflect: true }) variant: DyteNameTagVariant = 'default';

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() length: number = 13;

  @Watch('size')
  sizeChanged(size: Size) {
    this.length = size === 'sm' ? 8 : 13;
  }

  private formatNameTag(name: string, isSelf: boolean) {
    return !this.isScreenShare
      ? isSelf
        ? `${shorten(name, this.length - 3)} (${this.t('you')})`
        : shorten(name, this.length)
      : isSelf
      ? `${this.t('screen')} - ${shorten(name, this.length - 3)} (${this.t('you')})`
      : `${this.t('screen')} - ${shorten(name, this.length)}`;
  }

  render() {
    const name = formatName(this.participant?.name || '');
    const isSelf = this.participant?.id === this.meeting?.self.id;

    return (
      <Host title={name}>
        <slot name="start" />
        <span class="name">{this.formatNameTag(name, isSelf)}</span>
        <slot name="end" />
      </Host>
    );
  }
}
