import type { StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";
import { sendEmail } from "../helpers";
import { getSubsInvoice } from ".server/stripe/get";

type Ev =
  | Stripe.PaymentIntentPaymentFailedEvent
  | Stripe.SetupIntentSetupFailedEvent;
type GenericMetadata = StripeDonation.Metadata | null;

/** Sends an email to donor as to why the payment failed */
export async function handleIntentFailed(ev: Ev) {
  let meta = ev.data.object.metadata as GenericMetadata;
  if (!meta || (Object.keys(meta).length === 0 && !isPaymentIntent(ev)))
    throw new Error("Invalid intent metadata");

  // if empty object, it is highly likely a subs payment intent
  if (Object.keys(meta).length === 0 && isPaymentIntent(ev)) {
    const invoiceId = ev.data.object.invoice;
    if (!invoiceId || typeof invoiceId === "object")
      throw new Error("Invalid invoice ID");

    // Stripe Invoice query
    const { subscription_details: subsDetails } =
      await getSubsInvoice(invoiceId);
    if (
      !subsDetails ||
      !subsDetails.metadata ||
      Object.keys(subsDetails.metadata).length === 0
    )
      throw new Error("Invalid subscription metadata");

    meta = subsDetails.metadata as NonNullable<GenericMetadata>;
  }

  const err = new Err(ev);

  await sendEmail({
    recipients: [meta.email],
    template: "donation-error",
    data: {
      donorFirstName: meta.fullName.split(" ")[0],
      recipientName: meta.charityName,
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
