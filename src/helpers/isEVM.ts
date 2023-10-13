import { ProviderId } from "types/wallet";

export function isEVM(id: ProviderId) {
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
