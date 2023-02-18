import Popup from "@/components/Popup";
import Prompt from "@/components/Prompt";
import { setKYC } from "@/slices/donation";
import { useSetter } from "@/store/accessors";
import { useModalContext } from "@ap/contexts";
import { useRequestReceiptMutation } from "@ap/services/apes";
import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";

export default function useSubmit(props: Props) {
  const { reset } = useFormContext<FV>();
  const dispatch = useSetter();
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();

  const submit = async (data: FV) => {
    const { name, address, email, city, state, usState, postalCode, country } =
      data;
    if (props.type === "post-donation") {
      const response = await submitRequest({
        fullName: `${name.first} ${name.last}`,
        email,
        streetAddress: `${address.street} ${address.complement}`,
        city,
        state: usState.value || state,
        zipCode: postalCode,
        country: country.name,
        consent_tax: true,
        consent_marketing: true,
        transactionId: props.txHash,
      });

      if ("error" in response) {
        showModal(Popup, {
          message: "Failed to send receipt request. Please try again later.",
        });
        return;
      }
      showModal(Prompt, {
        type: "success",
        headline: "Get Receipt",
        title: "Tax Receipt Sent",
        children:
          "Your tax receipt has been sent to the email address provided",
      });
      return;
    }

    //on-donation receipt
    dispatch(setKYC(data));
    reset();
  };

  return submit;
}
