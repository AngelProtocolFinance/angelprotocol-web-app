import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import LoadText from "components/LoadText";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import ErrorTrigger from "errors/ErrorTrigger";
import { FormEventHandler, useState } from "react";
import { DonationSource } from "types/lists";
import Loader from "../Loader";

type Props = {
  source: DonationSource;
};

type Status = "init" | "loading" | "ready" | "submitting" | { error: unknown };

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ source }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { handleError } = useErrorContext();

  // There is a small delay before Stripe Payment Element starts to load.
  // To avoid just showing the "Back" button with nothing else on screen,
  // we first show a Loader ring and when the Stripe Element starts loading
  // (it has an inherent loading animation) that's when we hide the loader ring
  // and start showing the "Back" button
  const [status, setStatus] = useState<Status>("init");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setStatus("submitting");

    const return_url =
      source === "bg-widget"
        ? `${window.location.origin}${appRoutes.donate_widget}/${donateWidgetRoutes.stripe_payment_status}`
        : `${window.location.origin}${appRoutes.stripe_payment_status}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url,
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
      handleError(error);
    }

    setStatus("ready");
  };

  if (typeof status === "object") {
    return <ErrorTrigger error={status.error} />;
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <PaymentElement
        options={{ layout: "tabs" }}
        onReady={() => setStatus("ready")}
        onLoadError={(error) => setStatus({ error })}
        onLoaderStart={() => setStatus("loading")}
      />
      {status === "init" ? (
        <Loader />
      ) : (
        <button
          className="btn-blue btn-donate w-full mt-6"
          disabled={!stripe || !elements || status !== "ready"}
          type="submit"
        >
          <LoadText text="Processing..." isLoading={status === "submitting"}>
            Donate Now
          </LoadText>
        </button>
      )}
    </form>
  );
}
