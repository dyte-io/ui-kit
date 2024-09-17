import { EmojiMetaData } from '../types/props';

const EMOJI_ASSET_URL = 'https://cdn.dyte.in/assets/emojis-data.json';

/**
 * fetches the latest emoji list from CDN
 * @returns list of emojis
 */
export const fetchEmojis = async (): Promise<Record<string, EmojiMetaData>> => {
  const emojis = await fetch(EMOJI_ASSET_URL);
  return emojis.json();
};
