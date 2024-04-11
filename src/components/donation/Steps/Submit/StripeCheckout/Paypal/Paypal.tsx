import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "constants/env";
import { StripeCheckoutStep } from "slices/donation";
import Checkout from "./Checkout";

// https://paypal.github.io/react-paypal-js/?path=/docs/example-paypalbuttons--default
export default function Paypal(props: StripeCheckoutStep) {
  return PAYPAL_CLIENT_ID === "" ? (
    <div id="paypal-failure-fallback" className="hidden" />
  ) : (
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
