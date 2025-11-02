import type { IMetadataSubs } from "@better-giving/stripe";
import { str_id } from "helpers/stripe";
import type Stripe from "stripe";
import { subsdb } from ".server/aws/db";
import { create_subscription } from ".server/stripe/create-subscription";

/**
 * Updates Customer's default payment method which will be used for recurring payments.
 * Creates Subscription object in Stripe.
 * Creates an item in subscriptions DB table.
 */
export async function handle_setup_intent_succeeded({
  object: intent,
}: Stripe.SetupIntentSucceededEvent.Data) {
  const metadata = intent.metadata as IMetadataSubs;

  /** CREATE SUBSCRIPTION */
  const subs_id = await create_subscription(
    str_id(intent.customer),
    str_id(intent.payment_method),
    metadata
  );

  await subsdb.put({
    subscription_id: subs_id,
    app_used: metadata.appUsed as any,
    charity_name: metadata.charityName,
    customer_id: str_id(intent.customer),
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
  });
}
