import { Elements } from "@stripe/react-stripe-js";
import { stripe_promise } from "components/donation/common/stripe";
import { ErrorBoundaryClass, ErrorTrigger } from "components/error";
import { PROCESSING_RATES } from "constants/common";
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
import { Checkout } from "./checkout-form";

const fetcher = async (intent: DonationIntent) =>
  fetch("/api/donation-intents/stripe", {
    method: "POST",
    body: JSON.stringify(intent),
  }).then<IStripeIntentReturn>((res) => res.json());

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
  const mfa = cover_processing_fee
    ? min_fee_allowance(
        tipv + +amount,
        PROCESSING_RATES.stripe,
        PROCESSING_RATES.stripe_flat * currency.rate
      )
    : 0;

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

  if (don.program) intent.program = don.program;

  const { data, error, isLoading } = use_swr(intent, fetcher);

  return (
    <Summary
      classes="grid content-start p-4 @xl/steps:p-8"
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
                  borderRadius: "4px",
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
