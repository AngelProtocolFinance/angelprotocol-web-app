import { ConnectedWallet, ContextState, DisconnectedWallet } from "../types";
import { Dwindow } from "types/window";

export function isDisconnected(
  wallet: ContextState
): wallet is DisconnectedWallet[] {
  return wallet !== "loading" && Array.isArray(wallet);
}
export function isConnected(wallet: ContextState): wallet is ConnectedWallet {
  return wallet !== "loading" && !Array.isArray(wallet);
}

export function isXdefiPrioritized() {
  return (window as Dwindow).xfi?.ethereum?.isMetaMask;
}
