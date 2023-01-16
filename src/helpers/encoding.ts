import { toBase64 as base64FromU8a, toUtf8 as toU8a } from "@cosmjs/encoding";

export {
  fromBase64 as u8aFromBase64,
  fromHex as u8aFromHex,
} from "@cosmjs/encoding";
export { base64FromU8a, toU8a };
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
