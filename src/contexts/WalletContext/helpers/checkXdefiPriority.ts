import { Dwindow } from "types/ethereum";
import { WalletError, WalletErrorCodes } from "errors/errors";

export default function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new WalletError(
      "Xdefi is not installed",
      WalletErrorCodes.NOT_INSTALLED
    );
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new WalletError("Kindly prioritize Xdefi and reload the page", 0);
  }
}
