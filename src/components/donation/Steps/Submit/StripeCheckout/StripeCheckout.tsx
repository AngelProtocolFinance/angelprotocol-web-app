import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import Err from "../Err";
import Loader from "../Loader";
import Checkout from "./Checkout";
import Paypal from "./Paypal";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details, recipient, liquidSplitPct, tip = 0, donor } = props;
  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useStripePaymentIntentQuery({
    type: "one-time",
    amount: +details.amount,
    tipAmount: tip,
    usdRate: details.currency.rate,
    currency: details.currency.code,
    endowmentId: recipient.id,
    splitLiq: liquidSplitPct,
    donor: props.donor,
  });

  const dispatch = useSetter();

  return (
    <Summary
      classes={{ container: "grid content-start p-4 @md:p-8", split: "mb-4" }}
      onBack={() => dispatch(setStep("summary"))}
      Amount={currency(details.currency)}
      amount={+details.amount}
      splitLiq={liquidSplitPct}
      tip={
        props.tip
          ? {
              value: props.tip,
              charityName: props.recipient.name,
            }
          : undefined
      }
    >
      <div className="has-[#paypal-failure-fallback]:hidden peer">
        <p className="mb-2 font-medium">Express checkout</p>
        <div className="flex items-center">
          <Paypal {...props} />
        </div>
      </div>
      <div className="relative border border-gray-l4 h-px w-full mb-8 mt-6 grid place-items-center peer-has-[.hidden]:hidden">
        <span className="absolute bg-white px-4 text-gray text-xs">OR</span>
      </div>
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
          <Checkout source={details.source} donor={donor} />
        </Elements>
      )}
    </Summary>
  );
}
