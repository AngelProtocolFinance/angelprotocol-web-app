import { chainIDs } from "constants/chainIDs";

export default function getTxUrl(chainID: string, txhash: string) {
  switch (chainID) {
    case chainIDs.mainnet:
      return `https://etherscan.io/tx/${txhash}`;
    case chainIDs.testnet:
      return `https://etherscan.io/tx/${txhash}`;
    case chainIDs.eth_ropsten:
      return `https://ropsten.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    case "97":
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case "56":
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return "https://etherscan.io";
  }
}
