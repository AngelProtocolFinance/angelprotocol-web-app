import type { IMetadata } from "lib/stripe";
import type Stripe from "stripe";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { stripe } from ".server/sdks";

export interface SubsItem {
  id: string;
  recipient: { name: string; id: string; type: "fund" | "npo" };
  amount: number;
  amount_usd: number;
  denom: string;
  next_payment: string;
  status: Stripe.Subscription.Status;
}

export interface LoaderData {
  subs: SubsItem[];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const res = await stripe.customers.search({
    expand: ["data.subscriptions"], // needed so we can check if customer has existing subs
    query: `email:"${user.email}"`,
  });

  const subs = res.data.flatMap((x) => x.subscriptions?.data || []);
  const items = subs.map<SubsItem>((x) => {
    const meta = x.metadata as unknown as IMetadata;
    const recipient: SubsItem["recipient"] = meta.fund_id
      ? {
          type: "fund",
          id: meta.fund_id,
          name: meta.fund_name || "Unknown Fund",
        }
      : {
          type: "npo",
          id: meta.endowmentId,
          name: meta.charityName,
        };

    return {
      id: x.id,
      recipient,
      amount: +meta.amount,
      denom: x.currency.toUpperCase(),
      amount_usd: +meta.usdValue,
      next_payment: new Date(x.current_period_end * 1000).toISOString(),
      status: x.status,
    } satisfies SubsItem;
  });
  return { subs: items };
};
