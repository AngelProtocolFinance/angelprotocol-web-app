import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { Step } from "services/transaction/types";
import { chainIDs } from "constants/chainIDs";
import { useSetter } from "store/accessors";
import handleTerraError from "helpers/handleTerraError";

export default function useEndPoll(poll_id?: string) {
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { updateTx } = useTxUpdator();

  async function endPoll() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      if (!poll_id) {
        updateTx({ step: Step.error, message: "Poll has invalid id" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction..." });

      const contract = new Halo(wallet);
      const tx = await contract.createEndPollTx(poll_id);
      const response = await wallet.post(tx);

      if (response.success) {
        updateTx({
          step: Step.broadcast,
          message: "Waiting for transaction result",
          chainId: wallet.network.chainID as chainIDs,
          txHash: response.result.txhash,
        });

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          updateTx({
            step: Step.success,
            message: "Poll successfully ended",
            chainId: wallet.network.chainID as chainIDs,
            txHash: response.result.txhash,
          });

          dispatch(
            terra.util.invalidateTags([
              //invalidate whole gov cache
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
      handleTerraError(err, updateTx);
    }
  }

  return endPoll;
}
