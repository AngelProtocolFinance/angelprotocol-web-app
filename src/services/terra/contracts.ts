import { useMemo } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Registrar from "contracts/Registrar";
import Admin from "contracts/Admin";
import Halo from "contracts/Halo";
import LP from "contracts/LP";

export function useHaloContract() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);
  return { wallet, contract };
}

export function useRegistrar() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Registrar(wallet), [wallet]);
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
