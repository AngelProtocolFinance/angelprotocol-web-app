import { chains } from "constants/chains";

export function getTxUrl(chainId: string, txHash: string): string {
  const txUrl = chains[chainId];
  return `${txUrl}/${txHash}`;
}
