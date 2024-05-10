import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import ErrorBoundary from "errors/ErrorBoundary";
import { useDonationState } from "../../Context";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import type { StripeCheckoutStep } from "../../types";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details, init, liquidSplitPct } = props;
  const [, setState] = useDonationState();

  return (
    <Summary
      classes={{
        container: "grid content-start p-4 @md/steps:p-8",
        split: "mb-4",
      }}
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={currency(details.currency)}
      amount={+details.amount}
      splitLiq={liquidSplitPct}
      frequency={details.frequency}
      tip={
        props.tip
          ? {
              value: props.tip,
              charityName: init.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundary>
        <Elements
          options={{
            clientSecret: props.intentId,
            appearance: { theme: "stripe" },
          }}
          stripe={stripePromise}
        >
          <Checkout {...props} />
        </Elements>
      </ErrorBoundary>
    </Summary>
  );
}
