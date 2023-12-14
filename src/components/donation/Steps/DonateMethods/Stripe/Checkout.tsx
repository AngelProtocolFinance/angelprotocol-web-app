import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import LoadText from "components/LoadText";
import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const { handleError } = useErrorContext();

  const [isLoading, setLoading] = useState(true);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${appRoutes.donate_fiat_thanks}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      handleError(error.message);
    } else {
      handleError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setLoading(false)}
      />
      {isLoading ? (
        <LoaderRing thickness={10} classes="w-12 justify-self-center" />
      ) : (
        <button
          className="btn-orange btn-donate w-1/2 justify-self-center"
          disabled={!stripe || !elements}
          type="submit"
        >
          <LoadText text="Processing..." isLoading={isLoading}>
            Pay Now
          </LoadText>
        </button>
      )}
    </form>
  );
}
