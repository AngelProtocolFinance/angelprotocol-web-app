import { useMemo } from "react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";

export function useContract<U, T extends { new (wallet?: WalletState): U }>(
  Contract: T
) {
  const { wallet } = useGetWallet();
  const contract = useMemo(() => new Contract(wallet), [wallet, Contract]);
  return { walletAddr: wallet?.address, contract };
}
