import { useCallback, useEffect, useState } from "react";
import { WalletConnectionType, WalletSetters } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletSettersRecord = Record<WalletConnectionType, WalletSetters>;

export default function useWallets(): Omit<WalletSetters, "wallet"> {
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const [walletSetters, setWalletSetters] = useState<WalletSettersRecord>();
  const [currentConnectionType, setCurrentConnectionType] =
    useState<WalletConnectionType>();

  const metamaskSetters = useCreateMetamaskWallet();

  useEffect(() => {
    if (!!walletSetters || metamaskSetters.isLoading) {
      return;
    }

    setWalletSetters({
      metamask: metamaskSetters,
      terra: metamaskSetters,
    });
    setLoading(false);
  }, [walletSetters, metamaskSetters]);

  const connect = useCallback(
    async (connType: WalletConnectionType) => {
      if (!walletSetters) {
        throw Error("Wallets not yet initialized");
      }
      const setters = walletSetters[connType];
      await setters.connect();
      setCurrentConnectionType(connType);
      setLoading(setters.isLoading);
      setConnected(setters.isConnected);
      return setters.wallet;
    },
    [walletSetters]
  );

  const disconnect = useCallback(async () => {
    if (!walletSetters) {
      throw Error("Wallets not yet initialized");
    }
    if (!currentConnectionType) {
      throw Error("Not connected");
    }
    const setters = walletSetters[currentConnectionType];
    await setters.disconnect();
    setLoading(setters.isLoading);
    setConnected(setters.isConnected);
  }, [walletSetters, currentConnectionType]);

  return { connect, disconnect, isLoading, isConnected };
}
