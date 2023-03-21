import { ChainID } from "types/aws";
import { chains } from "constants/chains";

export function getAddressUrl(chainId: ChainID, address: string): string {
  return `${chains[chainId].addressExplorer}/${address}`;
}
