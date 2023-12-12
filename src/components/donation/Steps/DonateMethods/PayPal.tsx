import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import LoaderRing from "components/LoaderRing";
import Prompt from "components/Prompt";
import { FormStep } from "slices/donation";
import { PAYPAL_CLIENT_ID } from "constants/env";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: PAYPAL_CLIENT_ID,
  commit: true,
  currency: "USD",
  enableFunding: "paylater",
  disableFunding: "card,venmo",
};

type Props = {
  state: FormStep;
};

export default function PayPal(props: Props) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWrapper {...props} />
    </PayPalScriptProvider>
  );
}

function ButtonWrapper({ state }: Props) {
  const [{ isPending }] = usePayPalScriptReducer();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const handleApprove = async () => {
    showModal(Prompt, {
      type: "success",
      headline: "Donation",
      title: "Donation Successful",
      children: (
        <>
          Thank you for your donation to{" "}
          <span className="font-extrabold">{state.recipient.name}</span>!
        </>
      ),
    });
  };

  return (
    <div className="grid place-items-center min-h-[16rem] isolate">
      {isPending && <LoaderRing thickness={10} classes="w-8" />}
      <PayPalButtons
        className="w-full max-w-xs"
        onError={handleError}
        onApprove={handleApprove}
      />
    </div>
  );
}
