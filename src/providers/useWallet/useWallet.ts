import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_WALLET, WalletConnectionType, WalletSetters } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletSettersRecord = Record<WalletConnectionType, WalletSetters>;

export default function useWallet(): WalletSetters {
  const [isLoading, setLoading] = useState(true);
  const [walletSetters, setWalletSetters] = useState<WalletSettersRecord>();
  const [currentConnectionType, setCurrentConnectionType] =
    useState<WalletConnectionType>();

  const metamaskSetters = useCreateMetamaskWallet();

  useEffect(() => {
    if (metamaskSetters.isLoading) {
      return;
    }

    setWalletSetters({
      metamask: metamaskSetters,
      terra: metamaskSetters,
    });
    setLoading(false);

    // safe to do, since only one wallet will be connected at a time
    if (metamaskSetters.isConnected) {
      setCurrentConnectionType("metamask");
    }
    // else if (terraSetters.isConnected) {
    //   setConnected(true);
    //   setWallet(terraSetters.wallet)
    // }
  }, [metamaskSetters]);

  const connect = useCallback(
    async (connType: WalletConnectionType) => {
      if (!walletSetters) {
        throw Error("Wallets not yet initialized");
      }
      const setters = walletSetters[connType];
      await setters.connect();
      setCurrentConnectionType(connType);
    },
    [walletSetters]
  );

  const disconnect = useCallback(async () => {
    if (!walletSetters) {
      throw Error("Wallets not yet initialized");
    }
    if (!currentConnectionType) {
      throw Error("Wallet not connected");
    }
    const setters = walletSetters[currentConnectionType];
    await setters.disconnect();
    setLoading(false);
    setCurrentConnectionType(undefined);
  }, [walletSetters, currentConnectionType]);

  const returnValue = useMemo(
    () =>
      getReturnValue(
        connect,
        disconnect,
        isLoading,
        walletSetters,
        currentConnectionType
      ),
    [walletSetters, currentConnectionType, connect, disconnect, isLoading]
  );

  return returnValue;
}

const getReturnValue = (
  connect: (_: WalletConnectionType) => Promise<void>,
  disconnect: () => Promise<void>,
  isLoading: boolean,
  walletSetters?: WalletSettersRecord,
  currentConnectionType?: WalletConnectionType
): WalletSetters => {
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
