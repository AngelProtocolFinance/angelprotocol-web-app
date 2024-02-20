import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { usePaypalOrderQuery } from "services/apes";
import { PaypalCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import Err from "../Err";
import Currency from "../common/Currrency";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";
import Checkout from "./Checkout";

type Donor = {
  firstName: string;
  lastName: string;
  email: string;
};

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function PaypalCheckout(
  props: PaypalCheckoutStep & { donor: Donor }
) {
  const { details, recipient, liquidSplitPct } = props;

  const {
    data: orderId,
    isLoading,
    isError,
    error,
  } = usePaypalOrderQuery({
    amount: +details.amount,
    currency: details.currency.code,
    endowmentId: recipient.id,
    email: props.donor.email,
    donorFullName: `${props.donor.firstName} ${props.donor.lastName}`,
    splitLiq: liquidSplitPct.toString(),
  });

  const dispatch = useSetter();

  const currency = details.currency;
  const total = +details.amount;
  const liq = total * (liquidSplitPct / 100);
  const locked = total - liq;

  return (
    <div className="flex flex-col isolate p-4 @md:p-8">
      <BackBtn onClick={() => dispatch(setStep("splits"))} type="button" />

      <Heading classes="my-4" />

      <SplitSummary
        classes="mb-auto"
        total={<Currency {...currency} amount={total} classes="text-gray-d2" />}
        liquid={<Currency {...currency} amount={liq} classes="text-sm" />}
        locked={<Currency {...currency} amount={locked} classes="text-sm" />}
      />

      {isLoading ? (
        <ContentLoader className="rounded h-14 w-full" />
      ) : isError || !orderId ? (
        <Err error={error} />
      ) : (
        <PayPalScriptProvider
          options={{
            clientId: PAYPAL_CLIENT_ID,
            commit: true,
            currency: "USD",
            enableFunding: "paylater",
            disableFunding: "card,venmo",
          }}
        >
          <div className="grid gap-5 w-full place-items-center">
            <Checkout orderId={orderId} source={details.source} />
          </div>
        </PayPalScriptProvider>
      )}
    </div>
  );
}
