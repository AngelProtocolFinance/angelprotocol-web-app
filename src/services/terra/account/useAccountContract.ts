import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";
import { useMemo } from "react";

export default function useAccountContract(address: string) {
  const wallet = useConnectedWallet();
  const contract = useMemo(
    () => new Account(address, wallet),
    [wallet, address]
  );

  return { wallet, contract };
}
