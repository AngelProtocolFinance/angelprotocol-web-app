import { useMemo } from "react";
import {
  useConnectedWallet,
  ConnectedWallet,
} from "@terra-money/wallet-provider";

export function useContract<U, T extends { new (wallet?: ConnectedWallet): U }>(
  Contract: T
) {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Contract(wallet), [wallet, Contract]);
  return { wallet, contract };
}
