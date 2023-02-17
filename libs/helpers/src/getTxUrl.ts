import { chains } from "@ap/constants";

export function getTxUrl(chainId: string, txHash: string): string {
  return `${chains[chainId].txExplorer}/${txHash}`;
}
