import { UnimplementedNetworkError } from "errors/errors";
import { blockExplorers } from "constants/urls";

export default function getTxUrl(chainId: string, txhash: string) {
  const blockExplorer = blockExplorers[chainId];
  if (!blockExplorer) {
    throw new UnimplementedNetworkError(chainId);
  }

  return `${blockExplorer}/${txhash}`;
}
