import { toBase64 as base64FromU8a, toUtf8 as toU8a } from "@cosmjs/encoding";
import { AbiCoder } from "@ethersproject/abi";

export {
  fromBase64 as u8aFromBase64,
  fromHex as u8aFromHex,
} from "@cosmjs/encoding";
export { base64FromU8a, toU8a };

export function toAbiStr(obj: object) {
  const coder = new AbiCoder();
  return coder.encode(["string"], [JSON.stringify(obj)]);
}
export function fromAbiStr<T>(encoded: string) {
  const coder = new AbiCoder();
  return JSON.parse(coder.decode(["string"], encoded)[0]) as T;
}

/**
 *
 * @param value object that may contain strings with some [charaters occupying more than one byte](https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings)
 * @returns base64 encoded string
 */
export function objToBase64<T extends object>(value: T): string {
  const encoder = new TextEncoder();
  /**
   * convert the string such that each character occupies only one byte
   * https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
   */
  const u8a = encoder.encode(JSON.stringify(value));
  return window.btoa(String.fromCharCode(...Array.from(u8a)));
}
