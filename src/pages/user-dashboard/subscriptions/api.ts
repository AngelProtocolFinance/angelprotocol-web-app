import type { StripeDonation } from "@better-giving/donation";
import type { LoaderFunction } from "@vercel/remix";
import type Stripe from "stripe";
import { cognito, toAuth } from ".server/auth";
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

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const { stripe_customer_id } = user;
  if (!stripe_customer_id) {
    return { subs: [] } satisfies LoaderData;
  }

  const customers = await stripe.customers.search({
    expand: ["data.subscriptions"], // needed so we can check if customer has existing subs
    query: `email:"${user.email}"`,
  });

  const items = customers.data
    .flatMap((x) => x.subscriptions?.data || [])
    .map<SubsItem>((x) => {
      const meta = x.metadata as StripeDonation.Metadata;
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
