import defaultIconPack from './default-icon-pack';

/**
 * Icon Pack object type.
 * - Oject key denotes name of icon
 * - Object value stores the SVG string
 */
export type IconPack = typeof defaultIconPack;

export const getIconPack = async (url: string): Promise<IconPack> => {
  // check for both null/undefined
  if (url == null) {
    return defaultIconPack as IconPack;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return defaultIconPack as IconPack;
    }
    // merge defaultIconPack with the received iconPack so as to
    // fill the missing icons with default ones
    return Object.assign({}, defaultIconPack, await res.json()) as IconPack;
  } catch (_) {
    return defaultIconPack as IconPack;
  }
};

export { defaultIconPack };
