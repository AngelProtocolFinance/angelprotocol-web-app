import type { ActionFunction } from "@vercel/remix";
import { parse, stage as schema } from "routes/types/donation-message";
import { resp } from "../helpers/resp";
import {
  handle_intent_failed,
  handle_intent_requires_action,
  handle_setup_intent_failed,
  handle_setup_intent_succeeded,
  handle_subscription_deleted,
} from "./handlers";
import { handle_intent_succeeded } from "./handlers/intent-suceeded";
import { stripeEnvs } from ".server/env";
import { discordFiatMonitor, stripe } from ".server/sdks";

/**
 * Webhook signing logic inspired by stripe-node,
 * @see {@link https://github.com/stripe/stripe-node/blob/master/examples/webhook-signing/nextjs/app/api/webhooks/route.ts}
 */
export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const stage = parse(schema, params.stage);
  const base_url = new URL(request.url).origin;
  const signature = request.headers.get("stripe-signature");
  if (!signature) return resp.err(403, "missing signature header");

  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    stripeEnvs.webhookSecret
  );

  // Event handlers
  try {
    switch (event.type) {
      case "customer.subscription.deleted":
        const res = await handle_subscription_deleted(event.data);
        return resp.json(res.$metadata);
      case "payment_intent.succeeded":
        await handle_intent_succeeded(event.data, base_url);
        break;
      case "setup_intent.succeeded":
        await handle_setup_intent_succeeded(event.data);
        break;
      case "payment_intent.payment_failed":
        await handle_intent_failed(event.data);
        break;
      case "setup_intent.setup_failed":
        await handle_setup_intent_failed(event.data);
        break;
      case "payment_intent.requires_action":
      case "setup_intent.requires_action":
        if (
          event.data.object.next_action?.type !== "verify_with_microdeposits"
        ) {
          return resp.txt(
            `requires_action next action type not supported: ${event.type}`,
            201
          );
        }
        await handle_intent_requires_action(event.data.object);
        break;
      default:
        return new Response(`Unhandled event type: ${event.type}`, {
          status: 201,
        });
    }

    return new Response("Received", { status: 200 });
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : JSON.stringify(err, Object.getOwnPropertyNames(err));
    await discordFiatMonitor.sendAlert({
      type: "ERROR",
      from: `stripe-event-handler-${stage}`,
      title: "Stripe Event Processing",
      body: errorMessage,
    });
    return new Response(errorMessage, { status: 400 });
  }
};
