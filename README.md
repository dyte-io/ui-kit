# Dyte UI Kit

Monorepo for all of Dyte's UI Kit packages.

Here is a short description for all the packages:

| Path                                     | Description                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`packages/core`](./packages/core)       | The main source code for all Stencil components. You will write code primarily in this directory. |
| [`packages/react`](./packages/react)     | The React UI Kit wrapper package                                                                  |
| [`packages/angular`](./packages/angular) | The Angular UI Kit wrapper package                                                                |
| [`packages/vue`](./packages/react)       | The Vue UI Kit wrapper package                                                                    |

## Contributing

To get started, you need to first make changes in the `packages/core` directory.
You can find the code for each component in [packages/core/src/components](packages/core/src/components).

You need to `cd` into `packages/core` directory and run `npm start`.

After your changes are made, you need to `cd` to the root and then run `npm run build`, so that the wrapper code also gets updated.

Wrapper code gets updated in the following cases:

- New component is added
- Component props are changed

This is anyway run in the release action, but it is a good practise to keep the source up-to-date.
