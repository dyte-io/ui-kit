import { Component, Host, h, Prop, State } from '@stencil/core';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { Size } from '../../types/props';
import { Peer, WaitlistedParticipant } from '../../types/dyte-client';
import { formatName, getInitials } from '../../utils/string';
import { useLanguage, DyteI18n } from '../../lib/lang';

export type AvatarVariant = 'circular' | 'square' | 'hexagon';

/**
 * Avatar component which renders a participant's image or their initials.
 */
@Component({
  tag: 'dyte-avatar',
  styleUrl: 'dyte-avatar.css',
  shadow: true,
})
export class DyteAvatar {
  /** Participant object */
  @Prop() participant: Peer | WaitlistedParticipant | { name: string; picture: string };

  /** Avatar type */
  @Prop({ reflect: true }) variant: AvatarVariant = 'circular';

  /** Size */
  @Prop({ reflect: true }) size: Size;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  @State() imageState: 'loading' | 'loaded' | 'errored' = 'loading';

  private getAvatar = () => {
    const name = formatName(this.participant?.name || '');
    let picture: string;

    if (this.participant != null && 'picture' in this.participant) {
      picture = this.participant.picture;
    }

    if (picture && picture.length > 0 && this.imageState !== 'errored') {
      return (
        <div class="image-ctr">
          {this.imageState === 'loading' && <dyte-spinner iconPack={this.iconPack} t={this.t} />}
          <img
            src={picture}
            class={{ loaded: this.imageState === 'loaded' }}
            loading="lazy"
            title={name}
            onLoad={() => (this.imageState = 'loaded')}
            onError={() => (this.imageState = 'errored')}
            part="image"
          />
        </div>
      );
    }

    const initials = getInitials(name);

    return (
      <div class="initials" title={name} part="initials">
        {initials}
      </div>
    );
  };

  render() {
    return (
      <Host>
        {this.getAvatar()}
        <slot />
      </Host>
    );
  }
}
