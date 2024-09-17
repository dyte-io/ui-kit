import { sanitizeLink } from './string';

export const getExtension = (name: string) => {
  // split query and hash from url, then get the filename
  return name.split(/[#?]/)[0].split('.').pop().trim();
};

/**
 * Formats size in bytes to human readable formats
 * @param size Size in bytes
 * @returns Human readable file size
 */
export const getFileSize = (size: number) => {
  if (!size) return '0 B';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / 1024 ** i).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
};

/**
 * Extracts the file name from a URL.
 * @param link The URL of the file
 * @param fallback Fallback filename
 * @returns File name
 */
export const getFileName = (link: string, fallback: string = 'file') => {
  try {
    const url = new URL(link);
    const name = url.pathname.split('/').pop();
    return name !== '/' ? name : fallback;
  } catch (_) {
    return fallback;
  }
};

/**
 * Downloads file from a given URL without leaving the current page
 * @param link URL of the file to download
 * @param options Optional Options for file download - `name` and `fallbackName`
 */
export const downloadFile = async (
  link: string,
  options?: { name?: string; fallbackName?: string }
) => {
  link = sanitizeLink(link);
  let name = options?.name;

  const res = await fetch(link);

  if (!res.ok) {
    // if unable to download file (CORS or some other error)
    // open the URL in new tab
    window.open(link, '_blank');
    return;
  }

  const blobURL = URL.createObjectURL(await res.blob());

  // Creates an anchor tag and simulates download

  const a = document.createElement('a');
  a.href = blobURL;
  a.download = name ?? getFileName(link, options?.fallbackName);
  a.click();
};
