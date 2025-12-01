import { fromUnixTime } from "date-fns";
import { str_id } from "helpers/stripe";
import type { IMetadataSubs } from "lib/stripe";
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
  const { transactionDate, ...m } = intent.metadata as IMetadataSubs;

  const d = fromUnixTime(intent.created).toISOString();
  /** CREATE SUBSCRIPTION */
  const subs_id = await create_subscription(
    str_id(intent.customer),
    str_id(intent.payment_method),
    { ...m, transactionDate: d }
  );

  console.info(`Created subscription ${subs_id} for setup intent ${intent.id}`);
}
