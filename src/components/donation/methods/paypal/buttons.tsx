import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { paypal_client_id } from "constants/env";
import type { IPayPalExpress } from "../stripe/use-rhf";

interface Props extends IPayPalExpress {
  classes?: string;
}

export function Paypal({ classes = "", ...p }: Props) {
  const k = JSON.stringify(p);
  return (
    <div
      className={`${classes} grid gap-0.5 ${p.is_partial ? "pointer-events-none grayscale" : ""}`}
    >
      <PayPalScriptProvider
        key={k}
        options={{
          clientId: paypal_client_id,
          enableFunding: ["venmo", "paypal"],
          currency: p.currency,
        }}
      >
        <PayPalButtons key={`venmo-${k}`} fundingSource="venmo" />
        <PayPalButtons
          key={`paypal-${k}`}
          onApprove={async (x, y) => {
            console.log({ x, y });
            if (!y.order) return;
            const captured = await y.order.capture();
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
                  custom_id: p.custom_id,
                  amount: {
                    currency_code: p.currency,
                    value: p.total,
                    breakdown: {
                      item_total: {
                        currency_code: p.currency,
                        value: p.total,
                      },
                    },
                  },
                  items: p.items.map((x) => ({
                    name: x.name,
                    quantity: "1",
                    unit_amount: {
                      currency_code: p.currency,
                      value: x.amnt,
                    },
                    category: "DONATION",
                    sku: x.id,
                  })),
                },
              ],
            });
            return order_id;
          }}
          fundingSource="paypal"
          style={{ color: "gold", label: "pay" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
