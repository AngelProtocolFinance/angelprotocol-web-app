import { useState } from "react";
import { useRequestReceiptMutation } from "services/apes/donations";
import { Step, SuccessStage } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useGetter } from "store/accessors";
import { Values } from "./types";

export default function useReceiptForm() {
  const { updateTx } = useTxUpdator();
  const [processing, setProcessing] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const { stage } = useGetter((state) => state.transaction);

  const { chainId, txHash } = stage as SuccessStage; //check made on Receipter

  const submitHandler = async (data: Values) => {
    setProcessing(true);
    const response: any = await requestReceipt(data);
    setProcessing(false);
    if (response.data) {
      updateTx({
        step: Step.success,
        message:
          "Receipt request successfully sent, Your receipt will be sent to your email address",
        txHash,
        chainId,
      });
    } else {
      console.error(response);
      updateTx({
        step: Step.error,
        message: "Error processing your receipt",
        txHash,
        chainId,
      });
    }
  };

  return { submitHandler, processing };
}
