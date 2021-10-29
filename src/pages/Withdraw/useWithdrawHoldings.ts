import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { FormikHelpers } from "formik";
import Account from "contracts/Account";

interface Values {
  withdraw: string;
}

function useWithdrawHoldings(
  address: string,
  anchorVault: string,
  withdrawTokenQty: string
) {
  const wallet = useConnectedWallet();

  // useEffect(() => {
  //   (async () => {
  //     const account = new Account(address, wallet);
  //     // const result = await account.createWithdrawTx(anchorVault);
  //     console.log(account);
  //     console.log(anchorVault);
  //   })();
  // }, [wallet]);

  async function withdrawHoldings(
    values: Values,
    actions: FormikHelpers<Values>
  ) {
    values.withdraw = withdrawTokenQty;
    const tokenQty = values.withdraw;
    console.log("Vault:", anchorVault);
    console.log("Token QTY:", tokenQty);
    try {
    } catch (err) {
      console.error(err);
    }
  }

  return withdrawHoldings;
}

export default useWithdrawHoldings;
