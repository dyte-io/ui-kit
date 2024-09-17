import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { ChatHead } from '../dyte-chat/components/ChatHead';
import { Meeting } from '../../types/dyte-client';
import { AIMessage } from '../../types/dyte-ai';
// import { Middlewares } from '../../types/props';
import { smoothScrollToBottom } from '../../utils/scroll';
import { DytePermissionsPreset } from '@dytesdk/web-core';

@Component({
  tag: 'dyte-ai-home',
  styleUrl: 'dyte-ai-home.css',
  shadow: true,
})
export class DyteAiHome {
  private contentContainer!: HTMLDivElement;

  @State() prompt = '';

  @State() messages: AIMessage[] = [];

  /** Meeting object */
  @Prop() meeting!: Meeting;

  /** Initial messages */
  @Prop() initialMessages: AIMessage[];

  // private handleChatGPTReply(data: AIMessage) {
  //   const existingMessage = this.messages.find((message) =>
  //     data.action === 'default'
  //       ? message.id === data.id
  //       : message.id === data.id || message.action === this.mapMessageAction(data.action)
  //   );
  //
  //   if (
  //     existingMessage &&
  //     (existingMessage.loading || existingMessage.action !== this.mapMessageAction('default'))
  //   ) {
  //     this.messages = [
  //       ...this.messages.map((message) =>
  //         message.id === data.id || message.action === this.mapMessageAction(data.action)
  //           ? { ...data, action: this.mapMessageAction(data.action) }
  //           : message
  //       ),
  //     ];
  //   } else {
  //     this.messages = [...this.messages, { ...data, action: this.mapMessageAction(data.action) }];
  //   }
  // }

  connectedCallback() {
    if (this.initialMessages) {
      this.messages = this.initialMessages.map((message) => ({
        ...message,
        action: this.mapMessageAction(message.action),
      }));
    } else {
      /**
       * NOTE: There is a latency in aiClient.aiMessages that's why sometimes
       * initialMessages comes as undefined. This is a really hacky solution
       * to wait for the aiMessages to set. But probably we can refactor this
       * in future.
       */
      if ((this.meeting?.self?.permissions as DytePermissionsPreset).transcriptionEnabled) {
        // setTimeout(() => {
        //   this.messages = this.middlewares.speech.aiMesssages?.map((message) => ({
        //     ...message,
        //     action: this.mapMessageAction(message.action),
        //   }));
        // }, 1000);
      }
    }

    // this.middlewares?.speech?.on('chatGPTReply', (data) => this.handleChatGPTReply(data));
  }

  disconnectedCallback() {
    // this.middlewares?.speech?.off('chatGPTReply', (data) => this.handleChatGPTReply(data));
  }

  @Watch('messages')
  messagesUpdated() {
    // NOTE: I don't know why initially contentContainer ref is not set, That's
    // why this setTimeout. We can figure a better approach for this
    setTimeout(() => {
      smoothScrollToBottom(this.contentContainer, false);
    }, 100);
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    this.messages = [
      ...this.messages,
      {
        action: 'Prompt',
        participantName: this.meeting.self.name,
        createdAt: new Date(),
        prompt: this.prompt,
        loading: true,
      },
    ];

    // this.middlewares?.speech?.sendMessageToChatGPT({ action: 'default', message: this.prompt });
    this.prompt = '';
  };

  private mapMessageAction(action: string) {
    switch (action) {
      case 'default':
        return 'Prompt';
      case 'summarization':
        return 'Summary';
      case 'agenda generation':
        return 'Agenda';
      case 'action items generation':
        return 'Action items';
    }
  }

  private handleSummarise = () => {
    // this.middlewares?.speech?.sendMessageToChatGPT({ action: 'summarization' });
  };

  private handleAgenda = () => {
    // this.middlewares?.speech?.sendMessageToChatGPT({ action: 'agenda generation' });
  };

  private handleMoM = () => {
    // this.middlewares?.speech?.sendMessageToChatGPT({ action: 'action items generation' });
  };

  render() {
    return (
      <Host>
        <div class="content scrollbar" ref={(el) => (this.contentContainer = el as HTMLDivElement)}>
          <p class="public-message">This conversation will be visible to everyone on the call.</p>

          {!this.messages.length && (
            <div class="hint-message">
              <p>
                Ask <i>"Hey AI, summarise this call"</i>
                <br /> or <br />
                Type <i>"Hey AI, what is today's agenda?"</i>
              </p>
            </div>
          )}

          {this.messages.length > 0 && (
            <div class="">
              {this.messages.map((message) => (
                <div class="message">
                  <ChatHead
                    name={message.action}
                    time={new Date(message.createdAt)}
                    now={new Date()}
                  />
                  <p class="subtitle">Triggered by {message.participantName}</p>

                  {message.prompt && <div class="prompt-text">{message.prompt}</div>}
                  {message.loading ? (
                    <div class="loader">
                      <dyte-spinner size="sm" />
                      &nbsp;&nbsp;Generating...
                    </div>
                  ) : (
                    <div class="body">{message.response}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div class="actions">
          <span>Quick actions:</span>
          <div>
            <button onClick={this.handleSummarise}>Summarise</button>
            <button onClick={this.handleAgenda}>Agenda</button>
            <button onClick={this.handleMoM}>MoM</button>
          </div>
        </div>

        <form class="prompt" onSubmit={this.handleSubmit}>
          <input
            value={this.prompt}
            onInput={(e) => {
              this.prompt = (e.target as HTMLInputElement).value;
            }}
            placeholder="Type your prompt..."
          />
        </form>
      </Host>
    );
  }
}
