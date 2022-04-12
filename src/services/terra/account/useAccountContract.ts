import Account from "contracts/Account";
import useWalletContext from "hooks/useWalletContext";
import { useMemo } from "react";

export default function useAccountContract(address: string) {
  const { wallet } = useWalletContext();
  const contract = useMemo(
    () => new Account(address, wallet),
    [wallet, address]
  );

  return { wallet, contract };
}
