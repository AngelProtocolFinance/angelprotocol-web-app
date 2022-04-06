import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: chainIDs, txhash: string) {
  switch (chainID) {
    case chainIDs.gen_mainnet:
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case chainIDs.gen_testnet:
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case chainIDs.mainnet:
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case chainIDs.testnet:
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case chainIDs.eth_ropsten:
      return `https://ropsten.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    default:
      return `https://notfoundterra.com/home`;
  }
}
