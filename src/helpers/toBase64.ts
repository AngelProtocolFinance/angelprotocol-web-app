export function toBase64<T extends object>(value: T): string {
  return window.btoa(JSON.stringify(value));
}
