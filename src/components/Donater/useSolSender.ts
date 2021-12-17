import { useFormContext } from "react-hook-form";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useGetPhantom } from "wallets/Phantom";
import { chainIDs } from "contracts/types";
import { Values } from "./types";
import useSolEstimator from "./useSolEstimator";
import handleSolError from "./handleSolError";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";

export default function useSolSender() {
  const dispatch = useSetter();
  const { setValue } = useFormContext<Values>();
  const wallet = useGetPhantom();
  const tx = useSolEstimator();
  const handleTxError = useTxErrorHandler();

  async function sender(data: Values) {
    try {
      if (!wallet) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Solana wallet is not connected" },
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
      const signed_tx = await wallet.provider.signTransaction(tx);
      const connection = new Connection(clusterApiUrl(chainIDs.sol_dev));
      dispatch(
        setStage({
          step: Step.broadcast,
          content: { message: "Transaction submitted, waiting for results." },
        })
      );
      const signature = await connection.sendRawTransaction(
        signed_tx.serialize()
      );
      dispatch(
        setStage({
          step: Step.success,
          content: {
            message: "Thank you for your donation!",
            url: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
          },
        })
      );
    } catch (error) {
      handleSolError(error, handleTxError);
    } finally {
      setValue("amount", "");
    }
  }
  return sender;
}
