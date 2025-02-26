import { intent as schema } from "@better-giving/donation/intent";
import type { ActionFunction } from "@vercel/remix";
import { parse } from "valibot";
import { createPayment } from ".server/crypto-intent/crypto-intent";

export const action: ActionFunction = async ({ request }) => {
  const intent = parse(schema, await request.json());

  const payment = await createPayment(intent);
  if (Array.isArray(payment)) {
    return new Response(payment[1], { status: payment[0] });
  }
  return new Response(JSON.stringify(payment), {
    headers: { "content-type": "application/json" },
  });
};
