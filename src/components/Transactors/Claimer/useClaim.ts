import { useConnectedWallet } from "@terra-money/wallet-provider";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { Step } from "services/transaction/types";
import handleTerraError from "helpers/handleTerraError";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import { chainIDs } from "constants/chainIDs";

function useClaim() {
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function claim() {
    try {
      if (!wallet) {
        updateTx({ step: Step.error, message: "Wallet is not connected" });
        return;
      }
      updateTx({ step: Step.submit, message: "Submitting transaction.." });
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
            message: "HALO successfully claimed",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });
          //refetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
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
    }
  }

  //choose sender depending on active wallet
  return claim;
}

export default useClaim;
