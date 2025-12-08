import {
  ExpressCheckoutElement,
  type ExpressCheckoutElementProps,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import type {
  IDonationIntent,
  IDonorAddressFv,
  IStripeIntentReturn,
} from "lib/donations";
import { href } from "react-router";
import { use_donation } from "../../../context";
import type { IStripeExpress } from "../use-rhf";

export interface IContentExternal
  extends Omit<IStripeExpress, "items" | "is_partial"> {
  classes?: string;
  on_error: (msg: string) => void;
}
export interface IContent extends IContentExternal {
  on_click: ExpressCheckoutElementProps["onClick"];
}
export function Content({ classes = "", on_click, on_error, ...x }: IContent) {
  const { don } = use_donation();
  const elements = useElements();
  const stripe = useStripe();

  const on_confirm: ExpressCheckoutElementProps["onConfirm"] = async (ev) => {
    if (!stripe || !elements) return;

    const { error: submit_err } = await elements.submit();
    if (submit_err) {
      if (ev.paymentFailed) return ev.paymentFailed({ reason: "fail" });
      return on_error(submit_err.message || GENERIC_ERROR_MESSAGE);
    }

    const { billingDetails: b, expressPaymentType } = ev;
    if (!b?.email) {
      return on_error("your email was not found in billing details.");
    }
    const [fn, ln] = b.name.split(" ");
    const addr: IDonorAddressFv = {
      street: [b.address.line1, b.address.line2].filter(Boolean).join(" "),
      city: b.address.city,
      state: b.address.state,
      country: b.address.country,
      zip_code: b.address.postal_code,
    };

    const intent: IDonationIntent = {
      recipient: don.recipient.id,
      amount: {
        base: x.base,
        currency: x.currency,
        tip: x.tip,
        fee_allowance: x.fee_allowance,
      },
      frequency: x.frequency,
      source: don.source,
      donor: {
        title: "",
        email: b.email,
        first_name: fn,
        last_name: ln,
        address: addr,
      },
      via_id: ev.expressPaymentType,
      via_name: "Stripe Express Checkout",
    };
    if (don.program) intent.program = don.program;
    if (don.config?.id) intent.source_id = don.config.id;

    const res = await fetch("/api/donation-intents/stripe", {
      method: "POST",
      body: JSON.stringify(intent),
    });

    if (!res.ok) {
      return on_error(`Failed to create donation intent: ${res.statusText}`);
    }

    const { order_id, client_secret }: IStripeIntentReturn = await res.json();

    const custom_redirect = don.config?.success_redirect;
    const return_url = custom_redirect
      ? new URL(custom_redirect)
      : new URL(`${don.base_url}${href("/donations/:id", { id: order_id })}`);

    if (custom_redirect) {
      return_url.searchParams.set("donor_name", `${fn} ${ln}`);
      const to_pay =
        intent.amount.amount + intent.amount.tip + intent.amount.fee_allowance;
      return_url.searchParams.set("donation_amount", to_pay.toString());
      return_url.searchParams.set("donation_currency", intent.amount.currency);
      return_url.searchParams.set("payment_method", expressPaymentType);
    }

    const { error } = await stripe[
      x.frequency === "recurring" ? "confirmSetup" : "confirmPayment"
    ]({
      elements,
      clientSecret: client_secret,
      confirmParams: { return_url: return_url.toString() },
    });

    if (error) {
      console.error(error);
      on_error(error.message || GENERIC_ERROR_MESSAGE);
    }
  };

  return (
    <ExpressCheckoutElement
      id="express-checkout"
      className={classes}
      onConfirm={on_confirm}
      onClick={on_click}
      options={{
        layout: { overflow: "never" },
        buttonTheme: {
          googlePay: "white",
          applePay: "white",
        },
        emailRequired: true,
        billingAddressRequired: true,
      }}
    />
  );
}
