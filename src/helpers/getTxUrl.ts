import { UnimplementedNetworkError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";
import { blockExplorers } from "constants/urls";

export default function getTxUrl(chainID: chainIDs, txhash: string) {
  const blockExplorer = blockExplorers[chainID];
  if (!blockExplorer) {
    throw new UnimplementedNetworkError(chainID);
  }

  return `${blockExplorer}/${txhash}`;
}
