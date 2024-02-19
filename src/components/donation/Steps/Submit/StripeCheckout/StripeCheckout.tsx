import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import { useStripePaymentIntentQuery } from "services/apes";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import Err from "../Err";
import Loader from "../Loader";
import currency from "../common/Currrency";
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

  const Amount = currency(details.currency);

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("tip"))} />
      <Heading classes="my-4" />

      <SplitSummary
        classes="mb-4"
        amount={+details.amount}
        splitLiq={props.liquidSplitPct}
        Donation={(n) => <Amount amount={n} classes="text-gray-d2" />}
        Liquid={(n) => <Amount amount={n} classes="text-sm" />}
        Locked={(n) => <Amount amount={n} classes="text-sm" />}
        tip={
          props.tip
            ? {
                charityName: props.recipient.name,
                value: props.tip,
                Tip: (n) => <Amount classes="text-gray-d2" amount={n} />,
                Total: (n) => <Amount classes="text-gray-d2" amount={n} />,
              }
            : undefined
        }
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
