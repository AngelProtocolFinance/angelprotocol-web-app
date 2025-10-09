import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ErrorBoundaryClass, ErrorTrigger } from "components/error";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import use_swr from "swr/immutable";
import type { DonationIntent } from "types/donation-intent";
import { currency } from "../../common/currency";
import { Summary } from "../../common/summary";
import { use_donation_state } from "../../context";
import type { StripeCheckoutStep } from "../../types";
import { DonationTerms } from "../donation-terms";
import { Loader } from "../loader";
import { Checkout } from "./checkout";

const fetcher = async (intent: DonationIntent) =>
  fetch("/api/donation-intents/stripe", {
    method: "POST",
    body: JSON.stringify(intent),
  })
    .then<{ clientSecret: string }>((res) => res.json())
    .then((x) => x.clientSecret);

const stripe_promise = loadStripe(PUBLIC_STRIPE_KEY);

export function StripeCheckout(props: StripeCheckoutStep) {
  const { init, details, tip, donor, tribute, fee_allowance } = props;
  const { set_state } = use_donation_state();

  const intent: DonationIntent = {
    frequency: details.frequency,
    amount: {
      amount: +details.amount,
      tip: tip?.value ?? 0,
      fee_allowance: fee_allowance,
      currency: details.currency.code,
    },
    recipient: init.recipient.id,
    donor,
    source: init.source,
    via_id: "fiat",
    via_name: "Stripe",
    tribute,
  };

  if (details.program.value) {
    intent.program = {
      id: details.program.value,
      name: details.program.label,
    };
  }

  const { data, error, isLoading } = use_swr(intent, fetcher);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      on_back={() => set_state({ ...props, step: "summary" })}
      Amount={currency(details.currency)}
      amount={+details.amount}
      fee_allowance={fee_allowance}
      frequency={details.frequency}
      tip={
        props.tip
          ? {
              value: props.tip.value,
              charity_name: init.recipient.name,
            }
          : undefined
      }
      program={details.program}
    >
      <ErrorBoundaryClass>
        {isLoading ? (
          <Loader msg="Loading payment form.." />
        ) : error || !data ? (
          <ErrorTrigger error={error} />
        ) : (
          <Elements
            options={{
              fonts: [
                {
                  family: "Quicksand",
                  cssSrc: "https://fonts.googleapis.com/css2?family=Quicksand",
                },
              ],
              clientSecret: data,
              appearance: {
                theme: "flat",
                variables: {
                  colorPrimary: init.config?.accent_primary,
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "8px",
                  gridRowSpacing: "20px",
                },
              },
            }}
            stripe={stripe_promise}
          >
            <Checkout {...props} />
          </Elements>
        )}
      </ErrorBoundaryClass>
      <DonationTerms endowName={props.init.recipient.name} classes="mt-5" />
    </Summary>
  );
}
