import { useMemo } from "react";
import { WalletProxy } from "providers/WalletProvider";
import useWalletContext from "hooks/useWalletContext";

export function useContract<U, T extends { new (wallet?: WalletProxy): U }>(
  Contract: T
) {
  const { wallet } = useWalletContext();
  const contract = useMemo(() => new Contract(wallet), [wallet, Contract]);
  return { wallet, contract };
}
