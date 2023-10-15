import { WalletID } from "types/wallet";

export function isEVM(id: WalletID) {
  switch (id) {
    case "binance-wallet":
    case "evm-wc":
    case "metamask":
    case "xdefi-evm":
    case "web3auth-torus":
      return true;
    default:
      return false;
  }
}
