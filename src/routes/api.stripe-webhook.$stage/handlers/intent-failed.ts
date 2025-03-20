import { getDonationIntent, isLegacy, sendEmail } from "../helper.mjs";
import stripeClient from "../stripe-client.mjs";

import type { StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";

type Ev =
  | Stripe.PaymentIntentPaymentFailedEvent
  | Stripe.SetupIntentSetupFailedEvent;
type GenericMetadata =
  | StripeDonation.Metadata
  | StripeDonation.LegacyMetadata
  | null;

/** Sends an email to donor as to why the payment failed */
export async function IntentFailed(ev: Ev) {
  let meta = ev.data.object.metadata as GenericMetadata;
  if (!meta || (Object.keys(meta).length === 0 && !isPaymentIntent(ev)))
    throw new Error("Invalid intent metadata");

  // if empty object, it is highly likely a subs payment intent
  if (Object.keys(meta).length === 0 && isPaymentIntent(ev)) {
    const invoiceId = ev.data.object.invoice;
    if (!invoiceId || typeof invoiceId === "object")
      throw new Error("Invalid invoice ID");

    // Stripe Invoice query
    const stripe = await stripeClient(ev.data.object.livemode);
    const { subscription_details: subsDetails } =
      await stripe.getSubsInvoice(invoiceId);
    if (
      !subsDetails ||
      !subsDetails.metadata ||
      Object.keys(subsDetails.metadata).length === 0
    )
      throw new Error("Invalid subscription metadata");

    meta = subsDetails.metadata as NonNullable<GenericMetadata>;
  }

  const mail = await (async (meta) => {
    if (!isLegacy(meta)) {
      return {
        toEmail: meta.email,
        toName: meta.fullName,
        npoName: meta.charityName,
      };
    }
    const intentRecord = await getDonationIntent(meta.intent_tx_id);
    if (!intentRecord) return;
    return {
      toEmail: intentRecord.email,
      toName: intentRecord.kycEmail ? intentRecord.fullName : "",
      npoName: intentRecord.charityName,
    };
  })(meta);

  const err = new Err(ev);

  if (!mail) return err.reason;

  await sendEmail({
    recipients: [mail.toEmail],
    template: "donation-error",
    data: {
      donorFirstName: mail.toName.split(" ")[0],
      recipientName: mail.npoName,
      errorMessage: err.msg,
    },
  });

  return err.reason;
}

class Err {
  reason: string;
  msg: string;

  constructor(ev: Ev) {
    if (isPaymentIntent(ev)) {
      this.reason =
        ev.data.object.last_payment_error?.message ?? "Stripe error";
      this.msg = `Payment Intent ID ${ev.data.object.id} failed due to: ${this.reason}`;
    } else {
      this.reason = ev.data.object.last_setup_error?.message ?? "Stripe error";
      this.msg = `Setup Intent ID ${ev.data.object.id} failed due to: ${this.reason}`;
    }
  }
}

function isPaymentIntent(ev: Ev): ev is Stripe.PaymentIntentPaymentFailedEvent {
  return ev.type === "payment_intent.payment_failed";
}
