export function toPrefixedHex(value: number | string) {
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${value} is not a number`);
  }
  return `0x${num.toString(16)}`;
}
