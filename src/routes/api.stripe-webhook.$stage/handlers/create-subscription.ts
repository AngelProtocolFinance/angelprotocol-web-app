import type { Donation, StripeDonation } from "@better-giving/donation";
import type { Subscription } from "@better-giving/donation/subscription";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { PutCommand, apes } from ".server/aws/db";
import { createSubscription } from ".server/stripe/action";

/**
 * Updates Customer's default payment method which will be used for recurring payments.
 * Creates Subscription object in Stripe.
 * Creates an item in subscriptions DB table.
 */
export async function handleCreateSubscription({
  object: intent,
}: Stripe.SetupIntentSucceededEvent.Data) {
  if (!intent.metadata || Object.keys(intent.metadata).length === 0)
    throw new Error("Invalid intent metadata");

  const metadata = intent.metadata as StripeDonation.SetupIntentMetadata;

  if ((!metadata.endowmentId || +metadata.endowmentId < 0) && !metadata.fund_id)
    throw new Error(
      `Endowment ID must be a positive number, provided value was: ${+metadata.endowmentId}`
    );

  if (
    typeof intent.customer !== "string" ||
    typeof intent.payment_method !== "string"
  ) {
    throw new Error("Invalid Customer or Payment Method ID");
  }

  /** CREATE SUBSCRIPTION */
  const subs = await createSubscription(
    intent.customer,
    intent.payment_method,
    metadata
  );

  /** SUBS DB RECORD CREATION */
  const subsFields: Subscription.DBRecord = {
    subscription_id: subs,
    app_used: metadata.appUsed as Donation.App,
    charity_name: metadata.charityName,
    customer_id: intent.customer,
    email: metadata.email,
    endowment_id: +metadata.endowmentId,
    fiat_ramp: "STRIPE",
    /** Stripe only allows string, number or undefined as `metadata` values */
    fiscal_sponsored: metadata.fiscalSponsored === "true",
    hide_bg_tip: metadata.hideBgTip === "true",
    network: intent.livemode ? "production" : "staging",
    product_id: metadata.productId,
    quantity: +metadata.subsQuantity || 1,
    split_liq: metadata.splitLiq || "50",
    status: "incomplete",
  };

  await apes.send(
    new PutCommand({
      TableName: tables.subscriptions,
      Item: subsFields,
    })
  );
}
