import { EVMWallet, ProviderState, WalletState } from "../types";

export function isEVM(
  wallet: WalletState | ProviderState
): wallet is EVMWallet {
  return wallet.status === "connected" && wallet.type === "evm";
}
