import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Status, Values, Result } from "./types";
import handleError from "./handleError";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { useState } from "react";
import { FormikHelpers } from "formik";

export default function useDonate() {
  const [result, setResult] = useState<Result>({
    status: Status.initial,
    message: "",
  });

  const connectedWallet = useConnectedWallet();
  const UST_balance = useUSTBalance(connectedWallet);

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
    //values.amount is properly formatted string | number at this point due to validation
    const UST_Amount = values.amount;

    actions.setSubmitting(true);

    if (!connectedWallet) {
      setResult({
        status: Status.error,
        message: "Wallet is not connected",
      });
      //set error message
      return;
    }

    // coerce(+) UST_amount to number
    // plus fees??
    if (UST_balance < +UST_Amount) {
      setResult({
        status: Status.error,
        message: "Not enough balance",
      });
      //set error message
      return;
    }

    //should also check if network is on mainnet for actual donations

    try {
      const indexFund = new Indexfund(connectedWallet);
      const transaction = await indexFund.createDepositTx(1, UST_Amount);
      const response = await connectedWallet.post(transaction);

      if (response.success) {
        setResult({
          status: Status.success,
          message: "Thank you for your donation!",
        });
      }
    } catch (error) {
      console.log(error);
      const errorObj = handleError(error);
      setResult(errorObj);
    } finally {
      actions.resetForm();
    }
  }

  return {
    result,
    setResult,
    handleDonate,
    UST_balance,
    network: connectedWallet?.network.name || "not available",
  };
}
