import { fromUnixTime } from "date-fns";
import { rd2num } from "helpers/decimal";
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
  const unit_per_usd = +m.amount / +m.usdValue;

  const { id: price_id } = await stripe.prices.create({
    active: true,
    billing_scheme: "per_unit",
    /** all prices are usd based */
    currency: "usd",
    currency_options: {
      [c]: { unit_amount: to_atomic(unit_per_usd, c) },
    },
    product: stripe_envs.subs_product_id,
    recurring: { interval: "month", interval_count: 1 },
    unit_amount: 100, // 1 usd in cents
  });

  const cust_id = str_id(intent.customer);
  const { id: subs_id } = await stripe.subscriptions.create({
    customer: cust_id,
    default_payment_method: str_id(intent.payment_method),
    currency: c,
    items: [{ price: price_id, quantity: rd2num(m.usdValue, 0) }],
    metadata: {
      ...m,
      transactionDate: fromUnixTime(intent.created).toISOString(),
    },
    off_session: true,
  });

  console.info(`Created subscription ${subs_id} for setup intent ${intent.id}`);
}
