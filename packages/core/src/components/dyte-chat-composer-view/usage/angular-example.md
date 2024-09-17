```html
<dyte-chat-composer-view
  (newMessage)="onNewMessage($event)"
></dyte-chat-composer-view>
```

Component

```js
class MyComponent {
  onNewMessage(event) {
    console.log(event.detail);
  }
}
```
