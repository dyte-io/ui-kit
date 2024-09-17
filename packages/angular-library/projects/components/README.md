<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://dyte.io">
    <img src="https://assets.dyte.io/logo-outlined.png" alt="Logo" width="120" />
  </a>

  <h2 align="center">Angular UI Kit by dyte</h3>

  <p align="center">
    A set of UI components to truly customize your meeting UI, in Angular
    <br />
    <a href="https://docs.dyte.io"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://app.dyte.io">View Demo</a>
    ·
    <a href="https://community.dyte.io">Report Bug</a>
    ·
    <a href="https://community.dyte.io">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [About](#about)

<!-- GETTING STARTED -->

## Getting Started

> There are separate UI Kit packages for VanillaJS and React. Check out the links to the packages below

> [UI Kit](https://npmjs.com/package/@dytesdk/ui-kit) · [React UI Kit](https://npmjs.com/package/@dytesdk/react-ui-kit)

First, you will need to install the ui-kit along with the [web-core](https://npmjs.com/package/@dytesdk/web-core) package:

```sh
npm i @dytesdk/angular-ui-kit @dytesdk/web-core
```

The `web-core` package is the package which handles all the low level logic required for a meeting by interating with our servers. Use it to create a meeting object, which you can pass along to the UI Kit components.

## Usage

Load the component in your template file (component.html):

```html
<dyte-meeting #myid></dyte-meeting>
```

Then initialize and pass the meeting object to the component:

```tsx
class AppComponent {
  title = 'MyProject';
  @ViewChild('myid') meetingComponent: DyteMeeting;
  dyteMeeting: DyteClient;

  async ngAfterViewInit() {
    const meeting = await DyteClient.init({
      roomName: '<room-name>',
      authToken: '<auth-token>',
      defaults: {
        video: true,
        audio: true,
      },
    });
    meeting.joinRoom();
    this.dyteMeeting = meeting;
    if (this.meetingComponent) this.meetingComponent.meeting = meeting;
  }
}
```

## About

`angular-ui-kit` is created & maintained by Dyte, Inc. You can find us on Twitter - [@dyte_io](https://twitter.com/dyte_io) or write to us at `dev [at] dyte.io`.

The names and logos for Dyte are trademarks of Dyte, Inc.

We love open source software! See [our other projects](https://github.com/dyte-in) and [our products](https://dyte.io).
