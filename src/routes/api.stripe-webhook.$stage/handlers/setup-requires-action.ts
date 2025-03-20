import { buildOnHoldRecord, sendEmail } from "../helper.mjs";
import { OnHoldTable, PutCommand, apesDynamo } from "../sdk.mjs";
import stripeClient from "../stripe-client.mjs";

import type { StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";

/** Creates an "intent" donation record with deposit verification URL */
export async function SetupRequiresAction({
  object: intent,
}: Stripe.SetupIntentSucceededEvent.Data) {
  const verificationLink =
    intent.next_action?.verify_with_microdeposits?.hosted_verification_url;

  if (!verificationLink) throw new Error("Verification link is undefined");

  if (typeof intent.payment_method !== "string")
    throw new Error("Invalid payment method ID");

  const stripe = await stripeClient(intent.livemode);

  // SetupIntent Event does not have expandable field so we query for PaymentMethod
  const paymentMethod = await stripe.getPaymentMethod(intent.payment_method);

  if (!intent.metadata || Object.keys(intent.metadata).length === 0)
    throw new Error("Invalid intent metadata");

  const metadata = intent.metadata as StripeDonation.SetupIntentMetadata;

  const donationRecord = buildOnHoldRecord(
    metadata,
    +metadata.amount,
    +metadata.usdValue,
    true,
    metadata.transactionId,
    paymentMethod,
    verificationLink
  );

  /** CREATE INTENT RECORD IN DB */
  await apesDynamo.send(
    new PutCommand({
      TableName: OnHoldTable,
      Item: donationRecord,
    })
  );

  /** SEND EMAIL */
  await sendEmail({
    recipients: [metadata.email],
    template: "donation-microdeposit-action",
    data: {
      donorFirstName: metadata.kycEmail ? metadata.fullName.split(" ")[0] : "",
      recipientName: metadata.charityName,
      verificationLink,
    },
  });
}
