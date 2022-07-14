export function testAddress(address?: string): boolean {
  //for non-required schema, return true if address is undefined
  //for required schema, required() clause will catch it will not run this test
  return !address || /^juno[a-z0-9]{39}$/i.test(address);
}

export function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
