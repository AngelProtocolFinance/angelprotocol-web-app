import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import useTxUpdator from "services/transaction/updators";
import { Step } from "services/transaction/types";
import { Values } from "components/Transactors/Donater/types";
import Contract from "contracts/Contract";
import { chainIDs } from "contracts/types";
import useUSTEstimator from "./useUSTEstimator";
import { denoms } from "constants/currency";

function useUSTSender() {
  const { reset, getValues } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();
  const tx = useUSTEstimator();

  //data:Data
  async function terra_sender() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction.." });
      const response = await wallet.post(tx!);

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          txHash: response.result.txhash,
          chainId: wallet.network.chainID as chainIDs,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        const receiver = getValues("receiver");
        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Thank you for your donation",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
            details:
              typeof receiver === "undefined"
                ? //if details is undefined, no request option is shown at the end of tx
                  undefined
                : {
                    amount: getValues("amount"),
                    split_liq: getValues("split_liq"),
                    //undefined is eliminated
                    receiver: receiver as string | number,
                    denom: denoms.uusd,
                  },
          });
          //TODO:invalidate tags here
        } else {
          updateTx({
            step: Step.error,
            message: "Transaction failed",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
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
