import { useState } from "react";
import { useRequestReceiptMutation } from "services/apes/donations";
import { Step } from "services/transaction/types";
import { setStage } from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import { Values } from "./types";

export default function useReceiptForm() {
  const dispatch = useSetter();
  const [processing, setProcessing] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const { stage } = useGetter((state) => state.transaction);
  const endowment_addr = stage.content?.tx?.receiver;
  const to = stage.content?.tx?.to;

  const submitHandler = async (body: Values) => {
    const key = to === "charity" ? "charityId" : "fundId";
    const receipt = { ...body, [key]: endowment_addr };
    setProcessing(true);
    const response: any = await requestReceipt({
      receipt,
    });
    setProcessing(false);
    if (response.data) {
      dispatch(
        setStage({
          step: Step.success,
          content: {
            url: stage.content?.url,
            message:
              response?.data?.message ||
              "Receipt request successfully sent, Your receipt will be sent to your email address",
          },
        })
      );
    } else {
      dispatch(
        setStage({
          step: Step.error,
          content: {
            message: "Error processing your receipt,",
          },
        })
      );
    }
  };

  return { submitHandler, processing };
}
