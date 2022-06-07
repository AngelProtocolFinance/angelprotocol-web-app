import { Dwindow } from "types/ethereum";
import { EIP1193Error } from "errors/errors";

export default function checkXdefiPriority() {
  const dwindow = window as Dwindow;
  if (!dwindow?.xfi) {
    throw new EIP1193Error("Xdefi is not installed", 0);
  }
  if (!dwindow?.xfi?.ethereum?.isMetaMask) {
    throw new EIP1193Error("Kindly prioritize Xdefi and reload the page", 0);
  }
}
