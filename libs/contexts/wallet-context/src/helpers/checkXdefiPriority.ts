import { WalletError, WalletNotInstalledError } from "@ap/errors";
import { Dwindow } from "@ap/types";
import { WALLET_METADATA } from "../constants";

export function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    const { name, logo, installUrl } = WALLET_METADATA["xdefi-wallet"];
    throw new WalletNotInstalledError({ name, logo, installURL: installUrl });
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
