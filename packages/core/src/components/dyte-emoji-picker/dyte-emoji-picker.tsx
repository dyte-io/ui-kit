import { Component, Host, h, State, EventEmitter, Event, Prop } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { EmojiMetaData } from '../../types/props';
import { fetchEmojis } from '../../utils/assets';

/**
 * A very simple emoji picker component.
 */
@Component({
  tag: 'dyte-emoji-picker',
  styleUrl: 'dyte-emoji-picker.css',
  shadow: true,
})
export class DyteEmojiPicker {
  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Close event */
  @Event() pickerClose: EventEmitter<void>;

  @State() emojiList;
  @State() filterVal: string = '';
  @State() filteredEmojis: EmojiMetaData[] = [];

  /**
   * Event which is emitted when an Emoji is clicked
   */
  @Event({ eventName: 'dyteEmojiClicked' }) emojiClicked: EventEmitter<string>;

  componentWillLoad() {
    // Don't use async here as it will block the render
    fetchEmojis().then((e) => {
      this.emojiList = e;
      this.handleInputChange({ value: '' });
    });
  }

  private handleInputChange(target) {
    this.filterVal = target.value;
    const regex = new RegExp(`([^,]*?${this.filterVal}[^,]*):(\\d+)`, 'g');
    this.filteredEmojis = Array.from(this.emojiList['search'].matchAll(regex)).map((m) => {
      return { name: m[1], emoji: this.emojiList['emojis'][m[2]] };
    });
  }

  private handleEmojiClick(emoji: string) {
    this.emojiClicked.emit(emoji);
  }

  private mapEmojiList() {
    if (this.emojiList?.length > 0) {
      return (
        <div id="loader">
          <dyte-spinner iconPack={this.iconPack} t={this.t}></dyte-spinner>
        </div>
      );
    }
    return (
      <div id="emoji-grid" class="scrollbar max-w-40">
        {this.filteredEmojis.map((e) => (
          <dyte-button
            iconPack={this.iconPack}
            t={this.t}
            key={`emoji-button-${e.name}`}
            class="emoji"
            variant="ghost"
            kind="icon"
            title={e.name}
            onClick={() => this.handleEmojiClick(e.emoji)}
          >
            {e.emoji}
          </dyte-button>
        ))}
      </div>
    );
  }
  render() {
    return (
      <Host>
        <div class={'close-parent'}>
          {/* Close button */}
          <dyte-button
            variant="ghost"
            kind="icon"
            class="close"
            onClick={() => this.pickerClose?.emit()}
            aria-label={this.t('close')}
          >
            <dyte-icon icon={this.iconPack.dismiss} />
          </dyte-button>
        </div>
        <div class={'emoji-parent'}>
          <input
            value={this.filterVal}
            onInput={(event) => this.handleInputChange(event.target)}
            placeholder={this.t('search')}
          ></input>
          {this.mapEmojiList()}
        </div>
      </Host>
    );
  }
}
