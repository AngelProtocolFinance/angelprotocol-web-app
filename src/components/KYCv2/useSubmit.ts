import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "./types";
import { useRequestReceiptMutation } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { useSetter } from "store/accessors";

export default function useSubmit(props: Props) {
  const {
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FV>();
  const dispatch = useSetter();
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();

  /**
   * 
   * @param data   fullName: string; // "John Doe"
  email: string; // "john@doe.email.com"
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string; //2000
  country: string;
  consent_tax: boolean;
  consent_marketing: boolean;
   * @returns 
   */

  const submit = async (data: FV) => {
    const { name, address, email, city, state, postalCode, country } = data;
    if (props.type === "post-donation") {
      const response = await submitRequest({
        fullName: `${name.first} ${name.last}`,
        email,
        streetAddress: `${address.street} ${address.complement}`,
        city,
        state,
        zipCode: postalCode,
        country,
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
      showModal(Popup, {
        message:
          "Receipt request submitted and will be sent to the email you provided",
      });
      return;
    }
  };

  return {
    submit,
    isSubmitting,
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
