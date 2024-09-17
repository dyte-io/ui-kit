import { Theme, UIColors } from '../../types/ui-config/design-tokens';

export const THEMES: Record<Theme, UIColors> = {
  darkest: {
    background: {
      1000: '#080808',
      900: '#1A1A1A',
      800: '#1E1E1E',
      700: '#2C2C2C',
      600: '#393939',
    },
    text: '#FFFFFF',
  },
  dark: {
    background: {
      1000: '#252525',
      900: '#2F2F2F',
      800: '#323232',
      700: '#3E3E3E',
      600: '#4A4A4A',
    },
    text: '#F5F5F5',
    'video-bg': '#1C1C1C',
  },
  light: {
    background: {
      1000: '#FFFFFF',
      900: '#F5F5F5',
      800: '#EBEBEB',
      700: '#E0E0E0',
      600: '#D6D6D6',
    },
    text: '#111111',
    'text-on-brand': '#ffffff',
    'video-bg': '#DADADA',
  },
};
