import { useMemo } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";

export function useContract<U, T extends { new (walletAddr?: string): U }>(
  Contract: T
) {
  const { walletAddr } = useGetWallet();
  const contract = useMemo(
    () => new Contract(walletAddr),
    [walletAddr, Contract]
  );
  return { walletAddr, contract };
}
