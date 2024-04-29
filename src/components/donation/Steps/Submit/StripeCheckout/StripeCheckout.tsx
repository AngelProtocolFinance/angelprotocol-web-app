import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import ErrorBoundary from "errors/ErrorBoundary";
import ErrorTrigger from "errors/ErrorTrigger";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import Loader from "../Loader";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(props: StripeCheckoutStep) {
  const {
    details,
    recipient,
    liquidSplitPct,
    tip = 0,
    intentTransactionId,
  } = props;

  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useStripePaymentIntentQuery(
    {
      type: details.frequency,
      amount: +details.amount,
      tipAmount: tip,
      currency: details.currency.code,
      endowmentId: recipient.id,
      splitLiq: liquidSplitPct,
      donor: props.donor,
      source: details.source,
    },
    { skip: !!intentTransactionId }
  );

  const dispatch = useSetter();

  return (
    <Summary
      classes={{
        container: "grid content-start p-4 @md/steps:p-8",
        split: "mb-4",
      }}
      onBack={() => dispatch(setStep("summary"))}
      Amount={currency(details.currency)}
      amount={+details.amount}
      splitLiq={liquidSplitPct}
      frequency={details.frequency}
      tip={
        props.tip
          ? {
              value: props.tip,
              charityName: props.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundary>
        {isLoading ? (
          <Loader msg="Loading payment form.." />
        ) : isError || !clientSecret ? (
          <ErrorTrigger error={error} />
        ) : (
          <Elements
            options={{
              clientSecret,
              appearance: { theme: "stripe" },
            }}
            stripe={stripePromise}
          >
            <Checkout source={details.source} />
          </Elements>
        )}
      </ErrorBoundary>
    </Summary>
  );
}
