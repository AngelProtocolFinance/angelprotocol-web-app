import type { StripeDonation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import { str_id } from "routes/helpers/stripe";
import type Stripe from "stripe";
import { to_onhold } from "../../helpers/donation-metadata";
import { payment_method } from "../helpers/payment-method";
import { send_email } from "../helpers/send-email";
import { PutCommand, apes } from ".server/aws/db";

type Ev =
  | Stripe.PaymentIntentRequiresActionEvent
  | Stripe.SetupIntentRequiresActionEvent;

/**
 * Payment Intent - Updates intent transaction with deposit verification URL, status is still "intent"
 * Setup Intent   - Creates an "intent" donation record with deposit verification URL
 */
export async function handle_intent_requires_action(ev: Ev) {
  const intent = ev.data.object;
  const verification_link =
    intent.next_action?.verify_with_microdeposits?.hosted_verification_url;

  if (!verification_link) throw new Error("Verification link is undefined");

  const meta = intent.metadata as StripeDonation.Metadata;
  const onhold = to_onhold(meta, {
    payment_method: await payment_method(str_id(intent.payment_method)),
    verify_url: verification_link,
  });

  //create intent record in on_hold_donations table
  const cmd = new PutCommand({
    TableName: tables.on_hold_donations,
    Item: onhold,
  });
  await apes.send(cmd);

  await send_email({
    recipients: [meta.email],
    template: "donation-microdeposit-action",
    data: {
      donorFirstName: meta.fullName.split(" ")[0],
      recipientName: meta.charityName,
      verificationLink: verification_link,
    },
  });
}
