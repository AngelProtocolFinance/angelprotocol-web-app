import { ConnectedWallet, DisconnectedWallet } from "types/wallet";

export type WalletContextState =
  | "loading" /** consolidate all LoadingWallet*/
  | ConnectedWallet
  | DisconnectedWallet[];

/** type guards */
export function isDisconnected(
  state: WalletContextState,
): state is DisconnectedWallet[] {
  return Array.isArray(state);
}
export function isConnected(
  state: WalletContextState,
): state is ConnectedWallet {
  return state !== "loading" && !Array.isArray(state);
}
