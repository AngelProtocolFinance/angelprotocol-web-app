import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import useTxUpdator from "services/transaction/updators";
import { Step } from "services/transaction/types";
import { Values } from "components/Transactors/Donater/types";
import Contract from "contracts/Contract";
import { chainIDs } from "contracts/types";
import useUSTEstimator from "./useUSTEstimator";
import useDonationLogger from "./useDonationLogger";
import { denoms } from "constants/currency";

function useUSTSender() {
  const { reset, getValues } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();
  const logDonation = useDonationLogger();
  const tx = useUSTEstimator();

  //data:Data
  async function terra_sender(data: Values) {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction.." });
      const response = await wallet.post(tx!);
      const chainId = wallet.network.chainID as chainIDs;
      if (response.success) {
        updateTx({ step: Step.submit, message: "Saving donation details" });

        const receiver = getValues("receiver");
        if (typeof receiver !== "undefined") {
          const logResponse = await logDonation(
            response.result.txhash,
            chainId,
            data.amount,
            denoms.uusd,
            data.split_liq,
            receiver
          );

          if ("error" in logResponse) {
            //note: how can support prove that valid tx ticket belongs to the email sender?
            updateTx({
              step: Step.error,
              message:
                "Failed to log your donation for receipt purposes. Kindly send an email to support@angelprotocol.io",
              txHash: response.result.txhash,
              chainId,
            });
            return;
          }
        }

        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction details",
          txHash: response.result.txhash,
          chainId,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId,
            isReceiptEnabled: true,
          });
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId,
          });
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, updateTx);
    } finally {
      reset();
    }
  }
  return terra_sender;
}

export default useUSTSender;
