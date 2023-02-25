import { chains } from "@giving/constants/chains";

export function getAddressUrl(chainId: string, address: string): string {
  return `${chains[chainId].addressExplorer}/${address}`;
}
