import { WalletError, WalletNotInstalledError } from "@ap/errors";
import { Dwindow } from "@ap/types";

export function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new WalletNotInstalledError("xdefi-wallet");
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
