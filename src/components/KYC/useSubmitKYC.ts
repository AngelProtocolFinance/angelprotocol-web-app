import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "./types";
import { useRequestReceiptMutation } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import useDonater from "components/Transactors/Donater/useDonater";

export default function useSubmitKYC(props: Props) {
  const {
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FV>();
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();
  const showDonater = useDonater();

  const submit = async (data: FV) => {
    if (props.type === "post-donation") {
      const response = await submitRequest({
        ...data,
        transactionId: props.txHash,
      });

      if ("error" in response) {
        showModal(Popup, {
          message: "Failed to send receipt request. Please try again later.",
        });
        return;
      }
      showModal(Popup, {
        message:
          "Receipt request submitted and will be sent to the email you provided",
      });
      return;
    }

    //show donater and pass KYC data, atm donation is only tx that may require KYC data
    showDonater(props.donaterProps);
  };

  return {
    submit,
    isSubmitting,
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
