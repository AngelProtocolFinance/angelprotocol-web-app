import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ErrorBoundaryClass, ErrorTrigger } from "components/error";
import { PROCESSING_RATES } from "constants/common";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { min_fee_allowance } from "helpers/donation";
import use_swr from "swr/immutable";
import type {
  DonationIntent,
  IStripeIntentReturn,
} from "types/donation-intent";
import { currency as currencyfn } from "../../common/currency";
import { Summary } from "../../common/summary";
import { use_donation } from "../../context";
import { type StripeDonationDetails, back_to_form, tip_val } from "../../types";
import { DonationTerms } from "../donation-terms";
import { Loader } from "../loader";
import { Checkout } from "./checkout";

const fetcher = async (intent: DonationIntent) =>
  fetch("/api/donation-intents/stripe", {
    method: "POST",
    body: JSON.stringify(intent),
  }).then<IStripeIntentReturn>((res) => res.json());

const stripe_promise = loadStripe(PUBLIC_STRIPE_KEY);

export function StripeCheckout(props: StripeDonationDetails) {
  const {
    frequency,
    amount,
    tip,
    tip_format,
    cover_processing_fee,
    currency,
    ...donor
  } = props;
  const { don, don_set } = use_donation();

  const tipv = tip_val(tip_format, tip, +amount);
  const mfa = min_fee_allowance(
    tipv + +amount,
    PROCESSING_RATES.stripe,
    PROCESSING_RATES.stripe_flat * currency.rate
  );

  const intent: DonationIntent = {
    frequency: frequency,
    amount: {
      amount: +amount,
      tip: tip_val(tip_format, tip, +amount),
      fee_allowance: mfa,
      currency: currency.code,
    },
    recipient: don.recipient.id,
    donor: { title: "", ...donor },
    source: don.source,
    via_id: "fiat",
    via_name: "Stripe",
  };

  const { data, error, isLoading } = use_swr(intent, fetcher);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      on_back={() => back_to_form("stripe", props, don_set)}
      Amount={currencyfn(currency)}
      amount={+amount}
      fee_allowance={mfa}
      frequency={frequency}
      tip={
        tipv > 0 ? { value: tipv, charity_name: don.recipient.name } : undefined
      }
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
              clientSecret: data.client_secret,
              appearance: {
                theme: "flat",
                variables: {
                  colorPrimary: don.config?.accent_primary,
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "8px",
                  gridRowSpacing: "20px",
                },
              },
            }}
            stripe={stripe_promise}
          >
            <Checkout {...props} order_id={data.order_id} />
          </Elements>
        )}
      </ErrorBoundaryClass>
      <DonationTerms endowName={don.recipient.name} classes="mt-5" />
    </Summary>
  );
}
