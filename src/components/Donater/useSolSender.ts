import { useFormContext } from "react-hook-form";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useGetPhantom } from "wallets/Phantom";
import { chains } from "contracts/types";
import { Values } from "./types";
import useSolEstimator from "./useSolEstimator";
import handleSolError from "./handleSolError";
import useErrorHandler from "./useErrorHandler";
import { useSetter } from "store/accessors";
import { setStage } from "services/donation/donationSlice";
import { Step } from "services/donation/types";

export default function useSolSender() {
  const dispatch = useSetter();
  const { setValue } = useFormContext<Values>();
  const wallet = useGetPhantom();
  const tx = useSolEstimator();
  const handleError = useErrorHandler();

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
      const connection = new Connection(clusterApiUrl(chains.sol_dev));

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
      handleSolError(error, handleError);
    } finally {
      setValue("amount", "");
    }
  }
  return sender;
}
