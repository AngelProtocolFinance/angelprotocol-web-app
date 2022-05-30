import { chainIDs } from "constants/chainIDs";

export default function getTxUrl(chainID: string, txhash: string) {
  switch (chainID) {
    case chainIDs.avax_test:
      return `https://testnet.snowtrace.io/tx/${txhash}`;
    case chainIDs.avax_main:
      return `https://snowtrace.io/tx/${txhash}`;
    case chainIDs.eth_kovan:
      return `https://ropsten.etherscan.io/tx/${txhash}`;
    case chainIDs.eth_main:
      return `https://etherscan.io/tx/${txhash}`;
    case chainIDs.bnb_test:
      return `https://testnet.bscscan.com/tx/${txhash}`;
    case chainIDs.bnb_main:
      return `https://bscscan.com/tx/${txhash}`;
    default:
      return "https://etherscan.io";
  }
}
