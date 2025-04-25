import type { Donation, StripeDonation } from "@better-giving/donation";
import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import type { Subscription } from "@better-giving/donation/subscription";
import { toPrettyAmount } from "@better-giving/helpers";
import { TxBuilder } from "@better-giving/helpers-db";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { getDonationIntent, sendMessage } from "../helpers";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";
import {
  getBalanceTx,
  getPaymentMethod,
  getSubsInvoice,
} from ".server/stripe/get";

/**
 * Sends message to `final-donation-processor` for DB recording
 * Updates record in subscription DB and deletes record in on hold donations DB if applicable
 */
export async function handleUpdateSubscription({
  object: paymentIntent,
}: Stripe.PaymentIntentSucceededEvent.Data) {
  if (!paymentIntent.invoice || typeof paymentIntent.invoice === "object")
    throw new Error("Invalid invoice ID for subscription");

  // PaymentIntent Event does not contain subs metadata so we query for Invoice
  const {
    subscription: subsId,
    subscription_details: subsDetails,
    hosted_invoice_url,
  } = await getSubsInvoice(paymentIntent.invoice);

  if (typeof subsId !== "string")
    throw new Error("Invoice is not for subscription");

  if (
    !subsDetails ||
    !subsDetails.metadata ||
    Object.keys(subsDetails.metadata).length === 0
  )
    throw new Error("Invalid subscription metadata");

  // Setup intent metadata is transferred to subs metadata when creating it
  const meta = subsDetails.metadata as StripeDonation.SetupIntentMetadata;

  if ((!meta.endowmentId || +meta.endowmentId < 0) && !meta.fund_id)
    throw new Error(
      `Endowment ID must be a positive number, provided value was: ${meta.endowmentId}`
    );

  if (
    !paymentIntent.payment_method ||
    typeof paymentIntent.payment_method === "object"
  )
    throw new Error("Invalid payment method ID for subscription");

  // PaymentIntent Event does not have expandable field so we query for PaymentMethod
  const paymentMethod = await getPaymentMethod(paymentIntent.payment_method);

  // Fetch settled amount and fee
  const { amount: gross, fee, net } = await getBalanceTx(paymentIntent.id);

  const settledAmt = toPrettyAmount(gross, "USD");

  const body: FinalRecorderPayload = {
    // Settled amounts
    settledFee: toPrettyAmount(fee, "USD"),
    settledNet: toPrettyAmount(net, "USD"),
    // Finalized donation fields
    amount: +meta.amount,
    appUsed: meta.appUsed as Donation.App,
    chainName: "Fiat",
    charityName: meta.charityName,
    denomination: meta.denomination,
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
    isRecurring: true,
    network: env,
    nonProfitMsg: meta.nonProfitMsg,
    paymentMethod,
    programId: meta.programId,
    programName: meta.programName,
    splitLiq: meta.splitLiq,
    tipAmount: +(meta.tipAmount ?? 0),
    transactionDate: new Date().toISOString(),
    transactionId: paymentIntent.id,
    usdValue: settledAmt,
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

  // DB Ops
  const builder = new TxBuilder();
  builder.update({
    TableName: tables.subscriptions,
    Key: { subscription_id: subsId } satisfies Subscription.PrimaryKey,
    UpdateExpression: "SET latest_invoice = :latest_invoice, #status = :status",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":latest_invoice": hosted_invoice_url || "",
      ":status": "active",
    },
  });

  const intentRecord = await getDonationIntent(meta.transactionId);
  if (intentRecord && intentRecord.transactionId) {
    builder.del({
      TableName: tables.on_hold_donations,
      Key: { transactionId: meta.transactionId } satisfies Donation.PrimaryKey,
    });
  }

  await apes.send(new TransactWriteCommand({ TransactItems: builder.txs }));
}
