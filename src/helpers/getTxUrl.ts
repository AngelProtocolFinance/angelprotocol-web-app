import { chains } from "constants/chains";

export function getTxUrl(chainId: string, txHash: string): string {
  return `${chains[chainId].txExplorer}/${txHash}`;
}
