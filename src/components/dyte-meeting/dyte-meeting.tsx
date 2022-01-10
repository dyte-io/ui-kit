import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'dyte-meeting',
  styleUrl: 'dyte-meeting.css',
  shadow: true,
})
export class DyteMeeting {
  render() {
    return (
      <Host>
        <slot>hello world</slot>
      </Host>
    )
  }
}
