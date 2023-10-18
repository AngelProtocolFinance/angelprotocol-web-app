import { ProviderId } from "types/lists";

export function isEVM(id: ProviderId) {
  switch (id) {
    case "binance-wallet":
    case "evm-wc":
    case "metamask":
    case "xdefi-evm":
      return true;
    default:
      return false;
  }
}
