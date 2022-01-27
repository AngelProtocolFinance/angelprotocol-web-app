import { useState } from "react";
import { useRequestReceiptMutation } from "services/apes/donations";
import { Step, ReceiptStage } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useGetter } from "store/accessors";
import { Values } from "./types";

export default function useReceiptForm() {
  const { updateTx } = useTxUpdator();
  const [processing, setProcessing] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const { stage } = useGetter((state) => state.transaction);

  const {
    chainId,
    txHash,
    details: { receiver, to },
  } = stage as ReceiptStage; //check made on Receipter

  const endowment_addr = receiver;

  const submitHandler = async (body: Values) => {
    const key = to === "charity" ? "charityId" : "fundId";
    const receipt = { ...body, [key]: endowment_addr };
    setProcessing(true);
    const response: any = await requestReceipt({
      receipt,
    });
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
