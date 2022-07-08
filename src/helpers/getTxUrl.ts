import { UnimplementedNetworkError } from "errors/errors";
import { blockExplorers } from "constants/urls";

export default function getTxUrl(chainID: string, txhash: string) {
  const blockExplorer = blockExplorers[chainID];
  if (!blockExplorer) {
    throw new UnimplementedNetworkError(chainID);
  }

  return `${blockExplorer}/${txhash}`;
}
