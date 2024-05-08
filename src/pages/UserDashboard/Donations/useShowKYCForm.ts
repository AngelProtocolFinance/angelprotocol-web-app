import { type FormValues, useKYCForm } from "components/KYCForm";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useRequestReceiptMutation } from "services/apes";

export default function useShowKYCForm() {
  const [submitRequest] = useRequestReceiptMutation();
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const showKYC = useKYCForm();

  const submitKYC = async (data: FormValues, txId: string) => {
    const {
      name,
      address,
      kycEmail: email,
      city,
      state,
      usState,
      postalCode,
      country,
    } = data;

    try {
      await submitRequest({
        fullName: `${name.first} ${name.last}`,
        kycEmail: email,
        streetAddress: `${address.street} ${address.complement}`,
        city,
        state: usState.value || state,
        zipCode: postalCode,
        country: country.name,
        transactionId: txId,
      }).unwrap();

      showModal(Prompt, {
        type: "success",
        headline: "Get Receipt",
        title: "Tax Receipt Sent",
        children:
          "Your tax receipt has been sent to the email address provided",
      });
    } catch (err) {
      handleError(err, { context: "requesting receipt" });
    }
  };

  return (txId: string) =>
    showKYC({
      txHash: txId,
      classes: "grid gap-5",
      onSubmit: (fv) => submitKYC(fv, txId),
    });
}
