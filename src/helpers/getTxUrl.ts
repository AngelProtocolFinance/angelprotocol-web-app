import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: string, txhash: string) {
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
    case chainIDs.bnb_test:
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case chainIDs.bnb_main:
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return TERRA_FINDER;
  }
}
