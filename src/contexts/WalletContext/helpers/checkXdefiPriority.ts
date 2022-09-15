import { Dwindow } from "types/ethereum";
import { WalletError, WalletNotInstalledError } from "errors/errors";

export default function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new WalletNotInstalledError("XDEFI", "xdefi-wallet");
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
