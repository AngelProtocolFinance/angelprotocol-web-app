export function isEthereumAddress(address?: string): boolean {
  //for non-required schema, return true if address is undefined
  //for required schema, required() clause will catch it will not run this test
  return !address || /^0x[a-fA-F0-9]{40}$/g.test(address);
}

export function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
