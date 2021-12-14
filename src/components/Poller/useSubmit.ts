import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import handleTerraError from "helpers/handleTerraError";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { Values } from "./types";
import Halo from "contracts/Halo";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { terra } from "services/terra/terra";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import { gov, tags } from "services/terra/tags";

export default function useSubmit() {
  useEstimator();
  const dispatch = useSetter();
  const handleTxError = useTxErrorHandler();
  const { reset } = useFormContext<Values>();
  const wallet = useConnectedWallet();

  async function sender(data: Values) {
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
          content: {
            message: "Submitting transaction...",
          },
        })
      );

      //recreate tx here with actual form contents
      const contract = new Halo(wallet);
      const tx = await contract.createPoll(
        Number(data.amount),
        data.title,
        data.description,
        data.link
      );
      const response = await wallet.post(tx);

      if (response.success) {
        dispatch(
          setStage({
            step: Step.broadcast,
            content: {
              message: "Waiting for transaction result",
              url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
            },
          })
        );

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: "Poll successfully created!",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
          dispatch(
            terra.util.invalidateTags([{ type: tags.gov, id: gov.polls }])
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
    } finally {
      reset();
    }
  }

  return sender;
}
