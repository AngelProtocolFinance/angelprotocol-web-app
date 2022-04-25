import { ReceiptStage } from "@types-slice/transaction";
import { useState } from "react";
import { useRequestReceiptMutation } from "services/apes/donations";
import useTxUpdator from "slices/transaction/updators";
import { useGetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { ReceipterValues } from "./Receipter";

export default function useReceiptForm() {
  const { updateTx } = useTxUpdator();
  const [processing, setProcessing] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const { stage } = useGetter((state) => state.transaction);
  const { showModal } = useSetModal();

  const { chainId, txHash } = stage as ReceiptStage; //check made on Receipter
  const fromDonor = stage.step === "form" || !chainId || !txHash;

  const submitHandler = async (data: ReceipterValues) => {
    setProcessing(true);
    const response: any = await requestReceipt(data);
    setProcessing(false);

    if (response.data) {
      updateTx({
        step: "success",
        message: `Receipt request ${
          fromDonor ? "changes were applied" : "successfully sent"
        }, Your receipt will be sent to your email address`,
        txHash,
        chainId,
      });
      fromDonor && showModal(TransactionPrompt, {});
    } else {
      updateTx({
        step: "error",
        message: `Error processing your receipt ${fromDonor && "update"}`,
        txHash,
        chainId,
      });
      fromDonor && showModal(TransactionPrompt, {});
    }
  };

  return { submitHandler, processing };
}
