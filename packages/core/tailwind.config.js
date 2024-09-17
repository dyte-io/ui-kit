const theme = require('./src/theme');
const plugin = require('tailwindcss/plugin');

/** @type import('tailwindcss/types').Config */
module.exports = {
  content: [''],
  theme,
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('size-sm', ":host([size='sm']) &");
      addVariant('size-md', ":host([size='md']) &");
      addVariant('size-lg', ":host([size='lg']) &");
      addVariant('size-xl', ":host([size='xl']) &");
    }),
  ],
  corePlugins: {
    preflight: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropFilter: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    blur: false,
    brightness: false,
    container: false,
    contrast: false,
    dropShadow: false,
    filter: false,
    fontVariantNumeric: false,
    grayscale: false,
    hueRotate: false,
    invert: false,
    rotate: false,
    saturate: false,
    scale: false,
    sepia: false,
    space: false,
  },
};
