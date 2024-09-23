import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import ErrorBoundary from "errors/ErrorBoundary";
import ErrorTrigger from "errors/ErrorTrigger";
import { useStripePaymentIntentQuery } from "services/apes";
import { useDonationState } from "../../Context";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import { toDonor } from "../../common/constants";
import type { StripeCheckoutStep } from "../../types";
import { DonationTerms } from "../DonationTerms";
import Loader from "../Loader";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(props: StripeCheckoutStep) {
  const {
    init,
    details,
    liquidSplitPct,
    tip,
    donor: fvDonor,
    honorary,
    feeAllowance,
  } = props;
  const { setState } = useDonationState();

  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useStripePaymentIntentQuery({
    transactionId: init.intentId,
    type: details.frequency,
    amount: +details.amount,
    tipAmount: tip?.value ?? 0,
    feeAllowance,
    currency: details.currency.code,
    endowmentId: init.recipient.id,
    splitLiq: liquidSplitPct,
    donor: toDonor(fvDonor),
    source: init.source,
    ...(honorary.honoraryFullName && {
      inHonorOf: honorary.honoraryFullName,
      tributeNotif: honorary.withTributeNotif
        ? honorary.tributeNotif
        : undefined,
    }),
    ...(details.program.value && {
      programId: details.program.value,
      programName: details.program.label,
    }),
  });

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={currency(details.currency)}
      amount={+details.amount}
      feeAllowance={feeAllowance}
      splitLiq={liquidSplitPct}
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
      <ErrorBoundary>
        {isLoading ? (
          <Loader msg="Loading payment form.." />
        ) : isError || !clientSecret ? (
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
              clientSecret,
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
      </ErrorBoundary>
      <DonationTerms endowName={props.init.recipient.name} classes="mt-5" />
    </Summary>
  );
}
