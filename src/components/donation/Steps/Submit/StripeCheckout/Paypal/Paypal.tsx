import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { usePaypalOrderQuery } from "services/apes";
import { StripeCheckoutStep } from "slices/donation";
import Err from "../../Err";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Paypal(props: StripeCheckoutStep) {
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
    splitLiq: liquidSplitPct.toString(),
  });

  return (
    <>
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
          <div className="grid gap-5 place-items-center">
            <Checkout orderId={orderId} source={details.source} />
          </div>
        </PayPalScriptProvider>
      )}
    </>
  );
}
