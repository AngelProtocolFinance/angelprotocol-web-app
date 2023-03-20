import { chainIDs, chains } from "constants/chains";

export function getTxUrl(chainId: chainIDs, txHash: string): string {
  return `${chains[chainId].txExplorer}/${txHash}`;
}
