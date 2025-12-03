import { str_id } from "helpers/stripe";
import type { IMetadataSubs } from "lib/stripe";
import type { ISubs } from "lib/subscriptions";
import type Stripe from "stripe";
import { subsdb } from ".server/aws/db";

export async function handle_subscription_created({
  object: sub,
}: Stripe.CustomerSubscriptionCreatedEvent.Data) {
  const { transactionDate, ...m } = sub.metadata as IMetadataSubs;

  const is_fund = Boolean(m.fund_id && m.fund_members?.length) && m.fund_name;
  const p = sub.items.data[0].price;

  if (!p.recurring)
    throw new Error(
      `price:${p.id} is not recurring on subscription:${sub.id} price`
    );

  const record: ISubs = {
    id: sub.id,
    created_at: sub.created,
    updated_at: sub.created,
    interval: p.recurring.interval,
    interval_count: p.recurring.interval_count,
    next_billing: sub.current_period_end,
    amount: +m.subsQuantity,
    curreny: m.denomination,
    product_id: str_id(sub.items.data[0].price.product),
    to_type: is_fund ? "fund" : "npo",
    to_id: is_fund ? m.fund_id! : m.endowmentId.toString(),
    to_name: is_fund ? m.fund_name! : m.charityName,
    platform: "stripe",
    status: "active",
    env: m.network,
    from_id: m.email,
  };

  const res = await subsdb.put(record);
  console.info(`Created subscription record ${sub.id} `, res);
}
