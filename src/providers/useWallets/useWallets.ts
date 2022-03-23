import { useEffect, useState } from "react";
import { Wallet, WalletConnectionType } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletsRecord = Record<WalletConnectionType, Wallet>;

export default function useWallets() {
  const [isLoading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<WalletsRecord>();

  const createMetamaskWallet = useCreateMetamaskWallet();

  useEffect(() => {
    async function create() {
      const metamask = await createMetamaskWallet();

      setWallets({
        metamask,
        terra: metamask,
      });
      setLoading(false);
    }

    create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { wallets, isLoading };
}
