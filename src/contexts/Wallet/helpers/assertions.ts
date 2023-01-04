import { ConnectedWallet, ContextState, DisconnectedWallet } from "../types";

export function isDisconnected(
  wallet: ContextState
): wallet is DisconnectedWallet[] {
  return wallet !== "loading" && Array.isArray(wallet);
}

export function isConnected(wallet: ContextState): wallet is ConnectedWallet {
  return wallet !== "loading" && !Array.isArray(wallet);
}
