import { useState } from "react";
import { DEFAULT_WALLET, WalletConnectionType, WalletProxy } from "../types";

type WalletSettersRecord = Record<WalletConnectionType, WalletProxy>;

export default function useWalletProxy(): WalletProxy {
  const [isLoading, setLoading] = useState(true);

  return {
    wallet: DEFAULT_WALLET,
    connect: () => new Promise((r) => r),
    disconnect: () => new Promise((r) => r),
    isLoading,
    isConnected: false,
  };
}

const getReturnValue = (
  connect: (_: WalletConnectionType) => Promise<void>,
  disconnect: () => Promise<void>,
  isLoading: boolean,
  walletSetters?: WalletSettersRecord,
  currentConnectionType?: WalletConnectionType
): WalletProxy => {
  if (!walletSetters || !currentConnectionType) {
    return {
      wallet: DEFAULT_WALLET,
      connect,
      disconnect,
      isLoading,
      isConnected: false,
    };
  }

  const currWalletSetters = walletSetters[currentConnectionType];

  return {
    wallet: currWalletSetters.wallet,
    connect,
    disconnect,
    isConnected: currWalletSetters.isConnected,
    isLoading: isLoading || currWalletSetters.isLoading,
  };
};
