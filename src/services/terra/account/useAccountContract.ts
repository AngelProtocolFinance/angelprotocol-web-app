import { useMemo } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";

export default function useAccountContract(address: string) {
  const { walletAddr } = useGetWallet();
  const contract = useMemo(
    () => new Account(address, walletAddr),
    [walletAddr, address]
  );

  return { walletAddr, contract };
}
