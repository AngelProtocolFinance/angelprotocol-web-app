import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { usePaypalOrderQuery } from "services/apes";
import { StripeCheckoutStep } from "slices/donation";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Paypal(props: StripeCheckoutStep) {
  const { details, recipient, liquidSplitPct, tip = 0 } = props;

  const {
    data: orderId,
    isLoading,
    isError,
  } = usePaypalOrderQuery(
    {
      amount: +details.amount,
      tipAmount: tip,
      usdRate: details.currency.rate || 0, //skipped if not present
      currency: details.currency.code,
      endowmentId: recipient.id,
      email: props.donor.email,
      splitLiq: liquidSplitPct.toString(),
    },
    { skip: !details.currency.rate }
  );

  return isLoading ? (
    <ContentLoader className="rounded h-10 w-40" />
  ) : isError || !orderId ? (
    <div id="paypal-failure-fallback" className="hidden" />
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
      <div className="flex items-center gap-2">
        <Checkout orderId={orderId} source={details.source} />
      </div>
    </PayPalScriptProvider>
  );
}
