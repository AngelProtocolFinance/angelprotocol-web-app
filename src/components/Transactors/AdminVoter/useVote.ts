import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import handleTerraError from "helpers/handleTerraError";
import { Values } from "./types";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "constants/chainIDs";

export default function useVote() {
  const { reset } = useFormContext<Values>();
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function vote() {
    // const liquid_split = 100 - Number(data.split);
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction..." });
      const response = await wallet.post(tx!);

      updateTx({
        step: Step.broadcast,
        message: "Waiting for transaction result",
        txHash: response.result.txhash,
        chainId: wallet.network.chainID as chainIDs,
      });

      if (response.success) {
        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Vote is successfully casted",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });

          dispatch(
            //invalidate all gov related cache
            terra.util.invalidateTags([
              { type: tags.admin, id: admin.proposal },
              { type: tags.admin, id: admin.votes },
            ])
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

  return vote;
}
