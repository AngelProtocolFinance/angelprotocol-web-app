import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import handleTerraError from "helpers/handleTerraError";
import useUSTEstimator from "./useUSTEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";

function useUSTSender() {
  const dispatch = useSetter();
  const { reset } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const tx = useUSTEstimator();
  const handleTxError = useTxErrorHandler();

  //data:Data
  async function terra_sender() {
    try {
      if (!wallet) {
        setStage({
          step: Step.error,
          content: { message: "Wallet is disconnected" },
        });
        return;
      }
      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction.." },
        })
      );
      const response = await wallet.post(tx!);

      if (response.success) {
        dispatch(
          setStage({
            step: Step.broadcast,
            content: {
              message: "Transaction submitted, waiting for transaction result",
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
                message: "Thank you for your donation!",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
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
  return terra_sender;
}

export default useUSTSender;
