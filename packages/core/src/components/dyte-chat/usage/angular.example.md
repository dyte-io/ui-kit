Template

```html
<dyte-chat
  #chat
  style="height: '480px'; maxWidth: '320px'; backgroundColor: '#000';"
></dyte-chat>
```

Component

```js
class MyComponent {
  title = 'MyComponent';

  @ViewChild('chat') componentChat: DyteChat;

  dyteMeeting: DyteClient; // meeting instance

  async ngAfterViewInit() {
    this.componentChat.meeting = this.dyteMeeting;
  }
}
```
