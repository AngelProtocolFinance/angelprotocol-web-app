import {
  PayPalButtons,
  type PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { use_donation } from "components/donation/context";
import { paypal_client_id } from "constants/env";
import { href } from "react-router";
import { type DonationIntent, donor_init } from "types/donation-intent";
import type { IPayPalExpress } from "./stripe/use-rhf";

interface Props extends IPayPalExpress {
  on_error: (msg: string) => void;
  classes?: string;
}

export function Paypal({ classes = "", on_error, ...p }: Props) {
  const { don } = use_donation();
  const k = JSON.stringify(p);

  const create_order: PayPalButtonsComponentProps["createOrder"] = async () => {
    //create intent
    const intent: DonationIntent = {
      frequency: p.frequency,
      amount: {
        amount: p.amnt,
        tip: p.tip,
        fee_allowance: p.fee_allowance,
        currency: p.currency,
      },
      donor: donor_init,
      via_id: "fiat",
      via_name: "Paypal",
      recipient: don.recipient.id,
      source: don.source,
    };
    if (don.program) intent.program = don.program;

    const res = await fetch(
      href("/api/donation-intents/:type", { type: "paypal" }),
      {
        method: "POST",
        body: JSON.stringify(intent),
      }
    );
    if (!res.ok) throw res;
    const { order_id } = await res.json();
    return order_id;
  };
  const on_approve: PayPalButtonsComponentProps["onApprove"] = async (_, y) => {
    if (!y.order) return;
    const captured = await y.order.capture();
    const onhold_id = captured?.purchase_units?.[0].custom_id;

    if (!onhold_id) return on_error("Missing order information");

    const return_path =
      don.source === "bg-widget"
        ? href("/donate-widget/donations/:id", { id: onhold_id })
        : href("/donations/:id", { id: onhold_id });

    const return_url =
      don.source === "bg-widget"
        ? `${window.location.origin}${return_path}`
        : `${window.location.origin}${return_path}`;

    y.redirect(return_url);
  };

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
        <PayPalButtons
          key={`venmo-${k}`}
          onApprove={on_approve}
          createOrder={create_order}
          fundingSource="venmo"
          style={{ color: "blue", label: "pay" }}
        />
        <PayPalButtons
          key={`paypal-${k}`}
          onApprove={on_approve}
          createOrder={create_order}
          fundingSource="paypal"
          style={{ color: "gold", label: "pay" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
