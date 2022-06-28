import { useMemo } from "react";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { GovContract, createGovContract } from "contracts";

export default function useGovContract() {
  const { wallet } = useGetWallet();
  const contract = useMemo(() => createGovContract(wallet), [wallet]);
  return { wallet, contract };
}
