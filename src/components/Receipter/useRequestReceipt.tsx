import { useFormContext } from "react-hook-form";
import { ReceipterValues as RV } from "./types";
import { useRequestReceiptMutation } from "services/apes/donations";
import { useModalContext } from "contexts/ModalContext";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import useTxUpdator from "slices/transaction/updators";

export default function useRequestReceipt() {
  const { updateTx } = useTxUpdator();
  const {
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<RV>();
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();

  const requestReceipt = async (data: RV) => {
    const { transactionId, ...kycData } = data;
    const prevTxDetails = getValues("prevTx");
    if (!prevTxDetails) {
      updateTx({ step: "initial", kycData: kycData });
      return;
    }
    const { chainId, txHash } = prevTxDetails;
    updateTx({ step: "submit", message: "Submitting receipt request" });
    showModal(TransactionPrompt, {});
    const response = await submitRequest(data);

    if ("error" in response) {
      updateTx({
        step: "error",
        message: `Error processing your receipt`,
        txHash,
        chainId,
      });
      return;
    }
    updateTx({
      step: "success",
      message: `Your receipt will be sent to your email.`,
      txHash,
      chainId,
    });
  };

  return {
    requestReceipt,
    isSubmitting,
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
