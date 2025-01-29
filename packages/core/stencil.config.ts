import { Config } from '@stencil/core';

import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

import { postcss } from '@stencil-community/postcss';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const webCorePath = require.resolve('@dytesdk/web-core/inlined');

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
    browserHeadless: 'shell',
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    angularOutputTarget({
      componentCorePackage: '@dytesdk/ui-kit',
      outputType: 'component',
      directivesProxyFile:
        '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    vueOutputTarget({
      componentCorePackage: '@dytesdk/ui-kit',
      proxiesFile: '../vue-library/lib/components.ts',
    }),
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../react-library/src/components/stencil-generated/',
    }),
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
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
