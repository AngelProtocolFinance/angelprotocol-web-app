import type {
  PayPalButtonOnApprove,
  PayPalButtonsComponentOptions,
} from "@paypal/paypal-js";
import { paypal_client_id } from "constants/env";
import { type IDonationIntent, donor_fv_init } from "lib/donations/schema";
import { useCallback, useEffect, useRef } from "react";
import { href } from "react-router";
import { use_donation } from "../context";
import type { IPayPalExpress } from "./stripe/use-rhf";

interface Props extends IPayPalExpress {
  on_error: (msg: string) => void;
  classes?: string;
}

export function Paypal({ classes = "", on_error, ...p }: Props) {
  const { don } = use_donation();
  const container_ref = useRef<HTMLDivElement>(null);

  const { amnt, tip, fee_allowance, currency, frequency } = p;
  const total = amnt + tip + fee_allowance;
  const is_recurring = frequency === "recurring";

  const build_redirect_url = useCallback(
    (onhold_id: string, extra_params?: Record<string, string>) => {
      const custom_redirect = don.config?.success_redirect;
      const url = custom_redirect
        ? new URL(custom_redirect)
        : new URL(
            `${don.base_url}${href("/donations/:id", { id: onhold_id })}`
          );

      if (custom_redirect) {
        url.searchParams.set("donation_amount", total.toString());
        url.searchParams.set("donation_currency", currency);
        for (const [key, value] of Object.entries(extra_params ?? {})) {
          url.searchParams.set(key, value);
        }
      }
      return url.toString();
    },
    [don.config?.success_redirect, don.base_url, total, currency]
  );

  const handle_redirect = useCallback(
    (url: string, actions: { redirect: (url: string) => void }) => {
      if (window.self !== window.top) {
        window.parent.postMessage(
          { type: "redirect", redirect_url: url, form_id: don.config?.id },
          "*"
        );
      } else {
        actions.redirect(url);
      }
    },
    [don.config?.id]
  );

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { loadScript } = await import("@paypal/paypal-js");
      const paypal = await loadScript({
        clientId: paypal_client_id,
        currency,
        disableFunding: ["card", "paylater"],
        enableFunding: is_recurring ? ["paypal"] : ["venmo", "paypal"],
        vault: is_recurring,
        intent: is_recurring ? "subscription" : "capture",
      });

      if (!mounted || !paypal?.Buttons || !container_ref.current) return;

      const create_intent = async (): Promise<string> => {
        const intent: IDonationIntent = {
          frequency,
          amount: { base: amnt, tip, fee_allowance, currency },
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
          { method: "POST", body: JSON.stringify(intent) }
        );
        if (!res.ok) throw res;
        const { tx_id } = await res.json();
        return tx_id;
      };

      const on_approve: PayPalButtonOnApprove = async (_, actions) => {
        if (actions.order) {
          const { purchase_units, payment_source = {} } =
            await actions.order.capture();
          const ps_id = Object.keys(payment_source)[0] || "paypal";
          const ps = payment_source.paypal || payment_source.venmo;
          const onhold_id = purchase_units?.[0].custom_id;
          if (!onhold_id) return on_error("Missing order information");

          const extra_params: Record<string, string> = {
            payment_method: ps_id,
          };
          if (ps?.name?.full_name) extra_params.donor_name = ps.name.full_name;

          const url = build_redirect_url(onhold_id, extra_params);
          return handle_redirect(url, actions);
        }

        if (actions.subscription) {
          const sub = await actions.subscription.get();
          if ("custom_id" in sub) {
            const url = build_redirect_url(sub.custom_id as string, {
              payment_method: "paypal",
            });
            return handle_redirect(url, actions);
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
        ...(is_recurring
          ? { createSubscription: create_intent }
          : { createOrder: create_intent }),
      };

      const btn_container = document.createElement("div");
      btn_container.id = "paypal-button-container";
      container_ref.current.appendChild(btn_container);

      await paypal.Buttons(opts).render("#paypal-button-container");
    };

    init().catch(console.error);

    return () => {
      mounted = false;
      const btn_container = document.getElementById("paypal-button-container");
      btn_container?.remove();
    };
  }, [
    amnt,
    tip,
    fee_allowance,
    currency,
    frequency,
    is_recurring,
    don.recipient.id,
    don.source,
    don.program,
    don.config?.id,
    build_redirect_url,
    handle_redirect,
    on_error,
  ]);

  return (
    <div
      ref={container_ref}
      className={`${classes} ${p.is_partial ? "pointer-events-none grayscale" : ""}`}
    />
  );
}
