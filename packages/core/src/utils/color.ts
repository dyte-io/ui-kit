import { THEMES } from '../theme/presets/themes';

export const BRAND_SHADE_REDUCER = [-2, -1, 0, 1, 2];
export const BACKGROUND_SHADE_REDUCER = [0, 1, 2, 3, 4];

type RGB = [number, number, number];
type HSL = [number, number, number];

export function hexToRGB(h: string): RGB {
  h = h.trim();

  let r = '0',
    g = '0',
    b = '0';

  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];
  } else if (h.length > 6) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return [+r, +g, +b];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @returns {Array}           The RGB representation
 */
export const hslToRgb = (h: number, s: number, l: number): RGB => {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @returns {Array}           The HSL representation
 */
export const rgbToHsl = (r: number, g: number, b: number): HSL => {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const hex = (n: number): string => n.toString(16).padStart(2, '0');

  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

/**
 * Generate shades from a single base hex color code.
 *
 * `weight` is contained in the set [0, 1].
 *
 * @param   {string} baseHexCode The base hex code to use to generate the other shades
 * @param   {number} weight The weight applied when calculating each shade.
 * @param   {number[]} reducer The reducer array which tells how to calculate the shades
 * @returns {string[]} The generated hex shades
 */
export const generateShades = (
  baseHexCode: string,
  reducer: number[] = BRAND_SHADE_REDUCER,
  weight: number = 0.4
) => {
  const shades: string[] = [];

  const [r, g, b] = hexToRGB(baseHexCode);

  const [h, s, l] = rgbToHsl(r, g, b);

  const lightness = Math.round(l * 100);

  if (lightness > 70) {
    // increase quotient for light base shade
    weight = 0.8;
  } else if (lightness > 60) {
    weight = 0.9;
  } else if (lightness < 10) {
    // reduce quorient for dark base shade
    weight = 0.075;
  } else if (lightness < 42) {
    weight = 0.3;
  }

  const basePosition = reducer.findIndex((val) => val === 0);

  if (basePosition === -1) {
    throw new Error('Invalid reducer provided, it must contain atleast one zero');
  }

  const lightShades = 5 - basePosition;
  const darkShades = basePosition + 1;

  const lightShadeIncrement = (100 - lightness) / lightShades;
  const darkShadeIncrement = lightness / darkShades;

  for (const val of reducer) {
    let shadeLightness;
    if (val < 0) {
      shadeLightness = lightness + val * darkShadeIncrement * weight;
    } else if (val > 0) {
      shadeLightness = lightness + val * lightShadeIncrement * weight;
    } else {
      shadeLightness = lightness;
    }
    const [r, g, b] = hslToRgb(h, s, shadeLightness / 100);
    shades.push(rgbToHex(r, g, b));
  }

  return shades;
};

export const isValidHexColor = (color: string) => {
  return typeof color === 'string' && color.length === 7 && color.startsWith('#');
};

export const getBrandColors = (shade: string) => {
  const [s300, s400, s500, s600, s700] = generateShades(shade, BRAND_SHADE_REDUCER);
  return { 300: s300, 400: s400, 500: s500, 600: s600, 700: s700 };
};

/**
 * Generates new background colors which are compatible with older preset color values
 * @param shade The hex color code
 * @returns Background color tokens
 */
export const getBackgroundColorsOld = (shade: string) => {
  const [s1000, s900, s800, s700, s600] = generateShades(shade, BRAND_SHADE_REDUCER);
  return { 1000: s1000, 900: s900, 800: s800, 700: s700, 600: s600 };
};

export const getBackgroundColors = (shade: string) => {
  if (shade === '#FFFFFF') {
    return THEMES.light.background;
  } else if (shade === '#000000') {
    return THEMES.darkest.background;
  }

  const [s1000, s900, s800, s700, s600] = generateShades(shade, BACKGROUND_SHADE_REDUCER);
  return { 1000: s1000, 900: s900, 800: s800, 700: s700, 600: s600 };
};
