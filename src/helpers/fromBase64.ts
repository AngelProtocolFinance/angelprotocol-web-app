export default function fromBase64<T extends object>(
  value: string
): T | undefined {
  try {
    return JSON.parse(window.atob(value));
  } catch (e) {
    //return undefined if encountered error (value is not valid JSON string)
    console.error(e);
  }
}
