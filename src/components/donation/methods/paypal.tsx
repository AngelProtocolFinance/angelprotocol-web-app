import type {
  PayPalButtonOnApprove,
  PayPalButtonsComponentOptions,
} from "@paypal/paypal-js";
import { paypal_client_id } from "constants/env";
import { type IDonationIntent, donor_fv_init } from "lib/donations/schema";
import { useEffect } from "react";
import { href } from "react-router";
import { use_donation } from "../context";
import type { IPayPalExpress } from "./stripe/use-rhf";

interface Props extends IPayPalExpress {
  on_error: (msg: string) => void;
  classes?: string;
}

export function Paypal({ classes = "", on_error, ...p }: Props) {
  const { don } = use_donation();

  useEffect(() => {
    try {
      (async (...x) => {
        const [a, t, fa, c, fr] = x;

        const { loadScript } = await import("@paypal/paypal-js");
        const paypal = await loadScript({
          clientId: paypal_client_id,
          currency: c,
          disableFunding: ["card"],
          enableFunding: fr === "recurring" ? ["paypal"] : ["venmo", "paypal"],
          vault: fr === "recurring",
          intent: fr === "recurring" ? "subscription" : "capture",
        });

        if (!paypal || !paypal.Buttons) return;

        const create_intent = async (): Promise<string> => {
          const intent: IDonationIntent = {
            frequency: fr,
            amount: { base: a, tip: t, fee_allowance: fa, currency: c },
            donor: donor_fv_init,
            via_id: "fiat",
            via_name: "Paypal",
            recipient: don.recipient.id,
            source: don.source,
          };
          if (don.program) intent.program = don.program;
          if (don.config?.id) intent.source_id = don.config.id;

          const res = await fetch(
            href("/api/donation-intents/:type", { type: "paypal" }),
            {
              method: "POST",
              body: JSON.stringify(intent),
            }
          );
          if (!res.ok) throw res;
          const { tx_id } = await res.json();
          return tx_id;
        };
        const on_approve: PayPalButtonOnApprove = async (_, actions) => {
          if (actions.order) {
            const captured = await actions.order.capture();
            const onhold_id = captured?.purchase_units?.[0].custom_id;
            if (!onhold_id) return on_error("Missing order information");
            const return_url = `${window.location.origin}${href("/donations/:id", { id: onhold_id })}`;
            return actions.redirect(return_url);
          }
          if (actions.subscription) {
            const sub = await actions.subscription.get();
            if ("custom_id" in sub) {
              const onhold_id = sub.custom_id as string;
              const return_url = `${window.location.origin}${href("/donations/:id", { id: onhold_id })}`;
              return actions.redirect(return_url);
            }
          }
        };

        const opts: PayPalButtonsComponentOptions = {
          onApprove: on_approve,
          style: {
            layout: "vertical",
            shape: "rect",
            borderRadius: 4,
            tagline: false,
          },
        };
        if (fr === "one-time") opts.createOrder = create_intent;
        if (fr === "recurring") opts.createSubscription = create_intent;

        const container = document.getElementById("paypal-container")!;
        const btn_container = document.createElement("div");
        btn_container.id = "paypal-button-container";
        container.appendChild(btn_container);

        await paypal.Buttons(opts).render("#paypal-button-container");
      })(p.amnt, p.tip, p.fee_allowance, p.currency, p.frequency);
    } catch (err) {
      console.error(err);
    }
    return () => {
      const container = document.getElementById("paypal-container");
      const btn_container = document.getElementById("paypal-button-container");
      if (btn_container) container?.removeChild(btn_container);
    };
  }, [
    p.amnt,
    p.tip,
    p.fee_allowance,
    p.currency,
    p.frequency,
    don.recipient.id,
    don.source,
    don.program,
    don.config?.id,
    on_error,
  ]);

  return (
    <div
      id="paypal-container"
      className={`${classes} ${p.is_partial ? "pointer-events-none grayscale" : ""}`}
    />
  );
}
