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

  const submitHandler = async (body: Values) => {
    const receipt = {
      transactionId: body.transactionId,
      body: {
        fullName: body.fullName,
        email: body.email,
        streetAddress: body.streetAddress,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
      },
    };
    setProcessing(true);
    const response: any = await requestReceipt({ receipt });
    setProcessing(false);
    if (response.data) {
      dispatch(
        setStage({
          step: Step.success,
          content: {
            url: stage.content?.url,
            message:
              "Receipt request successfully sent. Your receipt will be sent to your email address.",
          },
        })
      );
    } else {
      dispatch(
        setStage({
          step: Step.error,
          content: {
            url: stage.content?.url,
            message:
              response?.error.data.message || "Error processing your receipt.",
          },
        })
      );
    }
  };

  return { submitHandler, processing };
}
