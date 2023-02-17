/**
 *
 * @param value object that may contain strings with some [charaters occupying more than one byte](https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings)
 * @returns base64 encoded string
 */
export function toBase64<T extends object>(value: T): string {
  const encoder = new TextEncoder();
  /**
   * convert the string such that each character occupies only one byte
   * https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
   */
  const u8a = encoder.encode(JSON.stringify(value));
  return window.btoa(String.fromCharCode(...Array.from(u8a)));
}
