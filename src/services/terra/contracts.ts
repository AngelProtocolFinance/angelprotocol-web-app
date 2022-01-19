import { useConnectedWallet } from "@terra-money/wallet-provider";
import Admin from "contracts/Admin";
import Halo from "contracts/Halo";
import LP from "contracts/LP";
import { useMemo } from "react";

export function useHaloContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);
  return { wallet, contract };
}

export function useLPContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new LP(wallet), [wallet]);
  return { wallet, contract };
}

export function useAdminContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Admin(wallet), [wallet]);
  return { wallet, contract };
}
