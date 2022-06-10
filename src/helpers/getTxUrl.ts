import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: chainIDs, txhash: string) {
  switch (chainID) {
    case chainIDs.terra_classic:
      return `${TERRA_FINDER}classic/tx/${txhash}`;
    case chainIDs.terra_test:
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
