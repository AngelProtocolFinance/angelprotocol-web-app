export default function toBase64(value: any): string {
  return window.btoa(JSON.stringify(value));
}
