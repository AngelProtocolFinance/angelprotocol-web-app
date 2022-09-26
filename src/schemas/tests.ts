// we are validating endowment addresses with this function, which are actually contract addresses
// total address length for Juno contract addresses is 63 so if the len(juno1)=5 is subtracted
// the rest of the address must have a length of 58
export function isJunoAddress(address?: string): boolean {
  //for non-required schema, return true if address is undefined
  //for required schema, required() clause will catch it will not run this test
  return !address || /^juno1[a-z0-9]{38,58}$/i.test(address);
}

export function isEthereumAddress(address?: string): boolean {
  //for non-required schema, return true if address is undefined
  //for required schema, required() clause will catch it will not run this test
  return !address || /^juno1[a-z0-9]{38,58}$/i.test(address);
}

export function testTokenDigits(tokenAmount?: number): boolean {
  return !tokenAmount || /^\d+(\.\d{1,6})?$/.test(`${tokenAmount}`);
}
