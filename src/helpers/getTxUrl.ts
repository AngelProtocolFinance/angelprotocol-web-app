import { chainIDs } from "constants/chainIDs";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: string, txhash: string) {
  switch (chainID) {
    case chainIDs.mainnet:
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case chainIDs.testnet:
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case chainIDs.terra_main:
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case chainIDs.terra_test:
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case chainIDs.eth_ropsten:
      return `https://ropsten.etherscan.io/tx/${txhash}`;
    case "1":
      return `https://etherscan.io/tx/${txhash}`;
    case "97":
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case "56":
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return TERRA_FINDER;
  }
}
