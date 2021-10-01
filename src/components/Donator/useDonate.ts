import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Values, Steps, SetStatus, Status } from "./types";
import createStatusFromError from "./createStatusFromError";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { FormikHelpers } from "formik";
import { AccAddress, Denom } from "@terra-money/terra.js";
import pollTxInfo from "./pollTxInfo";
import getDepositAmount from "./getDepositAmount";
import Account from "contracts/Account";
//prettier-ignore
function useDonate(status: Status, setStatus: SetStatus, receiver?: AccAddress | number ) {
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

    //check if user has enough balance
    if (UST_balance < +UST_Amount) {
      setStatus({
        step: Steps.error,
        message: "Not enough balance",
      });
      return;
    }

    try {
      let contract; 
      if(!receiver){
        contract = new Indexfund(wallet)
      } else if (typeof receiver === 'number'){
        contract = new Indexfund(wallet, receiver)
      } else {
        contract = new Account(wallet, receiver)
      }
      //createTx errors will be on catch block
      const transaction = await contract.createDepositTx(
        UST_Amount,
        splitToLiquid
      );
      const estimatedFee =
        transaction.fee!.amount.get(Denom.USD)!.amount.toNumber() / 1e6;

    

      //prompt user to confirm transaction
      if (status.step !== Steps.ready) {
        setStatus({
          step: Steps.confirm,
          message: `Kindly confirm transaction details`,
          estimates: {
            amount: +UST_Amount,
            txFee: estimatedFee,
            total: +UST_Amount + estimatedFee,
          },
        });
        return;
      }

      const response = await wallet.post(transaction);

      //if transaction is ran, get transaction info
      if (response.success) {
        //not readily available so we need to poll
        setStatus({
          step: Steps.waiting,
          message: "Waiting for transaction result",
        });

        const txInfo = await pollTxInfo(
          contract.getTxResponse,
          response.result.txhash,
          1000, //try again 1 second after last retry
          7 //poll 7 items before giving up
        );

        console.log(txInfo);
        if (!txInfo) {
          setStatus({
            step: Steps.error,
            message: `Transaction ran but failed to get details`,
          });
        } else {
          //code property is present on failed transaction info
          if (!txInfo.code) {
            const depositAmount = getDepositAmount(txInfo.logs!);
            setStatus({
              step: Steps.success,
              message: `Thank you for your donation!`,
              result: {
                received: +UST_Amount,
                deposited: depositAmount,
                url: `https://finder.terra.money/${contract.wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
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

  return handleDonate;
}

export default useDonate;
