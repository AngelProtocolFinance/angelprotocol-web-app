import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import handleTerraError from "helpers/handleTerraError";
import { Values } from "./types";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";
import { chainIDs } from "constants/chainIDs";

export default function useWithdrawHoldings() {
  const { reset } = useFormContext<Values>();
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function withdraw() {
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

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Withdraw successful",
            chainId: wallet.network.chainID as chainIDs,
            txHash: response.result.txhash,
          });

          dispatch(
            terra.util.invalidateTags([
              { type: tags.endowment },
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
      handleTerraError(err, updateTx);
    } finally {
      reset();
    }
  }

  return withdraw;
}
