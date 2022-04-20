import { useModalContext } from "components/ModalContext/ModalContext";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
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
  const { showModal } = useModalContext();

  const { chainId, txHash } = stage as ReceiptStage; //check made on Receipter
  const fromDonor = stage.step === Step.form || !chainId || !txHash;

  const submitHandler = async (data: Values) => {
    setProcessing(true);
    const response: any = await requestReceipt(data);
    setProcessing(false);

    if (response.data) {
      updateTx({
        step: Step.success,
        message: `Receipt request ${
          fromDonor ? "changes were applied" : "successfully sent"
        }, Your receipt will be sent to your email address`,
        txHash,
        chainId,
      });
      fromDonor && showModal(TransactionPrompt, {});
    } else {
      updateTx({
        step: Step.error,
        message: `Error processing your receipt ${fromDonor && "update"}`,
        txHash,
        chainId,
      });
      fromDonor && showModal(TransactionPrompt, {});
    }
  };

  return { submitHandler, processing };
}
