import { FormikHelpers } from "formik";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Status, Values } from "./Donator";
import handleError from "./handleError";
import Indexfund from "contracts/IndexFund";

export default function useDonate() {
  const connectedWallet = useConnectedWallet();

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
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

    //what is the right amout of fee??
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

  return { handleDonate };
}
