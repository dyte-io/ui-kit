export type BorderWidth = 'none' | 'thin' | 'fat';
export type BorderRadius = 'sharp' | 'rounded' | 'extra-rounded' | 'circular';
export type Theme = 'darkest' | 'dark' | 'light';

/**
 * UI Colors
 *
 * Accepts hex color codes.
 */
export interface UIColors {
  brand?: {
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
  };
  background?: {
    1000?: string;
    900?: string;
    800?: string;
    700?: string;
    600?: string;
  };
  text?: string;
  'text-on-brand'?: string;
  'video-bg'?: string;
  danger?: string;
  success?: string;
  warning?: string;
}

export interface DesignTokens {
  spacingBase?: number;
  fontFamily?: string;
  googleFont?: string;
  borderWidth?: BorderWidth;
  borderRadius?: BorderRadius;
  colors?: UIColors;
  logo?: string;
  theme?: Theme;
  tokenPrefix?: string;
}
