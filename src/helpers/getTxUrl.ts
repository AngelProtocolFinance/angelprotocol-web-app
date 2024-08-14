import { chains } from "constants/chains";
import type { Chain } from "types/chain";

export function getTxUrl(chainId: Chain.Id.All, txHash: string): string {
  return `${chains[chainId].blockExplorer}/tx/${txHash}`;
}
