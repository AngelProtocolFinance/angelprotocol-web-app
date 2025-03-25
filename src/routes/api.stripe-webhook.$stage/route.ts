import type { StripeDonation } from "@better-giving/donation";
import type { ActionFunction } from "@vercel/remix";
import { parse, stage as schema } from "routes/types";
import type Stripe from "stripe";
import {
  handleCreateSubscription,
  handleDeleteSubscription,
  handleIntentFailed,
  handleIntentRequiresAction,
  handleOneTimeDonation,
  handleUpdateSubscription,
} from "./handlers";
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
    await discordFiatMonitor.sendAlert({
      type: "ERROR",
      from: `stripe-webhook-${stage}`,
      title: "Webhook Signing",
      body: errorMessage,
    });
    return new Response(errorMessage, { status: 400 });
  }

  // Filter for event `requires_action`, exclude if type is not `verify_with_microdeposits`
  if (
    (event.type === "payment_intent.requires_action" ||
      event.type === "setup_intent.requires_action") &&
    event.data.object.next_action?.type !== "verify_with_microdeposits"
  )
    return new Response(`Invalid event type, ${event.type}`, { status: 400 });

  // Event handlers
  try {
    switch (event.type) {
      case "customer.subscription.deleted":
        await handleDeleteSubscription(event.data);
        break;
      case "payment_intent.succeeded":
        if (isOneTime(event.data.object.metadata))
          await handleOneTimeDonation(event.data);
        else await handleUpdateSubscription(event.data);
        break;
      case "setup_intent.succeeded":
        await handleCreateSubscription(event.data);
        break;
      case "payment_intent.payment_failed":
      case "setup_intent.setup_failed":
        const reason = await handleIntentFailed(event);
        await discordFiatMonitor.sendAlert({
          from: `stripe-event-handler-${stage}`,
          title: "Intent Failed",
          body: `Intent ID: ${event.data.object.id}\nReason: ${reason}`,
        });
        return new Response("Received", { status: 200 });
      case "payment_intent.requires_action":
      case "setup_intent.requires_action":
        await handleIntentRequiresAction(event);
        break;
      default:
        throw new Error(`Invalid event type, ${event.type}`);
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

// One time payment intents have their own `metadata` unlike subs payment intents which comes from invoice
function isOneTime(metadata: any): metadata is StripeDonation.Metadata {
  return Object.keys(metadata).length > 0;
}
