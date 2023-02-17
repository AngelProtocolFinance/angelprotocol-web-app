import { chains } from "@ap/constants";

export function getAddressUrl(chainId: string, address: string): string {
  return `${chains[chainId].addressExplorer}/${address}`;
}
