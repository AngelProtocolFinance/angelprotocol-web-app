import { Dwindow } from "types/ethereum";
import { WalletError } from "errors/errors";

export default function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new WalletError("Xdefi is not installed", 0);
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
