import { CreateTxOptions } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import handleTerraError from "helpers/handleTerraError";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "contracts/types";

export default function useTransact(
  tx: CreateTxOptions,
  successMessage: string
) {
  const dispatch = useSetter();
  const { reset } = useFormContext();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();

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
            message: successMessage,
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });

          dispatch(
            //invalidate all gov related cache
            terra.util.invalidateTags([
              { type: tags.gov },
              { type: tags.user, id: user.halo_balance },
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

  return vote;
}
