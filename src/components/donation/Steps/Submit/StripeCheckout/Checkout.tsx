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
import Loader from "../Loader";

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const { handleError } = useErrorContext();

  const [isLoading, setLoading] = useState(true);
  // There is a small delay before Stripe Payment Element starts to load.
  // To avoid just showing the "Back" button with nothing else on screen,
  // we first show a Loader ring and when the Stripe Element starts loading
  // (it has an inherent loading animation) that's when we hide the loader ring
  // and start showing the "Back" button
  const [showLoader, setShowLoader] = useState(true);
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
        return_url: `${window.location.origin}${appRoutes.stripe_payment_status}`,
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
    <form onSubmit={handleSubmit} className="contents">
      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setLoading(false)}
        onLoadError={(error) => {
          setLoading(false);
          handleError(error, GENERIC_ERROR_MESSAGE);
        }}
        onLoaderStart={() => setShowLoader(false)}
      />
      {showLoader ? (
        <Loader />
      ) : (
        <button
          className="btn-orange btn-donate w-full"
          disabled={!stripe || !elements || isSubmitting || isLoading}
          type="submit"
        >
          <LoadText text="Processing..." isLoading={isSubmitting}>
            Pay Now
          </LoadText>
        </button>
      )}
    </form>
  );
}
