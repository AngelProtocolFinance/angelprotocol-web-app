import { allChains, chainIDs } from "constants/chains";

export function getAddressUrl(chainId: chainIDs, address: string): string {
  return `${allChains[chainId].addressExplorer}/${address}`;
}
