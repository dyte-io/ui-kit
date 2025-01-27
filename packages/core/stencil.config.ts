import { Config } from '@stencil/core';

import { postcss } from '@stencil-community/postcss';

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
      browserHeadless: "shell",
    },
  outputTargets: [
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
};
