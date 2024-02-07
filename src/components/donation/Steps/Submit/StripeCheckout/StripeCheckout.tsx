import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import Err from "../Err";
import Loader from "../Loader";
import Currency from "../common/Currrency";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";
import Checkout from "./Checkout";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details, recipient, kyc, liquidSplitPct } = props;
  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useStripePaymentIntentQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: details.email,
    splitLiq: liquidSplitPct.toString(),
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

  const currency = details.currency;
  const total = +details.amount;
  const liq = total * (liquidSplitPct / 100);
  const locked = total - liq;

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
      <Heading classes="my-4" />

      <SplitSummary
        classes="mb-4"
        total={<Currency {...currency} amount={total} classes="text-gray-d2" />}
        liquid={<Currency {...currency} amount={liq} classes="text-sm" />}
        locked={<Currency {...currency} amount={locked} classes="text-sm" />}
      />

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
    </div>
  );
}
