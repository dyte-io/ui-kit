import { BorderRadius, BorderWidth } from '../../types/ui-config/design-tokens';

export const BORDER_WIDTHS: Record<
  BorderWidth,
  {
    none: number;
    sm: number;
    md: number;
    lg: number;
  }
> = {
  none: {
    none: 0,
    sm: 0,
    md: 0,
    lg: 0,
  },
  thin: {
    none: 0,
    sm: 1,
    md: 2,
    lg: 4,
  },
  fat: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
  },
};

export const BORDER_RADII: Record<
  BorderRadius,
  {
    none: number;
    sm: number;
    md: number;
    lg: number;
  }
> = {
  sharp: {
    none: 0,
    sm: 0,
    md: 0,
    lg: 0,
  },
  rounded: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
  },
  'extra-rounded': {
    none: 0,
    sm: 8,
    md: 16,
    lg: 24,
  },
  circular: {
    none: 9999,
    sm: 9999,
    md: 9999,
    lg: 9999,
  },
};
