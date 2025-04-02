import type {
  Donation,
  OnHoldDonation,
  StripeDonation,
} from "@better-giving/donation";
import type { DonationMessage } from "@better-giving/donation/donation-message";
import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import { toPrettyAmount } from "@better-giving/helpers";
import { TxBuilder, getUsdRate } from "@better-giving/helpers-db";
import type { Environment } from "@better-giving/schemas";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { getDonationIntent, sendMessage } from "../helpers";
import { GetCommand, TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";
import { getBalanceTx, getPaymentMethod } from ".server/stripe/get";

/**
 * Sends message to `final-donation-processor` for DB recording
 * and deletes record in on hold donations DB if applicable
 */
export async function handleOneTimeDonation({
  object: paymentIntent,
}: Stripe.PaymentIntentSucceededEvent.Data) {
  if (typeof paymentIntent.payment_method !== "string")
    throw new Error("Invalid payment method ID for subscription");

  // PaymentIntent Event does not have expandable field so we query for PaymentMethod
  const paymentMethod = await getPaymentMethod(paymentIntent.payment_method);

  // Fetch settled amount and fee
  const paymentIntentId = paymentIntent.id;
  const { fee, net } = await getBalanceTx(paymentIntentId);

  const meta = paymentIntent.metadata as StripeDonation.Metadata;
  const denom = meta.denomination;
  const latestUsdRate = await getUsdRate(apes, GetCommand, denom);

  const body: FinalRecorderPayload = {
    // Settled amounts
    settledFee: toPrettyAmount(fee, "USD"),
    settledNet: toPrettyAmount(net, "USD"),
    // Finalized donation fields
    amount: +meta.amount,
    appUsed: meta.appUsed as Donation.App,
    chainName: "Fiat",
    charityName: meta.charityName,
    denomination: denom,
    email: meta.email,
    endowmentId: +meta.endowmentId,

    fund_id: meta.fund_id,
    fund_members: meta.fund_members?.split(",").map(Number),
    fund_name: meta.fund_name,

    feeAllowance: +(meta.feeAllowance ?? 0),
    fiatRamp: "STRIPE",
    claimed: meta.claimed === "true",
    fiscalSponsored: meta.fiscalSponsored === "true",
    inHonorOf: meta.inHonorOf,
    tributeNotif: meta.tributeNotif && JSON.parse(meta.tributeNotif),
    isRecurring: false,
    network: env,
    nonProfitMsg: meta.nonProfitMsg,
    paymentMethod,
    programId: meta.programId,
    programName: meta.programName,
    splitLiq: meta.splitLiq,
    tipAmount: +(meta.tipAmount ?? 0),
    transactionDate: new Date().toISOString(),
    transactionId: paymentIntentId,
    intentId: meta.transactionId,
    usdValue: +meta.amount / latestUsdRate,
    hideBgTip: meta.hideBgTip === "true",
    // KYC
    title: meta.title,
    kycEmail: meta.kycEmail ?? meta.email,
    fullName: meta.fullName,
    ukGiftAid: meta.ukGiftAid === "true",
    ...(meta.country
      ? {
          streetAddress: meta.streetAddress,
          city: meta.city,
          state: meta.state,
          zipCode: meta.zipCode,
          country: meta.country,
        }
      : {}),
  };

  // Send msg to `final-donation-processor`
  await sendMessage(body);

  const builder = new TxBuilder();

  // Delete if record exists on OnHoldTable
  const intentRecord = await getDonationIntent(meta.transactionId);
  if (intentRecord && intentRecord.transactionId) {
    builder.del({
      TableName: tables.on_hold_donations,
      Key: {
        transactionId: meta.transactionId,
      } satisfies OnHoldDonation.PrimaryKey,
    });
  }

  // Create donation message if applicable
  if (meta.kycEmail && meta.donor_message && meta.donor_public) {
    const date = meta.transactionDate;
    const donor_id = meta.kycEmail;
    const env = meta.network as Environment;
    const recipient_id = meta.fund_id ? meta.fund_id : `${meta.endowmentId}`;
    builder.put({
      TableName: tables.donation_messages,
      Item: {
        PK: `Recipient#${recipient_id}#${env}`,
        SK: date,
        gsi1PK: `Donor#${donor_id}#${env}`,
        gsi1SK: date,
        amount: +meta.usdValue,
        donation_id: paymentIntentId,
        donor_id,
        donor_message: meta.donor_message,
        donor_name: meta.fullName,
        env,
        recipient_id,
      } satisfies DonationMessage.DBRecord,
    });
  }

  await apes.send(new TransactWriteCommand({ TransactItems: builder.txs }));
}
