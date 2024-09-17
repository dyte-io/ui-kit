import { getFileSize, getFileName, getExtension } from './file';

describe('util:file:getFileSize()', () => {
  test('should work with abnormal values', () => {
    expect(getFileSize(NaN)).toBe('0 B');
    expect(getFileSize(undefined)).toBe('0 B');
  });

  test('should work with normal values', () => {
    expect(getFileSize(0)).toBe('0 B');
    expect(getFileSize(1024)).toBe('1.00 kB');
    expect(getFileSize(1536)).toBe('1.50 kB');

    expect(getFileSize(2048 * 1024)).toBe('2.00 MB');
    expect(getFileSize(2048 * 1024 + 512 * 1024)).toBe('2.50 MB');

    expect(getFileSize(2048 * 1024 * 1024)).toBe('2.00 GB');
    expect(getFileSize((2048 + 512) * 1024 * 1024)).toBe('2.50 GB');
  });
});

describe('util:file:getFileName()', () => {
  test('should work with invalid URLs', () => {
    expect(getFileName('/2oh1412o321o3n/test.jpg')).toBe('file');
    expect(getFileName('/2oh1412o321o3n/test.jpg', 'fallback-name')).toBe('fallback-name');
  });

  test('should work with valid URLs', () => {
    expect(getFileName('https://dyte.io/test-file')).toBe('test-file');
    expect(getFileName('https://dyte.io/test/image.png')).toBe('image.png');
  });
});

describe('util:file:getExtension()', () => {
  test('should work with valid file names', () => {
    expect(getExtension('test.jpg')).toBe('jpg');
    expect(getExtension('test.')).toBe('');
  });

  test('should work with invalid file names', () => {
    expect(getExtension('test.pdf#?abc=def#testhash')).toBe('pdf');
  });
});
