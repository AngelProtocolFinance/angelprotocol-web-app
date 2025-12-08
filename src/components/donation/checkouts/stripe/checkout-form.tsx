import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ErrorTrigger } from "components/error";
import { LoadText } from "components/load-text";
import { type IPrompt, Prompt } from "components/prompt";
import { error_prompt } from "helpers/error-prompt";
import { type FormEventHandler, useState } from "react";
import { href } from "react-router";
import type { IDonationIntent, IDonorFv } from "lib/donations";
import { use_donation } from "../../context";
import { Loader } from "../loader";

type Status = "init" | "loading" | "ready" | "submitting" | { error: unknown };

interface Props extends IDonationIntent {
  order_id: string;
  donor: IDonorFv;
}
// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export function Checkout({ order_id, donor, ...intent }: Props) {
  const { don } = use_donation();
  const [complete, set_complete] = useState(false);
  const [prompt, set_prompt] = useState<IPrompt>();
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

    const custom_redirect = don.config?.success_redirect;
    const url = custom_redirect
      ? new URL(custom_redirect)
      : new URL(`${don.base_url}${href("/donations/:id", { id: order_id })}`);

    if (custom_redirect) {
      url.searchParams.set(
        "donor_name",
        `${donor.first_name} ${donor.last_name}`
      );
      const to_pay =
        intent.amount.base + intent.amount.tip + intent.amount.fee_allowance;
      url.searchParams.set("donation_amount", to_pay.toString());
      url.searchParams.set("donation_currency", intent.amount.currency);
      url.searchParams.set("payment_method", "card");
    }
    const return_url = url.toString();

    const { error } = await stripe[
      intent.frequency === "recurring" ? "confirmSetup" : "confirmPayment"
    ]({
      elements,
      confirmParams: { return_url },
      redirect: "if_required",
    });

    // with redirect: "if_required", this point will be reached for both
    // successful payments and errors. Handle both cases appropriately.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        set_prompt(error_prompt(error.message, "parsed"));
      } else {
        set_prompt(error_prompt(error, { context: "processing payment" }));
      }
      set_status("ready");
    } else {
      // Payment succeeded, redirect via postMessage if in iframe
      if (window.self !== window.top) {
        window.parent.postMessage(
          {
            type: "redirect",
            redirect_url: return_url,
            form_id: don.config?.id,
          },
          "*"
        );
      } else {
        // Not in iframe, redirect directly
        window.location.href = return_url;
      }
    }
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
          wallets: { applePay: "never", googlePay: "never", link: "never" },
          layout: "tabs",
          defaultValues: {
            billingDetails: {
              name: `${donor.first_name} ${donor.last_name}`,
              email: donor.email,
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
          className="btn btn-blue enabled:bg-(--accent-primary) hover:enabled:bg-(--accent-primary) w-full mt-6"
          disabled={!stripe || !elements || status !== "ready" || !complete}
          type="submit"
        >
          <LoadText text="Processing..." is_loading={status === "submitting"}>
            Donate Now
          </LoadText>
        </button>
      )}
      {prompt && <Prompt {...prompt} onClose={() => set_prompt(undefined)} />}
    </form>
  );
}
