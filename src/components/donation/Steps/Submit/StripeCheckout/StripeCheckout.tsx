import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import Err from "../Err";
import Loader from "../Loader";
import Checkout from "./Checkout";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details, recipient, kyc } = props;
  const {
    data: clientSecret,
    isLoading,
    isError,
  } = useStripePaymentIntentQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: details.email,
    splitLiq: details.pctLiquidSplit.toString(),
    kycData: kyc
      ? {
          city: kyc.city,
          country: kyc.country.name,
          fullName: `${kyc.name.first} ${kyc.name.last}`,
          kycEmail: kyc.kycEmail,
          streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
          state: kyc.usState.value || kyc.state,
          zipCode: kyc.postalCode,
        }
      : undefined,
  });

  const dispatch = useSetter();

  if (isLoading) return <Loader msg="Loading payment form.." />;
  if (isError) return <Err />;

  return (
    <Elements
      options={{
        clientSecret,
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
