import { Dwindow } from "services/provider/types";

const dwindow = window as Dwindow;
export default function isXdefiPrioritized() {
  return dwindow.xfi?.ethereum?.isMetaMask;
}
