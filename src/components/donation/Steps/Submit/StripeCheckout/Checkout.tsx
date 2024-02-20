import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep } from "slices/donation";
import Err from "../Err";
import Loader from "../Loader";
import CheckoutForm from "./CheckoutForm";

type Donor = {
  firstName: string;
  lastName: string;
  email: string;
};

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Checkout(props: StripeCheckoutStep & { donor: Donor }) {
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

  return isLoading ? (
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
      <CheckoutForm source={details.source} />
    </Elements>
  );
}
