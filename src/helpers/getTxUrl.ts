import { ChainIDs } from "@types-lists";
import { TERRA_FINDER } from "constants/urls";

export default function getTxUrl(chainID: ChainIDs, txhash: string) {
  switch (chainID) {
    case "mainnet":
    case "columbus-5":
      return `${TERRA_FINDER}mainnet/tx/${txhash}`;
    case "testnet":
    case "bombay-12":
      return `${TERRA_FINDER}testnet/tx/${txhash}`;
    case "3":
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
