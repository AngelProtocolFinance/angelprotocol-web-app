import { FormikHelpers } from "formik";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Status, Values } from "./Donator";
import handleError from "./handleError";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";

export default function useDonate() {
  const connectedWallet = useConnectedWallet();
  const UST_balance = useUSTBalance(connectedWallet);

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
    //values.amount is properly formatted string | number at this point
    const UST_Amount = values.amount;

    actions.setSubmitting(true);

    if (!connectedWallet) {
      actions.setStatus({
        status: Status.failed,
        message: "Wallet is not connected",
      });
      //set error message
      return;
    }

    // coerce(+) UST_amount to number
    if (UST_balance < +UST_Amount) {
      actions.setStatus({
        status: Status.failed,
        message: "Not enough balance",
      });
      //set error message
      return;
    }

    try {
      const indexFund = new Indexfund(
        connectedWallet.terraAddress,
        connectedWallet.network.chainID
      );
      const transaction = indexFund.createDepositTransaction(1, UST_Amount);

      const result = await connectedWallet.post(transaction);
      console.log(result);
    } catch (error) {
      console.log(error);
      const errorObj = handleError(error);
      actions.setStatus(errorObj);
    }
  }

  return {
    handleDonate,
    UST_balance,
    network: connectedWallet?.network.name || "not available",
  };
}
