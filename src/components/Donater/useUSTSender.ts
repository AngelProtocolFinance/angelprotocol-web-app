import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import createAuthToken from "helpers/createAuthToken";
import handleTerraError from "helpers/handleTerraError";
import useUSTEstimator from "./useUSTEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { useLogDonationTransactionMutation } from "services/apes/donations";
import { UserTypes } from "services/user/types";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import getFinderUrl from "helpers/getFinderUrl";

function useUSTSender() {
  const dispatch = useSetter();
  const { reset, getValues } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const tx = useUSTEstimator();
  const handleTxError = useTxErrorHandler();
  const [logDonationTransaction] = useLogDonationTransactionMutation();

  //data:Data
  async function terra_sender() {
    try {
      if (!wallet) {
        setStage({
          step: Step.error,
          content: { message: "Wallet is disconnected" },
        });
        return;
      }
      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction.." },
        })
      );
      const response = await wallet.post(tx!);

      if (response.success) {
        dispatch(
          setStage({
            step: Step.broadcast,
            content: {
              message: "Transaction submitted, waiting for transaction result",
              url: getFinderUrl(wallet.network.chainID, response.result.txhash),
            },
          })
        );

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          // After confirming that the donation TX is a success, record the TX data in our APES Donations DB
          const authToken = createAuthToken(UserTypes.WEB_APP);
          const key = getValues("to") === "charity" ? "charityId" : "fundId";
          const donationPostData = {
            token: authToken,
            body: {
              amount: Number(getValues("amount")),
              splitLiq: getValues("split_liq"),
              transactionDate: new Date().toISOString(),
              transactionId: txInfo.txhash,
              chainId: wallet?.network.chainID, //e.g "columbus-5", "bombay-12" or one of chainIDs enum values
              [key]: getValues("receiver"),
              denomination: "UST",
            },
          };
          const donationPostResponse: any = await logDonationTransaction(
            donationPostData
          );

          if (donationPostResponse.data) {
            // If donation TX database recording is a success
            dispatch(
              setStage({
                step: Step.success,
                content: {
                  message:
                    donationPostResponse?.data.message ||
                    "Thank you for your donation!",
                  tx: {
                    txHash: txInfo.txhash,
                    amount: getValues("amount"),
                    to: getValues("to"),
                    receiver: getValues("receiver"),
                  },
                  url: getFinderUrl(wallet.network.chainID, txInfo.txhash),
                },
              })
            );
            reset();
          } else {
            // Donation TX database recording failed
            dispatch(
              setStage({
                step: Step.error,
                content: {
                  message:
                    donationPostResponse?.error.data.message ||
                    "Transaction was successful but it's not recorded in our database.",
                  url: getFinderUrl(wallet.network.chainID, txInfo.txhash),
                },
              })
            );
          }
        } else {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: getFinderUrl(wallet.network.chainID, txInfo.txhash),
              },
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, handleTxError);
    } finally {
      reset();
    }
  }
  return terra_sender;
}

export default useUSTSender;
