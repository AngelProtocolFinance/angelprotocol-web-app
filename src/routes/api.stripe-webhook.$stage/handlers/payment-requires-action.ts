import {
  buildOnHoldRecord,
  getDonationIntent,
  isLegacy,
  sendEmail,
} from "../helper.mjs";
import { OnHoldTable, PutCommand, UpdateCommand, apesDynamo } from "../sdk.mjs";
import stripeClient from "../stripe-client.mjs";

import type { Donation, StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";

/** Updates intent transaction with deposit verification URL, status is still "intent" */
export async function PaymentRequiresAction({
  object: paymentIntent,
}: Stripe.PaymentIntentRequiresActionEvent.Data) {
  const verificationLink =
    paymentIntent.next_action?.verify_with_microdeposits
      ?.hosted_verification_url;

  if (!verificationLink) throw new Error("Verification link is undefined");

  if (typeof paymentIntent.payment_method !== "string")
    throw new Error("Invalid payment method ID");

  const stripe = await stripeClient(paymentIntent.livemode);

  // PaymentIntent Event does not have expandable field so we query for PaymentMethod
  const paymentMethod = await stripe.getPaymentMethod(
    paymentIntent.payment_method
  );

  const meta = paymentIntent.metadata as
    | StripeDonation.Metadata
    | StripeDonation.LegacyMetadata;

  if (!isLegacy(meta)) {
    const donationRecord = buildOnHoldRecord(
      meta,
      +meta.amount,
      +meta.usdValue,
      false,
      meta.transactionId,
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
      recipients: [meta.email],
      template: "donation-microdeposit-action",
      data: {
        donorFirstName: meta.kycEmail ? meta.fullName.split(" ")[0] : "",
        recipientName: meta.charityName,
        verificationLink,
      },
    });
  } else {
    // TODO: can be removed in the near future
    const intentTxId = paymentIntent.metadata.intent_tx_id;
    const intentRecord = await getDonationIntent(intentTxId);
    if (!intentRecord)
      throw new Error(`Record not found, intent donation ${intentTxId}`);

    /** UPDATE EXISTING RECORD IN DB */
    await apesDynamo.send(
      new UpdateCommand({
        TableName: OnHoldTable,
        Key: { transactionId: intentTxId } satisfies Donation.PrimaryKey,
        UpdateExpression:
          "SET paymentMethod = :pm, stripeDepositVerifyUrl = :link",
        ExpressionAttributeValues: {
          ":pm": paymentMethod,
          ":link": verificationLink,
        },
      })
    );

    await sendEmail({
      recipients: [intentRecord.email],
      template: "donation-microdeposit-action",
      data: {
        donorFirstName: intentRecord.kycEmail
          ? intentRecord.fullName.split(" ")[0]
          : "",
        recipientName: intentRecord.charityName,
        verificationLink,
      },
    });
  }
}
