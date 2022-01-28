import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import handleTerraError from "helpers/handleTerraError";
import { Values } from "./types";
import { terra } from "services/terra/terra";
import { lbp, tags, user } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "contracts/types";

export default function useSwap() {
  const { reset, getValues } = useFormContext<Values>();
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function swap() {
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
        chainId: wallet.network.chainID as chainIDs,
        txHash: response.result.txhash,
      });

      if (response.success) {
        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        const is_buy = getValues("is_buy");
        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: is_buy
              ? "Successfully swapped UST for HALO"
              : "Successfully swapped HALO for UST",
            chainId: wallet.network.chainID as chainIDs,
            txHash: response.result.txhash,
          });

          dispatch(
            terra.util.invalidateTags([
              { type: tags.lbp, id: lbp.pool },
              { type: tags.user, id: user.halo_balance },
              { type: tags.user, id: user.terra_balance },
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
      console.error(err);
      handleTerraError(err, updateTx);
    } finally {
      reset();
    }
  }
  return swap;
}
