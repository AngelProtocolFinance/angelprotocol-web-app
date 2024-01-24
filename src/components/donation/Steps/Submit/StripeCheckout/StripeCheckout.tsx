import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSetter } from "store/accessors";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import Checkout from "./Checkout";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details } = props;
  const dispatch = useSetter();
  return (
    <Elements
      options={{
        clientSecret: details.checkoutSecret,
        appearance: { theme: "stripe" },
      }}
      stripe={stripePromise}
    >
      <Checkout
        onBack={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
      />
    </Elements>
  );
}
