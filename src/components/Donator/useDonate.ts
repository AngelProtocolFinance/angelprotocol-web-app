import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Values, Steps, SetStatus, Status } from "./types";
import createStatusFromError from "./createStatusFromError";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { FormikHelpers } from "formik";
import { Denom } from "@terra-money/terra.js";
import pollTxInfo from "./pollTxInfo";

export default function useDonate(status: Status, setStatus: SetStatus) {
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
    //values.amount is properly formatted string | number at this point due to validation
    const UST_Amount = values.amount;
    actions.setSubmitting(true);
    if (!wallet) {
      setStatus({
        step: Steps.error,
        message: "Wallet is not connected",
      });
      return;
    }

    if (UST_balance < +UST_Amount) {
      setStatus({
        step: Steps.error,
        message: "Not enough balance",
      });
      return;
    }

    try {
      const indexFund = new Indexfund(wallet);
      //createTx errors will be on catch block
      const transaction = await indexFund.createDepositTx(1, UST_Amount);
      const estimatedFee =
        +transaction.fee!.amount.get(Denom.USD)!.toData().amount / 1e6;

      //check if user has enough balance

      //prompt user to confirm transaction

      if (status.step !== Steps.ready) {
        setStatus({
          step: Steps.confirm,
          message: `Kindly confirm transaction details`,
          details: {
            amount: +UST_Amount,
            fee: estimatedFee,
          },
        });
        return;
      }

      const response = await wallet.post(transaction);

      //if transaction is ran, get transaction info
      if (response.success) {
        //not readily available so we need to poll
        const txInfo = await pollTxInfo(
          indexFund.getTxResponse,
          response.result.txhash,
          1000, //try again 1 second after last retry
          7 //poll 7 items before giving up
        );
        if (!txInfo) {
          setStatus({
            step: Steps.error,
            message: `Transaction ran but failed to get details`,
          });
        } else {
          if (!txInfo.code) {
            setStatus({
              step: Steps.success,
              message: `Thank you for your donation!`,
            });
          } else {
            setStatus({
              step: Steps.error,
              message: `The transaction ran but failed`,
            });
          }
        }
        //code prop is present on failed transactions
      }
    } catch (error) {
      console.log(error);
      const errorStatus = createStatusFromError(error);
      setStatus(errorStatus);
    }
  }

  return {
    handleDonate,
  };
}
