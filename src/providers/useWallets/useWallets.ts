import { useCallback, useEffect, useState } from "react";
import { Wallet, WalletConnectionType } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletSetters = {
  wallet: Wallet;
  connect: (...args: any[]) => Promise<void>;
  disconnect: (...args: any[]) => Promise<void>;
};
type WalletSettersRecord = Record<WalletConnectionType, WalletSetters>;

export default function useWallets() {
  const [isLoading, setLoading] = useState(true);
  const [walletSetters, setWalletSetters] = useState<WalletSettersRecord>();
  const [currentConnectionType, setCurrentConnectionType] =
    useState<WalletConnectionType>("terra");

  const createMetamaskWallet = useCreateMetamaskWallet();

  useEffect(() => {
    async function create() {
      const metamask = await createMetamaskWallet();

      setWalletSetters({
        metamask,
        terra: metamask,
      });
      setLoading(false);
    }

    create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(
    async (connType: WalletConnectionType) => {
      if (!walletSetters) {
        throw Error("Wallets not yet initialized");
      }
      const setters = walletSetters[connType];
      setLoading(true);
      await setters.connect();
      setCurrentConnectionType(connType);
      setLoading(false);
      return setters.wallet;
    },
    [walletSetters]
  );

  const disconnect = useCallback(async () => {
    if (!walletSetters) {
      throw Error("Wallets not yet initialized");
    }
    setLoading(true);
    const wallet = walletSetters[currentConnectionType];
    await wallet.disconnect();
    setLoading(false);
  }, [walletSetters, currentConnectionType]);

  return { connect, disconnect, isLoading };
}
