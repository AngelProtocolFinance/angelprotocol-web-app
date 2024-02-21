import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { currency } from "../../common/Currrency";
import Summary from "../../common/Summary";
import Err from "../Err";
import Loader from "../Loader";
import { Donor } from "../types";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(
  props: StripeCheckoutStep & { donor: Donor }
) {
  const { details, recipient, liquidSplitPct } = props;
  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useStripePaymentIntentQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: props.donor.email,
    splitLiq: liquidSplitPct.toString(),
    donorFullName: `${props.donor.firstName} ${props.donor.lastName}`,
  });

  const dispatch = useSetter();

  return (
    <Summary
      classes={{ container: "grid content-start p-4 @md:p-8", split: "mb-4" }}
      onBack={() => dispatch(setStep("splits"))}
      Amount={currency(details.currency)}
      amount={+details.amount}
      splitLiq={liquidSplitPct}
    >
      {isLoading ? (
        <Loader msg="Loading payment form.." />
      ) : isError || !clientSecret ? (
        <Err error={error} />
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
    </Summary>
  );
}
