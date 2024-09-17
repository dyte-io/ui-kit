import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { vueOutputTarget as vue } from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const webCorePath = require.resolve('@dytesdk/web-core/inlined');

const esModules = ['lodash-es'].join('|');

export const config: Config = {
  namespace: 'dyte-ui-kit',
  sourceMap: false,
  devServer: {
    openBrowser: false,
  },
  extras: {
    experimentalImportInjection: true,
  },
  testing: {
    transform: {
      '^.+\\.(ts|tsx|js|jsx|css)$': '@stencil/core/testing/jest-preprocessor',
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  },
  outputTargets: [
    react({
      componentCorePackage: '@dytesdk/ui-kit',
      proxiesFile: '../react-library/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    angularOutputTarget({
      componentCorePackage: '@dytesdk/ui-kit',
      directivesProxyFile:
        '../angular-library/projects/components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-library/projects/components/src/lib/stencil-generated/index.ts',
    }),
    vue({
      componentCorePackage: '@dytesdk/ui-kit',
      proxiesFile: '../vue-library/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-json',
      file: 'dist/docs/docs-components.json',
    },
    {
      type: 'docs-vscode',
      file: 'dist/docs/docs-vscode.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      // copy latest esm build to public/ for importing
      copy: [
        {
          src: webCorePath,
          dest: 'web-core.js',
        },
        {
          src: '../public',
          dest: '.',
        },
      ],
    },
  ],
  plugins: [
    postcss({
      plugins: [require('tailwindcss/nesting'), require('tailwindcss'), require('autoprefixer')],
    }),
  ],
  rollupPlugins: {
    after: [nodePolyfills()],
  },
};
