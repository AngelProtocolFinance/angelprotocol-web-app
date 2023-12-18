import { useRequestReceiptMutation } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { FormValues, useKYC } from "components/KYC";
import Prompt from "components/Prompt";

export default function useShowKYCForm() {
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();
  const showKYC = useKYC();

  const submitKYC = async (data: FormValues, txId: string) => {
    const { name, address, email, city, state, usState, postalCode, country } =
      data;

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
      transactionId: txId,
    });

    if ("error" in response) {
      return showModal(Prompt, {
        type: "error",
        headline: "Send Receipt",
        title: "Error Sending Tax Receipt",
        children: "Failed to send receipt request. Please try again later.",
      });
    }
    return showModal(Prompt, {
      type: "success",
      headline: "Get Receipt",
      title: "Tax Receipt Sent",
      children: "Your tax receipt has been sent to the email address provided",
    });
  };

  return (txId: string) =>
    showKYC({
      type: "post-donation",
      txHash: txId,
      classes: "grid gap-5",
      onSubmit: (fv) => submitKYC(fv, txId),
    });
}
