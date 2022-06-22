import { useMemo } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";

export function useContract<U, T extends { new (walletAddr?: string): U }>(
  Contract: T
) {
  const { wallet } = useGetWallet();
  const contract = useMemo(
    () => new Contract(wallet?.address),
    [wallet, Contract]
  );
  return { walletAddr: wallet?.address, contract };
}
