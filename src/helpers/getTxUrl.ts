import { ChainID, chains } from "constants/chains";

export function getTxUrl(chainId: ChainID, txHash: string): string {
  return `${chains[chainId].txExplorer}/${txHash}`;
}
