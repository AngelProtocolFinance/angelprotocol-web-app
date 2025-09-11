import type { StripeDonation } from "@better-giving/donation";
import { str_id } from "routes/helpers/stripe";
import type Stripe from "stripe";
import { send_email } from "../helpers/send-email";
import { stripe } from ".server/sdks";

/** Sends an email to donor as to why the payment failed */
export async function handle_intent_failed(
  data: Stripe.PaymentIntentPaymentFailedEvent.Data
) {
  const meta = await (async (pi) => {
    //subs pi metadata is empty object // retrieve from invoice
    if (Object.keys(pi.metadata).length === 0) {
      if (!pi.invoice) throw `missing invoice`;
      const { subscription_details } = await stripe.invoices.retrieve(
        str_id(pi.invoice)
      );
      const m =
        subscription_details?.metadata as StripeDonation.SetupIntentMetadata | null;
      if (!m) throw `missing invoice metadata`;
      return m;
    }
    return pi.metadata as StripeDonation.Metadata;
  })(data.object);

  await send_email({
    recipients: [meta.email],
    template: "donation-error",
    data: {
      donorFirstName: meta.fullName.split(" ")[0],
      recipientName: meta.charityName,
      errorMessage: `Payment Intent ID ${data.object.id} failed due to: ${data.object.last_payment_error?.message ?? "Stripe error"}`,
    },
  });
}
