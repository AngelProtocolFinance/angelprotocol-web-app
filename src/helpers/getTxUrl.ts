import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: string, txhash: string) {
  switch (chainID) {
    case chainIDs.terra_main:
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case chainIDs.terra_test:
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case chainIDs.eth_kovan:
      return `https://kovan.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    case chainIDs.bnb_main:
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case chainIDs.bnb_test:
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return TERRA_FINDER;
  }
}
