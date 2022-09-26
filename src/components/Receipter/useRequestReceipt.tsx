import { useFormContext } from "react-hook-form";
import { ReceipterValues as RV } from "./types";
import { StageUpdater } from "slices/transaction/types";
import { useRequestReceiptMutation } from "services/apes";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";

export default function useRequestReceipt() {
  const dispatch = useSetter();
  const {
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<RV>();
  const [submitRequest] = useRequestReceiptMutation();
  const { wallet } = useGetWallet();

  const updateStage: StageUpdater = (update) => {
    dispatch(setStage(update));
  };

  const requestReceipt = async (data: RV) => {
    const { transactionId, ...kycData } = data;
    const prevTxDetails = getValues("prevTx");
    if (!prevTxDetails) {
      updateStage({ step: "initial", kycData: kycData });
      return;
    }
    const { txHash } = prevTxDetails;
    updateStage({ step: "submit", message: "Submitting receipt request" });
    const response = await submitRequest(data);

    if ("error" in response) {
      updateStage({
        step: "error",
        message: `Error processing your receipt`,
        //TODO: include Chain in PrevTxDetails
        //can't show prev tx link with just txHash and chainId, needs Chain
      });
      return;
    }
    updateStage({
      step: "success",
      message: `Your receipt will be sent to your email.`,
      txHash,
      chain: wallet!.chain,
    });
  };

  return {
    requestReceipt,
    isSubmitting,
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
