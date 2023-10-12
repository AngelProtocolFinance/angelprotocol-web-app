import { WalletError, WalletNotInstalledError } from "errors/errors";

export function checkXdefiPriority() {
  if (!window?.xfi) {
    throw new WalletNotInstalledError("xdefi-wallet");
  }
  if (!window?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
