import { intent as schema } from "@better-giving/donation/intent";
import type { ActionFunction } from "@vercel/remix";
import { parse } from "valibot";
import { createStripeIntent } from ".server/fiat-intent/stripe";

export const action: ActionFunction = async ({ request }) => {
  const intent = parse(schema, await request.json());

  const stripeIntent = await createStripeIntent(intent);
  if (Array.isArray(stripeIntent)) {
    return new Response(stripeIntent[1], { status: stripeIntent[0] });
  }
  return new Response(JSON.stringify(stripeIntent), {
    headers: { "content-type": "application/json" },
  });
};
