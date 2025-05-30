import type { StripeDonation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { to_onhold } from "../../helpers/donation-metadata";
import { sendEmail } from "../helpers";
import { payment_method } from "../helpers/payment-method";
import { PutCommand, apes } from ".server/aws/db";

type Ev =
  | Stripe.PaymentIntentRequiresActionEvent
  | Stripe.SetupIntentRequiresActionEvent;

/**
 * Payment Intent - Updates intent transaction with deposit verification URL, status is still "intent"
 * Setup Intent   - Creates an "intent" donation record with deposit verification URL
 */
export async function handleIntentRequiresAction(ev: Ev) {
  const intent = ev.data.object;
  const verificationLink =
    intent.next_action?.verify_with_microdeposits?.hosted_verification_url;

  if (!verificationLink) throw new Error("Verification link is undefined");

  if (typeof intent.payment_method !== "string")
    throw new Error("Invalid payment method ID");

  if (!intent.metadata || Object.keys(intent.metadata).length === 0)
    throw new Error("Invalid intent metadata");

  const meta = intent.metadata as StripeDonation.Metadata;
  const onhold = to_onhold(meta, {
    payment_method: await payment_method(intent.id),
    verify_url: verificationLink,
  });
  const cmd = new PutCommand({
    TableName: tables.on_hold_donations,
    Item: onhold,
  });

  /** CREATE INTENT RECORD IN DB */
  await apes.send(cmd);

  /** SEND EMAIL */
  await sendEmail({
    recipients: [meta.email],
    template: "donation-microdeposit-action",
    data: {
      donorFirstName: meta.kycEmail ? meta.fullName.split(" ")[0] : "",
      recipientName: meta.charityName,
      verificationLink,
    },
  });
}
