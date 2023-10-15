import { ChainID } from "types/chain";
import { chains } from "constants/chains-v2";

export function getTxUrl(chainId: ChainID, txHash: string): string {
  return `${chains[chainId].blockExplorer}/tx/${txHash}`;
}
