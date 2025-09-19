import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ErrorTrigger } from "components/error";
import { LoadText } from "components/load-text";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { appRoutes } from "constants/routes";
import { error_prompt } from "helpers/error-prompt";
import { type FormEventHandler, useState } from "react";
import type { StripeCheckoutStep } from "../../types";
import Loader from "../loader";

type Status = "init" | "loading" | "ready" | "submitting" | { error: unknown };

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout(props: StripeCheckoutStep) {
  const [complete, set_complete] = useState(false);
  const [prompt, set_prompt] = useState<IPromptV2>();
  const stripe = useStripe();
  const elements = useElements();

  // There is a small delay before Stripe Payment Element starts to load.
  // To avoid just showing the "Back" button with nothing else on screen,
  // we first show a Loader ring and when the Stripe Element starts loading
  // (it has an inherent loading animation) that's when we hide the loader ring
  // and start showing the "Back" button
  const [status, set_status] = useState<Status>("init");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    set_status("submitting");

    const encoded_name = encodeURIComponent(props.init.recipient.name);
    const search = `?name=${encoded_name}&id=${props.init.recipient.id}`;
    const return_url =
      props.init.source === "bg-widget"
        ? `${window.location.origin}${appRoutes.donate_widget}/donate-thanks${search}`
        : `${window.location.origin}/donate-thanks${search}`;

    const stripe_confirm_params = {
      elements,
      confirmParams: {
        return_url,
      },
    };

    const { error } =
      props.details.frequency === "recurring"
        ? await stripe.confirmSetup(stripe_confirm_params)
        : await stripe.confirmPayment(stripe_confirm_params);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      set_prompt(error_prompt(error.message, "parsed"));
    } else {
      set_prompt(error_prompt(error, { context: "processing payment" }));
    }

    set_status("ready");
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
        className="mt-4"
        options={{
          layout: "tabs",
          defaultValues: {
            billingDetails: {
              name: `${props.donor.first_name} ${props.donor.last_name}`,
              email: props.donor.email,
              /** we only collect address when donor wants to opt for uk gift aid */
              ...(props.donor.address && {
                address: {
                  line1: props.donor.address.street,
                  postal_code: props.donor.address.zip_code,
                  country: "United Kingdom",
                },
              }),
            },
          },
        }}
        onReady={() => set_status("ready")}
        onLoadError={(error) => set_status({ error })}
        onLoaderStart={() => set_status("loading")}
        onChange={(x) => set_complete(x.complete)}
      />
      {status === "init" ? (
        <Loader />
      ) : (
        <button
          className="btn btn-blue btn-donate enabled:bg-(--accent-primary) hover:enabled:bg-(--accent-primary) w-full mt-6"
          disabled={!stripe || !elements || status !== "ready" || !complete}
          type="submit"
        >
          <LoadText text="Processing..." isLoading={status === "submitting"}>
            Donate Now
          </LoadText>
        </button>
      )}
      {prompt && <PromptV2 {...prompt} onClose={() => set_prompt(undefined)} />}
    </form>
  );
}
