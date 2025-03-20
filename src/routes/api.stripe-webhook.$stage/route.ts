import type { ActionFunction } from "@vercel/remix";
import { parse, stage as schema } from "routes/types";
import type Stripe from "stripe";
// import { handleConfirming } from "./handlers/confirming";
// import { handleExpired } from "./handlers/expired";
// import { handleFailed } from "./handlers/failed";
// import { handleSettled } from "./handlers/settled";
// import { handleWaiting } from "./handlers/waiting";
import { stripeEnvs } from ".server/env";
import { discordAwsMonitor, stripe } from ".server/sdks";

/**
 * Webhook signing logic inspired by stripe-node,
 * @see {@link https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/nextjs/app/api/webhooks/route.ts}
 */
export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const stage = parse(schema, params.stage);

  let event: Stripe.Event;
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Forbidden", { status: 403 });

  // Webhook signing
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      stripeEnvs.webhookSecret
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : JSON.stringify(err, Object.getOwnPropertyNames(err));
    await discordAwsMonitor.sendAlert({
      from: `stripe-webhook-${stage}`,
      title: "Webhook error",
      body: errorMessage,
    });
    return new Response(errorMessage, { status: 400 });
  }

  // TODO: create diff event handlers here

  return new Response("Received", { status: 200 });
};
