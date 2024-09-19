```html
<dyte-image-viewer #imageViewer></dyte-image-viewer>
```

Component

```js
class MyComponent {
  title = 'MyComponent';

  @ViewChild('imageViewer') componentImageViewer: DyteImageViewer;

  dyteMeeting: DyteClient; // meeting instance

  async ngAfterViewInit() {
    this.componentImageViewer.image = {
      type: 'image',
      link: 'https://images.unsplash.com/photo-1657788913374-11f55e6afefe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1636&q=80',
    };
  }
}
```