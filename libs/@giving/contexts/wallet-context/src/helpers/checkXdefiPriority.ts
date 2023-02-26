import { WalletError, WalletNotInstalledError } from "@giving/errors";
import { Dwindow } from "@giving/types/ethereum";
import { WALLET_METADATA } from "../constants";

export function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new WalletNotInstalledError(WALLET_METADATA["xdefi-wallet"]);
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
