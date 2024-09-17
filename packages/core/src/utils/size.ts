import { Size } from '../types/props';
import breakpoints from '../theme/breakpoints.json';

/**
 * Get the screen breakpoint from a given width
 * @param width The width of the container
 * @returns The screen breakpoint value
 */
export const getSize = (width: number): Size => {
  if (width >= breakpoints.lg) return 'lg';
  else if (width >= breakpoints.md) return 'md';
  else return 'sm';
};
