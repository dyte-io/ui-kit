import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import { defaultIconPack, DyteI18n, DyteUIKitStore, IconPack, useLanguage } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component which renders a text composer
 */
@Component({
  tag: 'dyte-text-composer-view',
  styleUrl: 'dyte-text-composer-view.css',
  shadow: true,
})
export class DyteTextComposerView {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  /** Disable the text input (default = false) */
  @Prop() disabled: boolean = false;

  /** Placeholder text */
  @Prop() placeholder: string;

  /** Default value for text input */
  @Prop() value: string;

  /** Max length for text input */
  @Prop() maxLength: number;

  /** Boolean to indicate if rate limit is breached */
  @Prop() rateLimitBreached: boolean = false;

  /** Keydown event handler function */
  @Prop() keyDownHandler: (e: KeyboardEvent) => void = () => {};

  /** Icon pack */
  @Prop() iconPack: IconPack = DyteUIKitStore.state.componentProps.iconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Event emitted when text changes */
  @Event({ eventName: 'textChange' }) onTextChange: EventEmitter<string>;

  @State() maxLengthBreached: number = 0;

  private $textArea: HTMLTextAreaElement;

  componentDidLoad() {
    if (this.maxLength) {
      this.$textArea.maxLength = this.maxLength;
    }
    const text = this.$textArea.value.trim();
    if (text !== '') {
      this.maybeResize(text);
    }
  }

  /** Sets value of the text input */
  @Method()
  async setText(text: string, focus: boolean = false) {
    this.$textArea.value = text;
    this.maybeResize(text);
    if (focus) {
      this.$textArea.focus();
    }
    this.checkLength(text);
    this.onTextChange.emit(text);
  }

  private checkLength(text: string) {
    // unicode code length
    const textLen = text.length;
    if (textLen + 10 >= this.maxLength) {
      this.maxLengthBreached = text.length;
    } else if (textLen + 10 < this.maxLength && this.maxLengthBreached > 0) {
      this.maxLengthBreached = 0;
    }
  }

  private onInputHandler = () => {
    const text = this.$textArea.value.trim();
    this.maybeResize(text);
    this.checkLength(text);
    this.onTextChange.emit(text);
  };

  private maybeResize = (text: string) => {
    const newLines = [...text.matchAll(/\n/g)].length;
    this.$textArea.style.height = `${Math.min(200, 60 + 20 * newLines)}px`;
  };

  render() {
    return (
      <div class="chat-input" part="chat-input-container">
        {this.maxLengthBreached > 0 && (
          <div
            class={'text-error ' + (this.maxLengthBreached === this.maxLength ? 'breached' : '')}
          >
            <dyte-icon
              id="warning-indicator"
              icon={this.iconPack.warning}
              part="warning-indicator"
              iconPack={this.iconPack}
              t={this.t}
            />{' '}
            {this.maxLengthBreached} / {this.maxLength} {this.t('chat.max_limit_warning')}
          </div>
        )}
        {this.rateLimitBreached && (
          <div class={'text-error breached'}>
            <dyte-icon
              id="warning-indicator"
              icon={this.iconPack.warning}
              part="warning-indicator"
              iconPack={this.iconPack}
              t={this.t}
            />{' '}
            {this.t('chat.rate_limit_error')}
          </div>
        )}
        <textarea
          ref={(el) => (this.$textArea = el)}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.onInputHandler}
          onKeyDown={this.keyDownHandler}
          part="chat-input"
          value={this.value}
        ></textarea>
      </div>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
