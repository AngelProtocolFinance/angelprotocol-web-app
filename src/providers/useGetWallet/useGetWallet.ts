import { useEffect, useState } from "react";
import { Wallet, WalletConnectionType } from "../types";
import useCreateMetamaskWallet from "./useCreateMetamaskWallet";

type WalletsRecord = Record<WalletConnectionType, Wallet>;

const DEFAULT: WalletsRecord = { metamask: undefined, terra: undefined };

export default function useGetWallet(connType: WalletConnectionType) {
  const [wallets, setWallets] = useState<WalletsRecord>(DEFAULT);

  const createMetamaskWallet = useCreateMetamaskWallet();

  useEffect(() => {
    async function create() {
      const metamask = await createMetamaskWallet();

      setWallets({
        metamask,
        terra: undefined,
      });
    }

    create();
  });
  return wallets[connType];
}
