import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { logger } from "helpers";
import { useEffect } from "react";
import { usePaypalOrderQuery } from "services/apes";
import { StripeCheckoutStep } from "slices/donation";
import Checkout from "./Checkout";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function Paypal(props: StripeCheckoutStep) {
  const { details, recipient, liquidSplitPct, tip = 0, donor } = props;

  const {
    data: orderId,
    isLoading,
    isError,
    error,
  } = usePaypalOrderQuery({
    amount: +details.amount,
    tipAmount: tip,
    usdRate: details.currency.rate,
    currency: details.currency.code,
    endowmentId: recipient.id,
    splitLiq: liquidSplitPct,
    donor,
  });

  useEffect(() => {
    if (error) {
      logger.error(error);
    }
  }, [error]);

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
        <Checkout orderId={orderId} source={details.source} donor={donor} />
      </div>
    </PayPalScriptProvider>
  );
}
