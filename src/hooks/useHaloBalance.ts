import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { useMemo } from "react";
import { useHaloBalanceQuery } from "services/terra/terra";
export default function useHaloBalance() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);

  const { data: halo_balance = 0 } = useHaloBalanceQuery(
    {
      address: contract.token_address,
      //this query will only run if wallet is not undefined
      msg: { balance: { address: wallet?.walletAddress || "" } },
    },
    { skip: wallet === undefined }
  );

  return halo_balance;
}
