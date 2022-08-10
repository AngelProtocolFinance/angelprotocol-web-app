import { Chain } from "types/server/aws";

export default function getTxUrl(chain: Chain, txHash: string): string {
  return `${chain.block_explorer_url}${txHash}`; // chain.block_explorer_url always ends with '/'
}
