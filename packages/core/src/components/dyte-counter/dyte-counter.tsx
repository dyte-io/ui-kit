import { Component, EventEmitter, h, Host, Prop, State, Watch, Event } from '@stencil/core';
import { Size, IconPack, defaultIconPack } from '../../exports';
import { SyncWithStore } from '../../utils/sync-with-store';
import { useLanguage, DyteI18n } from '../../lib/lang';

/**
 * A number picker with increment and decrement buttons.
 */
@Component({
  tag: 'dyte-counter',
  styleUrl: 'dyte-counter.css',
  shadow: true,
})
export class DyteCounter {
  /** Input */
  @State() input: string = '1';

  /** Size */
  @SyncWithStore() @Prop({ reflect: true }) size: Size;

  /** Initial value */
  @Prop() value: number;

  /** Minimum value */
  @Prop() minValue: number = 0;

  /** Icon pack */
  @SyncWithStore()
  @Prop()
  iconPack: IconPack = defaultIconPack;

  /** Language */
  @SyncWithStore()
  @Prop()
  t: DyteI18n = useLanguage();

  /** On change event emitter */
  @Event({ eventName: 'valueChange' }) onChange: EventEmitter<string>;

  connectedCallback() {
    this.watchStateHandler(this.input);
    this.input = this.value.toString();
  }

  @Watch('input')
  watchStateHandler(input: string) {
    this.onChange.emit(input);
  }

  private increment() {
    this.input = Math.max(parseInt(this.input) + 1, this.minValue).toString();
  }

  private decrement() {
    this.input = Math.max(this.minValue, parseInt(this.input) - 1).toString();
  }

  render() {
    return (
      <Host>
        <dyte-button kind="icon" variant="ghost" onClick={() => this.decrement()}>
          <dyte-icon icon={this.iconPack.subtract} />
        </dyte-button>
        <input
          type="number"
          value={this.input}
          min={this.minValue}
          onInput={(e) => {
            const val = parseInt((e.target as HTMLInputElement).value, 10);
            if (isNaN(val) || val < this.minValue) {
              this.input = this.minValue.toString();
            } else {
              this.input = val.toString();
            }
          }}
        />
        <dyte-button kind="icon" variant="ghost" onClick={() => this.increment()}>
          <dyte-icon icon={this.iconPack.add} />
        </dyte-button>
      </Host>
    );
  }
}
