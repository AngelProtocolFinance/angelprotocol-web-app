import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEventHandler, useState } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import LoadText from "components/LoadText";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ onBack }: { onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { handleError } = useErrorContext();

  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setSubmitting(true);

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

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-8">
      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setLoading(false)}
        onLoadError={(error) => {
          setLoading(false);
          handleError(error, GENERIC_ERROR_MESSAGE);
        }}
      />

      {isLoading ? (
        <button
          className="btn-outline-filled btn-donate w-1/2 mt-auto"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-5 w-full mt-auto">
          <button
            className="btn-outline-filled btn-donate"
            onClick={onBack}
            type="button"
          >
            Back
          </button>
          <button
            className="btn-orange btn-donate"
            disabled={!stripe || !elements || isSubmitting}
            type="submit"
          >
            <LoadText text="Processing..." isLoading={isSubmitting}>
              Pay Now
            </LoadText>
          </button>
        </div>
      )}
    </form>
  );
}