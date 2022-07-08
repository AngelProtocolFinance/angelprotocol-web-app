import { blockExplorers } from "constants/urls";

export default function getTxUrl(chainID: string, txhash: string) {
  const blockExplorer = blockExplorers[chainID];
  if (!blockExplorer) {
    throw new Error("Unhandled chainID");
  }

  return `${blockExplorer}/${txhash}`;
}
