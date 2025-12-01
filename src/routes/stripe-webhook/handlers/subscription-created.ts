import { str_id } from "helpers/stripe";
import type { IMetadataSubs } from "lib/stripe";
import type { ISubs } from "lib/subscriptions";
import type Stripe from "stripe";
import { subsdb } from ".server/aws/db";

export async function handle_subscription_created({
  object: subs,
}: Stripe.CustomerSubscriptionCreatedEvent.Data) {
  const { transactionDate, ...m } = subs.metadata as IMetadataSubs;

  const is_fund = Boolean(m.fund_id && m.fund_members?.length) && m.fund_name;

  const record: ISubs = {
    id: subs.id,
    created_at: subs.created,
    updated_at: subs.created,
    next_billing: subs.current_period_end,
    amount: +m.subsQuantity,
    curreny: m.denomination,
    product_id: str_id(subs.items.data[0].price.product),
    to_type: is_fund ? "fund" : "npo",
    to_id: is_fund ? m.fund_id! : m.endowmentId.toString(),
    to_name: is_fund ? m.fund_name! : m.charityName,
    platform: "stripe",
    status: "active",
    env: m.network,
    from_id: m.email,
  };

  const res = await subsdb.put(record);
  console.info(`Created subscription record ${subs.id} `, res);
}
