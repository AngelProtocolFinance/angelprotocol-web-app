import { EVMWallet, WalletState } from "../types";

export function isEVM(wallet: WalletState): wallet is EVMWallet {
  return wallet.status === "connected" && wallet.type === "evm";
}
