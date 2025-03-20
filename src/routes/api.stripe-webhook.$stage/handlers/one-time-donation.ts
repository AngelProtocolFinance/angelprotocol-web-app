import type { Donation, StripeDonation } from "@better-giving/donation";
import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import { toPrettyAmount } from "@better-giving/helpers";
import { getUsdRate } from "@better-giving/helpers-db";
import type Stripe from "stripe";
import { getDonationIntent, isLegacy, sendMessage } from "../helper.mjs";
import { GetCommand, apesDynamo } from "../sdk.mjs";
import stripeClient from "../stripe-client.mjs";

/**
 * Queries data for "intent" donation then creates new donation record with `status === "pending"` and
 * deletes the "intent" donation record
 */
export async function handleOneTimeDonation({
  object: paymentIntent,
}: Stripe.PaymentIntentSucceededEvent.Data) {
  if (typeof paymentIntent.payment_method !== "string")
    throw new Error("Invalid payment method ID for subscription");

  const env = paymentIntent.livemode ? "production" : "staging";
  const stripe = await stripeClient(paymentIntent.livemode);

  // PaymentIntent Event does not have expandable field so we query for PaymentMethod
  const paymentMethod = await stripe.getPaymentMethod(
    paymentIntent.payment_method
  );

  const paymentIntentId = paymentIntent.id;

  // Fetch settled amount and fee
  const { fee, net } = await stripe.getBalanceTx(paymentIntentId);

  const meta = paymentIntent.metadata as
    | StripeDonation.Metadata
    | StripeDonation.LegacyMetadata;

  if (!isLegacy(meta)) {
    const denom = meta.denomination;
    const latestUsdRate = await getUsdRate(apesDynamo, GetCommand, denom);

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
  } else {
    // TODO: can be removed in the near future
    const intent = await getDonationIntent(meta.intent_tx_id);

    // Check if intent record is already updated via `updatePendingItem`, if true skip below processes
    if (!intent) return;

    const denom = intent.denomination;
    const latestUsdRate = await getUsdRate(apesDynamo, GetCommand, denom);

    const body: FinalRecorderPayload = {
      // Settled amounts
      settledFee: toPrettyAmount(fee, "USD"),
      settledNet: toPrettyAmount(net, "USD"),
      // Finalized donation fields
      amount: intent.amount,
      appUsed: intent.appUsed as Donation.App,
      chainName: "Fiat",
      charityName: intent.charityName,
      denomination: denom,
      email: intent.email,
      endowmentId: +intent.endowmentId,

      fund_id: intent.fund_id,
      fund_members: intent.fund_members,
      fund_name: intent.fund_name,

      feeAllowance: +(intent.feeAllowance ?? 0),
      fiatRamp: "STRIPE",
      claimed: intent.claimed,
      fiscalSponsored: intent.fiscalSponsored,
      inHonorOf: intent.inHonorOf,
      tributeNotif: intent.tributeNotif,
      isRecurring: false,
      network: env,
      nonProfitMsg: intent.nonProfitMsg,
      paymentMethod,
      programId: intent.programId,
      programName: intent.programName,
      splitLiq: intent.splitLiq,
      tipAmount: +(intent.tipAmount ?? 0),
      transactionDate: new Date().toISOString(),
      transactionId: paymentIntentId,
      intentId: meta.intent_tx_id,
      usdValue: intent.amount / latestUsdRate,
      hideBgTip: !!intent.hideBgTip,
      // KYC
      ...(intent.kycEmail
        ? {
            kycEmail: intent.kycEmail,
            title: intent.title,
            fullName: intent.fullName,
            ukGiftAid: intent.ukGiftAid,
            ...("country" in intent
              ? {
                  streetAddress: intent.streetAddress,
                  city: intent.city,
                  state: intent.state,
                  zipCode: intent.zipCode,
                  country: intent.country,
                }
              : {}),
          }
        : ({} as Donation.WithoutKYC)),
    };

    await sendMessage(body);
  }
}
