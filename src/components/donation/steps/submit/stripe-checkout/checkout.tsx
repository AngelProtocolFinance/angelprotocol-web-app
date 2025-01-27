import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ErrorTrigger } from "components/error";
import LoadText from "components/load-text";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { appRoutes } from "constants/routes";
import { errorPrompt } from "helpers/error-prompt";
import { type FormEventHandler, useState } from "react";
import type { StripeCheckoutStep } from "../../types";
import Loader from "../loader";

type Status = "init" | "loading" | "ready" | "submitting" | { error: unknown };

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout(props: StripeCheckoutStep) {
  const [prompt, setPrompt] = useState<IPromptV2>();
  const stripe = useStripe();
  const elements = useElements();

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
      props.init.source === "bg-widget"
        ? `${window.location.origin}${appRoutes.donate_widget}/donate-thanks`
        : `${window.location.origin}/donate-thanks`;

    const stripeConfirmParams = {
      elements,
      confirmParams: {
        return_url,
      },
    };

    const { error } =
      props.details.frequency === "subscription"
        ? await stripe.confirmSetup(stripeConfirmParams)
        : await stripe.confirmPayment(stripeConfirmParams);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setPrompt(errorPrompt(error.message, "parsed"));
    } else {
      setPrompt(errorPrompt(error, { context: "processing payment" }));
    }

    setStatus("ready");
  };

  if (typeof status === "object") {
    return <ErrorTrigger error={status.error} />;
  }

  return (
    <form
      data-testid="stripe-checkout-form"
      onSubmit={handleSubmit}
      className="contents"
    >
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: {
            billingDetails: {
              name: `${props.donor.firstName} ${props.donor.lastName}`,
              email: props.donor.email,
              /** we only collect address when donor wants to opt for uk gift aid */
              ...(props.donor.ukTaxResident && {
                address: {
                  line1: props.donor.streetAddress,
                  postal_code: props.donor.zipCode,
                  country: "United Kingdom",
                },
              }),
            },
          },
        }}
        onReady={() => setStatus("ready")}
        onLoadError={(error) => setStatus({ error })}
        onLoaderStart={() => setStatus("loading")}
      />
      {status === "init" ? (
        <Loader />
      ) : (
        <button
          className="btn-blue btn-donate bg-(--accent-primary) hover:enabled:bg-(--accent-primary) w-full mt-6"
          disabled={!stripe || !elements || status !== "ready"}
          type="submit"
        >
          <LoadText text="Processing..." isLoading={status === "submitting"}>
            Donate Now
          </LoadText>
        </button>
      )}
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </form>
  );
}
