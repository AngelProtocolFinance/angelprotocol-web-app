import { chains } from "constants/chains-v2";

export function getTxUrl(chainId: string, txHash: string): string {
  return `${chains[chainId].blockExplorer}/tx/${txHash}`;
}
