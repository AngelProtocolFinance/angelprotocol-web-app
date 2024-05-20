import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "constants/env";
import ErrorTrigger from "errors/ErrorTrigger";
import type { StripeCheckoutStep } from "../../../types";
import Checkout from "./Checkout";

// https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--default
export default function Paypal(props: StripeCheckoutStep) {
  if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === " ") {
    return <ErrorTrigger error="PAYPAL_CLIENT_ID not set" />;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        commit: true,
        currency: props.details.currency.code.toUpperCase(),
        enableFunding: "paylater",
        disableFunding: "card,venmo",
      }}
    >
      <div className="flex items-center gap-2">
        <Checkout {...props} />
      </div>
    </PayPalScriptProvider>
  );
}
