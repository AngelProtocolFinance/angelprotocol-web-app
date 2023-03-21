import { allChains, chainIDs } from "constants/chains";

export function getTxUrl(chainId: chainIDs, txHash: string): string {
  return `${allChains[chainId].txExplorer}/${txHash}`;
}
