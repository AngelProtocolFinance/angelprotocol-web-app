/**
 *
 * @param value object that may contain strings with some [charaters occupying more than one byte](https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings)
 * @returns base64 encoded string
 */
export function toBase64<T extends object>(value: T): string {
  /**
   * convert the string such that each character occupies only one byte
   * https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
   */
  const u8a = toU8a(JSON.stringify(value));
  return base64FromU8a(u8a);
}

export function toU8a(value: string) {
  const encoder = new TextEncoder();
  return encoder.encode(value);
}

export function base64FromU8a(u8a: Uint8Array): string {
  return window.btoa(String.fromCharCode(...Array.from(u8a)));
}

export function u8aFromBase64(b64: string) {
  const decoded = window.atob(b64);
  return toU8a(decoded);
}
