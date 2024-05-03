import { chains } from "constants/chains";
import type { ChainID } from "types/chain";

export function getTxUrl(chainId: ChainID, txHash: string): string {
  return `${chains[chainId].blockExplorer}/tx/${txHash}`;
}
