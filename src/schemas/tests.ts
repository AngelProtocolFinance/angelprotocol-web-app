export function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
