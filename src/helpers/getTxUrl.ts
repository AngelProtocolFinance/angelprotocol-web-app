import { UnsupportedNetworkError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";

type URL_GROUP = { [index: string]: string };

const blockExplorers: URL_GROUP = {
  [chainIDs.bnb_main]: "https://testnet.bscscan.com/tx",
  [chainIDs.bnb_test]: "https://bscscan.com/tx",
  [chainIDs.eth_kovan]: "https://kovan.etherscan.io/tx",
  [chainIDs.eth_main]: "https://etherscan.io/tx",
  [chainIDs.juno_main]: "https://mintscan.io/juno/tx",
  [chainIDs.juno_test]: "https://testnet.ping.pub/juno/tx",
  [chainIDs.terra_main]: "https://finder.terra.money/mainnet/tx",
  [chainIDs.terra_test]: "https://finder.terra.money/testnet/tx",
};

export default function getTxUrl(chainId: string, txhash: string) {
  const blockExplorer = blockExplorers[chainId];
  if (!blockExplorer) {
    throw new UnsupportedNetworkError(chainId);
  }

  return `${blockExplorer}/${txhash}`;
}
