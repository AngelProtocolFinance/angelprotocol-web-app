import { useMemo } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Account from "contracts/Account";

export default function useAccountContract(address: string) {
  const { wallet } = useGetWallet();
  const contract = useMemo(
    () => new Account(wallet, address),
    [wallet, address]
  );

  return { walletAddr: wallet?.address, contract };
}
