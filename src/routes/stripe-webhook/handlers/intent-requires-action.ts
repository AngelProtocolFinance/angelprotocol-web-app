import type { IMetadata } from "@better-giving/stripe";
import { str_id } from "routes/helpers/stripe";
import type Stripe from "stripe";
import { to_onhold } from "../../helpers/donation-metadata";
import { payment_method } from "../helpers/payment-method";
import { send_email } from "../helpers/send-email";
import { onholddb } from ".server/aws/db";

type Intent = Stripe.PaymentIntent | Stripe.SetupIntent;

/**
 * Payment Intent - Updates intent transaction with deposit verification URL, status is still "intent"
 * Setup Intent   - Creates an "intent" donation record with deposit verification URL
 */
export async function handle_intent_requires_action(intent: Intent) {
  const verification_link =
    intent.next_action?.verify_with_microdeposits?.hosted_verification_url;

  if (!verification_link) throw new Error("Verification link is undefined");

  const meta = intent.metadata as IMetadata;
  const onhold = to_onhold(meta, {
    payment_method: await payment_method(str_id(intent.payment_method)),
    verify_url: verification_link,
    status: "intent",
  });

  //create intent record in on_hold_donations table
  await onholddb.put(onhold);

  return send_email({
    recipients: [meta.email],
    template: "donation-microdeposit-action",
    data: {
      donorFirstName: meta.fullName.split(" ")[0],
      recipientName: meta.charityName,
      verificationLink: verification_link,
    },
  });
}
