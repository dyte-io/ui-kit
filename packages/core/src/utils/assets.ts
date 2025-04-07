import { EmojiMetaData } from '../types/props';

const EMOJI_ASSET_URL = 'https://cdn.dyte.in/assets/emojis-data.json';

let cachedEmojis: any;

/**
 * fetches the latest emoji list from CDN
 * @returns list of emojis
 */
export const fetchEmojis = async (): Promise<Record<string, EmojiMetaData>> => {
  if (!cachedEmojis) {
    const emojis = await fetch(EMOJI_ASSET_URL);
    cachedEmojis = emojis.json();
  }
  return cachedEmojis;
};
