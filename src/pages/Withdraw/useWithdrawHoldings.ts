import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";

export default function useWithdrawHoldings(
  address: string,
  anchorVault: string
) {
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      const account = new Account(address, wallet);
      // const result = await account.createWithdrawTx(anchorVault);
      console.log(account);
      console.log(anchorVault);
    })();
  }, [wallet]);
}
