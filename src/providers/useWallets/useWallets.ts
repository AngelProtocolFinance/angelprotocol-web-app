import { useCallback, useEffect, useState } from "react";
import { DEFAULT_WALLET, WalletConnectionType, WalletSetters } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletSettersRecord = Record<WalletConnectionType, WalletSetters>;

export default function useWallets(): WalletSetters {
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setConnected] = useState(false);
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
      setConnected(true);
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
      setLoading(true);
      const setters = walletSetters[connType];
      await setters.connect();
      setCurrentConnectionType(connType);
      setLoading(false);
      setConnected(true);
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
    setLoading(false);
    setConnected(false);
    setCurrentConnectionType(undefined);
  }, [walletSetters, currentConnectionType]);

  const wallet =
    !!walletSetters && currentConnectionType
      ? walletSetters[currentConnectionType].wallet
      : DEFAULT_WALLET;

  return { wallet, connect, disconnect, isLoading, isConnected };
}
