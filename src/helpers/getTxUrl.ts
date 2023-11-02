import { ChainID } from "types/chain";
import { chains } from "constants/chains";

export function getTxUrl(chainId: ChainID, txHash: string): string {
  return `${chains[chainId].blockExplorer}/tx/${txHash}`;
}
