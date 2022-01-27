import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import handleTerraError from "helpers/handleTerraError";
import { Values } from "./types";
import { terra } from "services/terra/terra";
import { tags, user } from "services/terra/tags";
import getFinderUrl from "helpers/getFinderUrl";

export default function useVoter() {
  const { reset } = useFormContext<Values>();
  const dispatch = useSetter();
  const handleTxError = useTxErrorHandler();
  const wallet = useConnectedWallet();
  const tx = useEstimator();

  async function voter() {
    // const liquid_split = 100 - Number(data.split);
    try {
      if (!wallet) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Wallet is disconnected" },
          })
        );
        return;
      }

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction..." },
        })
      );

      const response = await wallet.post(tx!);

      dispatch(
        setStage({
          step: Step.broadcast,
          content: {
            message: "Waiting for transaction result",
            url: getFinderUrl(wallet.network.chainID, response.result.txhash),
          },
        })
      );

      if (response.success) {
        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: "Vote is successfully casted",
                url: getFinderUrl(wallet.network.chainID, txInfo.txhash),
              },
            })
          );

          dispatch(
            //invalidate all gov related cache
            terra.util.invalidateTags([
              { type: tags.gov },
              { type: tags.user, id: user.halo_balance },
            ])
          );
        } else {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: getFinderUrl(wallet.network.chainID, txInfo.txhash),
              },
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, handleTxError);
    } finally {
      reset();
    }
  }

  //choose sender depending on active wallet
  return voter;
}
