import {
  PayPalButtonsComponentProps as P,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { paypal_client_id } from "constants/env";
interface Props {
  classes?: string;
}

export function Paypal({ classes = "" }: Props) {
  return (
    <div className="grid gap-0.5">
      <PayPalScriptProvider
        options={{ clientId: paypal_client_id, enableFunding: "venmo" }}
      >
        <PayPalButtons fundingSource="venmo" />
        <PayPalButtons
          onApprove={async (x, y) => {
            console.log({ x, y });
            const captured = await y.order?.capture();
            console.log({ captured });
            // y.redirect
          }}
          createOrder={async (x, y) => {
            console.log({ x, y });
            // create intent
            const order_id = await y.order.create({
              intent: "CAPTURE",

              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "1.00",
                  },
                },
              ],
            });
            console.log({ order_id });
            return order_id;
          }}
          fundingSource="paypal"
          style={{ color: "gold", label: "pay" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
