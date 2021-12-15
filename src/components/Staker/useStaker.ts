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
import { gov, tags, user } from "services/terra/tags";

function useStaker() {
  const { watch } = useFormContext<Values>();
  const dispatch = useSetter();
  const handleTxError = useTxErrorHandler();
  const wallet = useConnectedWallet();
  const tx = useEstimator();
  const is_stake = watch("is_stake");

  async function staker() {
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
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
          },
        })
      );

      if (response.success) {
        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          //refetching staker here isn't good since state isn't yet reflected in the backend
          //refetch will only get the old data
          // refetch_staker();
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: is_stake
                  ? "Staking successfull!"
                  : "HALO successfully withdrawn",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
          //refetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
              { type: tags.user, id: user.halo_balance },
            ])
          );
        } else {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, handleTxError);
    }
  }

  //choose sender depending on active wallet
  return staker;
}

export default useStaker;
