import { chainIDs, chains } from "constants/chains";

export function getAddressUrl(chainId: chainIDs, address: string): string {
  return `${chains[chainId].addressExplorer}/${address}`;
}
