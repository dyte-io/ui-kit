import { Component, Host, h, Prop, State, EventEmitter, Event } from '@stencil/core';
import { IconPack, defaultIconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { PollObject } from '../../types/props';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

/**
 * A component that lets you create a poll.
 */
@Component({
  tag: 'dyte-poll-form',
  styleUrl: 'dyte-poll-form.css',
  shadow: true,
})
export class DytePoll {
  connectedCallback() {
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }
  private componentPropsCleanupFn: () => void = () => {};
  private question: HTMLTextAreaElement;

  /** Event which is emitted when a poll is created */
  @Event({ eventName: 'dyteCreatePoll' }) onCreate: EventEmitter<PollObject>;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** Options */
  @State() options = ['', ''];

  @State() anonymous: boolean = false;
  @State() hideVotes: boolean = true;

  /** Error Text */
  @State() error: {
    code: number;
    message: string;
  };

  private removeOption(index: number) {
    this.options = this.options.filter((_, ind) => ind !== index);
    if (this.error?.code === 1) this.error = undefined;
  }

  private addOption() {
    this.options = [...this.options, ''];
  }

  private updateOption(ev, index: number) {
    this.options[index] = ev.target.value;
    if (this.error?.code === 1) this.error = undefined;
  }

  private handleSubmit() {
    const pollObject: PollObject = {
      question: this.question.value,
      options: this.options,
      anonymous: this.anonymous,
      hideVotes: this.anonymous ? true : this.hideVotes,
    };
    if (!pollObject.question) {
      this.error = {
        code: 0,
        message: this.t('polls.errors.question_required'),
      };
      return;
    }
    if (this.options.filter((op) => op.trim() === '').length > 0) {
      this.error = {
        code: 1,
        message: this.t('polls.errors.empty_option'),
      };
      return;
    }
    this.onCreate.emit(pollObject);
  }

  render() {
    return (
      <Host>
        <div class="create-poll">
          <p>{this.t('polls.question')}</p>
          <textarea
            onInput={() => {
              if (this.error && this.error.code === 0) this.error = undefined;
            }}
            ref={(e) => (this.question = e)}
            placeholder={this.t('polls.question.placeholder')}
          />
          {this.options.map((item, index) => (
            <div class="option">
              <input
                placeholder={this.t('polls.option.placeholder')}
                value={item}
                onInput={(event) => this.updateOption(event, index)}
              />
              {index > 1 && (
                <dyte-button
                  kind="icon"
                  class="auto remove-option"
                  variant="secondary"
                  onClick={() => this.removeOption(index)}
                  iconPack={this.iconPack}
                  t={this.t}
                >
                  <dyte-icon icon={this.iconPack.subtract} iconPack={this.iconPack} t={this.t} />
                </dyte-button>
              )}
            </div>
          ))}

          <dyte-button
            class="add-option"
            variant="secondary"
            onClick={() => this.addOption()}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('polls.option')}
          </dyte-button>

          <label>
            <input
              id="anonymous"
              type="checkbox"
              onChange={(e: any) => (this.anonymous = e.target.checked)}
            />
            {this.t('polls.results.anon')}
          </label>

          <label>
            <input
              id="hideVotes"
              type="checkbox"
              disabled={this.anonymous}
              checked={this.anonymous ? true : this.hideVotes}
              onChange={(e: any) => (this.hideVotes = e.target.checked)}
            />
            {this.t('polls.results.hide')}
          </label>

          <dyte-button
            kind="wide"
            onClick={() => this.handleSubmit()}
            iconPack={this.iconPack}
            t={this.t}
          >
            {this.t('polls.create')}
          </dyte-button>
          {this.error && <span class="error-text">{this.error.message}</span>}
        </div>
      </Host>
    );
  }

  disconnectedCallback() {
    this.componentPropsCleanupFn();
  }
}
