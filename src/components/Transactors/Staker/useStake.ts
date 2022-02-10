import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import { Step } from "services/transaction/types";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";
import useTxUpdator from "services/transaction/updators";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { chainIDs } from "constants/chainIDs";
import { Values } from "./types";
import useEstimator from "./useEstimator";

function useStake() {
  const { watch } = useFormContext<Values>();
  const dispatch = useSetter();
  const { updateTx } = useTxUpdator();
  const wallet = useConnectedWallet();
  const tx = useEstimator();
  const is_stake = watch("is_stake");

  async function staker() {
    if (!wallet) {
      updateTx({ step: Step.error, message: "Wallet is not connected" });
      return;
    }
    try {
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
            message: is_stake
              ? "Staking successfull!"
              : "HALO successfully withdrawn",
            txHash: txInfo.txhash,
            chainId: wallet.network.chainID as chainIDs,
          });

          //invalidate cache to fetch new data
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
      handleTerraError(err, updateTx);
    }
  }

  return staker;
}

export default useStake;
