import type { IMetadata } from "@better-giving/stripe";
import { str_id } from "helpers/stripe";
import { send_email } from "lib/email";
import type Stripe from "stripe";
import { stripe } from ".server/sdks";

/** Sends an email to donor as to why the payment failed */
export async function handle_intent_failed(
  data: Stripe.PaymentIntentPaymentFailedEvent.Data
) {
  const meta = await (async (pi) => {
    //subs pi metadata is empty object // retrieve from invoice
    if (Object.keys(pi.metadata).length === 0) {
      if (!pi.invoice) throw "missing invoice";
      const { subscription_details } = await stripe.invoices.retrieve(
        str_id(pi.invoice)
      );
      const m = subscription_details?.metadata as IMetadata | null;
      if (!m) throw "missing invoice metadata";
      return m;
    }
    return pi.metadata as unknown as IMetadata;
  })(data.object);

  await send_email(
    {
      name: "donation-error",
      recipientName: meta.charityName,
      donorFirstName: meta.fullName.split(" ")[0],
      errorMessage: `Payment Intent ID ${data.object.id} failed due to: ${data.object.last_payment_error?.message ?? "Stripe error"}`,
    },
    [meta.email]
  );
}
