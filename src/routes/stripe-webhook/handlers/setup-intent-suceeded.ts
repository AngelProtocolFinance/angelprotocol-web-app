import { fromUnixTime } from "date-fns";
import { str_id, to_atomic } from "helpers/stripe";
import type { IMetadataSubs } from "lib/stripe";
import type Stripe from "stripe";
import { stripe_envs } from ".server/env";
import { stripe } from ".server/sdks";

export async function handle_setup_intent_succeeded({
  object: intent,
}: Stripe.SetupIntentSucceededEvent.Data) {
  const { transactionDate, ...m } = intent.metadata as IMetadataSubs;

  const c = m.denomination.toLowerCase();

  const { id: price_id } = await stripe.prices.create({
    active: true,
    billing_scheme: "per_unit",
    currency: c,
    product: stripe_envs.subs_product_id,
    recurring: { interval: "month", interval_count: 1 },
    unit_amount: to_atomic(1, c),
  });

  const cust_id = str_id(intent.customer);
  const { id: subs_id } = await stripe.subscriptions.create({
    customer: cust_id,
    default_payment_method: str_id(intent.payment_method),
    currency: c,
    items: [{ price: price_id, quantity: +m.amount }],
    metadata: {
      ...m,
      transactionDate: fromUnixTime(intent.created).toISOString(),
    },
    off_session: true,
  });

  console.info(`Created subscription ${subs_id} for setup intent ${intent.id}`);
}
