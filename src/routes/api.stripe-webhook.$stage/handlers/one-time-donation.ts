import type {
  Donation,
  OnHoldDonation,
  StripeDonation,
} from "@better-giving/donation";
import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import { toPrettyAmount } from "@better-giving/helpers";
import { getUsdRate } from "@better-giving/helpers-db";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { getDonationIntent, sendMessage } from "../helpers";
import { DeleteCommand, GetCommand, apes } from ".server/aws/db";
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
    // Donation message
    donor_message: meta.donor_message,
    donor_public: meta.donor_public === "true",
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

  // Delete if record exists on OnHoldTable
  const intentRecord = await getDonationIntent(meta.transactionId);
  if (intentRecord && intentRecord.transactionId) {
    await apes.send(
      new DeleteCommand({
        TableName: tables.on_hold_donations,
        Key: {
          transactionId: meta.transactionId,
        } satisfies OnHoldDonation.PrimaryKey,
      })
    );
  }
}
