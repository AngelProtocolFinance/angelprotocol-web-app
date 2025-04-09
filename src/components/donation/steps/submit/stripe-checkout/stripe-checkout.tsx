import type { DonationIntent } from "@better-giving/donation/intent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ErrorBoundaryClass, ErrorTrigger } from "components/error";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import useSWR from "swr/immutable";
import { toDonor } from "../../common/constants";
import { currency } from "../../common/currency";
import Summary from "../../common/summary";
import { useDonationState } from "../../context";
import type { StripeCheckoutStep } from "../../types";
import { DonationTerms } from "../donation-terms";
import Loader from "../loader";
import Checkout from "./checkout";

const fetcher = async (intent: DonationIntent) =>
  fetch("/api/stripe-intents", {
    method: "POST",
    body: JSON.stringify(intent),
  })
    .then<{ clientSecret: string }>((res) => res.json())
    .then((x) => x.clientSecret);

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(props: StripeCheckoutStep) {
  const { init, details, tip, donor: fvDonor, honorary, feeAllowance } = props;
  const { setState } = useDonationState();

  const intent: DonationIntent = {
    frequency: details.frequency === "subscription" ? "recurring" : "one-time",
    amount: {
      amount: +details.amount,
      tip: tip?.value ?? 0,
      feeAllowance,
      currency: details.currency.code,
    },
    recipient: init.recipient.id,
    donor: toDonor(fvDonor),
    source: init.source,
    viaId: "fiat",
    viaName: "Stripe",
    donor_public: fvDonor.isPublic,
    donor_message: fvDonor.publicMsg,
  };

  if (honorary.honoraryFullName) {
    intent.tribute = {
      fullName: honorary.honoraryFullName,
    };
    if (honorary.withTributeNotif) {
      intent.tribute.notif = honorary.tributeNotif;
    }
  }

  if (details.program.value) {
    intent.program = {
      id: details.program.value,
      name: details.program.label,
    };
  }

  const { data, error, isLoading } = useSWR(intent, fetcher);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={currency(details.currency)}
      amount={+details.amount}
      feeAllowance={feeAllowance}
      frequency={details.frequency}
      tip={
        props.tip
          ? {
              value: props.tip.value,
              charityName: init.recipient.name,
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
                  colorPrimary: init.config?.accentPrimary,
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "8px",
                  gridRowSpacing: "20px",
                },
              },
            }}
            stripe={stripePromise}
          >
            <Checkout {...props} />
          </Elements>
        )}
      </ErrorBoundaryClass>
      <DonationTerms endowName={props.init.recipient.name} classes="mt-5" />
    </Summary>
  );
}
