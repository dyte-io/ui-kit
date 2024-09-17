Template

```html
<dyte-chat-toggle #one></dyte-chat-toggle>
<dyte-chat-toggle #two></dyte-chat-toggle>
<dyte-chat-toggle #three></dyte-chat-toggle>
```

Component

```js
class MyComponent {
  title = 'MyComponent';

  @ViewChild('one') componentOne: DyteChatToggle;

  @ViewChild('two') componentTwo: DyteChatToggle;

  @ViewChild('three') componentTree: DyteChatToggle;

  dyteMeeting: DyteClient; // meeting instance

  async ngAfterViewInit() {
    this.componentOne.meeting = this.dyteMeeting;
    this.componentOne.size = 'sm';

    this.componentTwo.meeting = this.dyteMeeting;
    this.componentTwo.size = 'lg';

    this.componentThree.meeting = this.dyteMeeting;
    this.componentThree.variant = 'horizontal';
  }
}
```
