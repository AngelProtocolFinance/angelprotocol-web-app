export default function toBase64(value: any): string {
  return Buffer.from(JSON.stringify(value)).toString("base64");
}
