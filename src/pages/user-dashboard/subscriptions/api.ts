import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { ActionData } from "types/action";
import { cognito, toAuth } from ".server/auth";
import { stripe } from ".server/sdks";

export interface SubsItem {
  id: string;
  recipient: { name: string; id: string; type: "fund" | "npo" };
  amount: number;
  denom: string;
  next_payment: string;
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

  const subs = await stripe.subscriptions.list({
    customer: stripe_customer_id,
  });

  const items = subs.data.map((x) => {
    return {
      id: x.id,
      recipient: x.metadata.fund_id
        ? {
            name: x.metadata.fund_name,
            id: x.metadata.fund_id,
            type: "fund",
          }
        : {
            name: x.metadata.charityName,
            id: x.metadata.npo_id,
            type: "npo",
          },
    };
  });
  return { subs: subs.data } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const path = `${ver(3)}/users/${user.email}/endowments`;
  await ap.patch(path, {
    headers: { authorization: user.idToken },
    json: { alertPrefs: await request.json() },
  });
  return { __ok: "Settings updated" } satisfies ActionData;
};
