import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: chainIDs, txhash: string) {
  switch (chainID) {
    case chainIDs.mainnet:
    case chainIDs.testnet:
      return `${TERRA_FINDER}${chainID}/tx/${txhash}`;
    case chainIDs.eth_ropsten:
      return `https://ropsten.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    default:
      return `https://notfoundterra.com/home`;
  }
}
