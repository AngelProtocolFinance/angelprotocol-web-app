import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import useEstimator from "./useEstimator";
import { Values } from "./types";
import Halo from "contracts/Halo";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import { terra } from "services/terra/terra";
import { gov, tags } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "constants/chainIDs";

export default function useCreatePoll() {
  useEstimator();
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const { reset } = useFormContext<Values>();
  const wallet = useConnectedWallet();

  async function createPoll(data: Values) {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }

      updateTx({ step: Step.submit, message: "Submitting transaction.." });

      //recreate tx here with actual form contents
      const contract = new Halo(wallet);
      const tx = await contract.createPoll(
        Number(data.amount),
        data.title,
        data.description,
        data.link,
        undefined,
        true //on submission, snapshot the poll
      );
      const response = await wallet.post(tx);

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          txHash: response.result.txhash,
          chainId: wallet.network.chainID as chainIDs,
        });
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Poll successfully created!",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });

          dispatch(
            terra.util.invalidateTags([{ type: tags.gov, id: gov.polls }])
          );
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
      handleTerraError(err, updateTx);
    } finally {
      reset();
    }
  }

  return createPoll;
}
