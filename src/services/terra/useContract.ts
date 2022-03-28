import { useConnectedWallet } from "@terra-money/wallet-provider";
import { WalletProxy } from "providers/WalletProvider";
import { useMemo } from "react";

export function useContract<U, T extends { new (wallet?: WalletProxy): U }>(
  Contract: T
) {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Contract(wallet), [wallet, Contract]);
  return { wallet, contract };
}
