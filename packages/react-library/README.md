<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://dyte.io">
    <img src="https://assets.dyte.io/logo-outlined.png" alt="Logo" width="120" />
  </a>

  <h2 align="center">React UI Kit by dyte</h3>

  <p align="center">
    A set of UI components to truly customize your meeting UI, in React
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

> There are separate UI Kit packages for VanillaJS and Angular. Check out the links to the packages below

> [UI Kit](https://npmjs.com/package/@dytesdk/ui-kit) · [Angular UI Kit](https://npmjs.com/package/@dytesdk/angular-ui-kit)

First, you will need to install the ui-kit along with the [react-web-core](https://npmjs.com/package/@dytesdk/react-web-core) package:

```sh
npm i @dytesdk/react-ui-kit @dytesdk/react-web-core
```

The `react-web-core` package is the package which handles all the low level logic required for a meeting by interating with our servers. Use it to create a meeting object, which you can pass along to the UI Kit components.

> `react-web-core` consists of hooks written on top of [web-core](https://npmjs.com/package/@dytesdk/web-core) which make it easy to use web-core in react applications.

## Usage

Use the `useDyteClient()` hook to initialize a client

```jsx
function App() {
  const [client, initClient] = useDyteClient();

  useEffect(() => {
    initClient({
      authToken: '<auth-token>',
      roomName: '<room-name>',
      defaults: {
        audio: true,
        video: true,
      },
    });
  }, []);

  return <DyteMeeting meeting={client} />;
}
```

## About

`react-ui-kit` is created & maintained by Dyte, Inc. You can find us on Twitter - [@dyte_io](https://twitter.com/dyte_io) or write to us at `dev [at] dyte.io`.

The names and logos for Dyte are trademarks of Dyte, Inc.

We love open source software! See [our other projects](https://github.com/dyte-io) and [our products](https://dyte.io).
