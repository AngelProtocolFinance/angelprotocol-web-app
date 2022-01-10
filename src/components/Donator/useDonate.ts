import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Values, Steps, SetStatus, Status } from "./types";
import createStatusFromError from "./createStatusFromError";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { FormikHelpers } from "formik";
import { AccAddress } from "@terra-money/terra.js";
import getDepositAmount from "./getDepositAmount";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import { useLogDonationTransactionMutation } from "services/apes/donations";
import createAuthToken from "helpers/createAuthToken";
//prettier-ignore
function useDonate(status: Status, setStatus: SetStatus, receiver?: AccAddress | number ) {
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();
  const [logDonationTransaction] = useLogDonationTransactionMutation();

  //executing message (needs gas)
  async function handleDonate(values: Values, actions: FormikHelpers<Values>) {
    //values.amount is properly formatted string | number at this point due to validation
    const UST_Amount = values.amount;

    //values.split = split to locked acc
    const splitToLiquid = 100 - values.split

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
      //typeof receiver for IndexFund is number | undefined as enforced by <Donator/> Props
      const contract =
        typeof receiver === 'number' || typeof receiver === 'undefined' 
          ? new Indexfund(wallet, receiver) 
          : new Account(receiver, wallet); 
      
      //createTx errors will be on catch block
      const transaction = await contract.createDepositTx(
        UST_Amount,
        splitToLiquid
      );
      const estimatedFee =
        transaction.fee!.amount.get(denoms.uusd)!.amount.toNumber() / 1e6;
      const transactionMessage: any = transaction.msgs[0];
      const fundId = transactionMessage.execute_msg.deposit.fund_id;

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

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000)
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          const depositAmount = getDepositAmount(txInfo.logs!, wallet.network.chainID);
          // Every transaction is recorded in our APES AWS DynamoDB donations table
          // When a Tax Receipt is requested, an email will be sent to them
          let valuesToBeSubmitted: any = values;
          valuesToBeSubmitted["walletAddress"] = wallet.walletAddress;
          valuesToBeSubmitted["denomination"] = "UST";
          valuesToBeSubmitted["fundId"] = fundId;
          valuesToBeSubmitted["transactionId"] = txInfo.txhash;
          valuesToBeSubmitted["transactionDate"] = new Date().toISOString();
          Object.keys(valuesToBeSubmitted).forEach(key => valuesToBeSubmitted[key] === "" && delete valuesToBeSubmitted[key]); // Removes blank strings ("")
          // Auth token to be passed as part of the header of the request
          const authToken = createAuthToken("angelprotocol-web-app");
          // Call APES endpoint
          const postData = {
            token: authToken,
            body: {
              ...valuesToBeSubmitted,
            },
          };

          const response: any = await logDonationTransaction(postData); // Logs all donation transactions in APES' donations DynamoDB table
          const result = response.error ? response.error.data.message : response.data.message; // Contains the success messages or some instructions if an error occured in APES AWS
          setStatus({
            step: Steps.success,
            message: result,
            result: {
              received: +UST_Amount,
              deposited: depositAmount,
              url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
            },
          });
        } else {
          setStatus({
            step: Steps.error,
            message: `The transaction ran but failed`,
          });
        }
  
      }
    } catch (error) {
      console.error(error);
      const errorStatus = createStatusFromError(error);
      setStatus(errorStatus);
    }
  }
  return handleDonate;
}

export default useDonate;
