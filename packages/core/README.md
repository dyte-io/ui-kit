<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://dyte.io">
    <img src="https://assets.dyte.io/logo-outlined.png" alt="Logo" width="120" />
  </a>

  <h2 align="center">UI Kit by dyte</h3>

  <p align="center">
    A set of UI components to truly customize your meeting UI
    <br />
    <a href="https://docs.dyte.io"><strong>Explore the docs »</strong></a>
    <br />
    <br />
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

> There are separate UI Kit packages for React and Angular because they don't fully support Web Components natively yet. Check out the links to the packages below

> [React UI Kit](https://npmjs.com/package/@dytesdk/react-ui-kit) · [Angular UI Kit](https://npmjs.com/package/@dytesdk/angular-ui-kit)

First, you will need to install the ui-kit along with the [web-core](https://npmjs.com/package/@dytesdk/web-core) package:

```sh
npm i @dytesdk/ui-kit @dytesdk/web-core
```

The `web-core` package is the package which handles all the low level logic required for a meeting by interating with our servers. Use it to create a meeting object, which you can pass along to the UI Kit components.

## Usage

You'll need to initialize a meeting object first.

```js
const meeting = await DyteClient.init({
  roomName: '<room-name>',
  authToken: '<auth-token>',
  defaults: {
    video: true,
    audio: true,
  },
});
```

You can now pass this object to most of the components, like so (with Vanilla JS, HTML):

```html
<!-- Load the component -->
<dyte-meeting id="my-meeting"></dyte-meeting>

<script>
  const init = async () => {
    const meeting = await DyteClient.init({
      authToken: '<auth-token>',
      roomName: '<room-name>',
      defaults: {
        video: true,
        audio: true,
      },
    });

    const meetingEl = document.getElementById('my-meeting');
    meetingEl.meeting = meeting;
  };

  init();
</script>
```

## About

`ui-kit` is created & maintained by Dyte, Inc. You can find us on Twitter - [@dyte_io](https://twitter.com/dyte_io) or write to us at `dev [at] dyte.io`.

The names and logos for Dyte are trademarks of Dyte, Inc.

We love open source software! See [our other projects](https://github.com/dyte-io) and [our products](https://dyte.io).
