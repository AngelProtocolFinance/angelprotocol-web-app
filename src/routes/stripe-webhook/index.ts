import { getUnixTime } from "date-fns";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { parse, stage as schema } from "routes/types/donation-message";
import {
  handle_intent_failed,
  handle_intent_requires_action,
  handle_setup_intent_failed,
  handle_setup_intent_succeeded,
} from "./handlers";
import { handle_intent_succeeded } from "./handlers/intent-suceeded";
import { handle_subscription_created } from "./handlers/subscription-created";
import { subsdb } from ".server/aws/db";
import { stripe_envs } from ".server/env";
import { fiat_monitor, stripe } from ".server/sdks";

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
    stripe_envs.webhook_secret
  );

  // Event handlers
  try {
    switch (event.type) {
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
      case "customer.subscription.created": {
        await handle_subscription_created(event.data);
        break;
      }
      case "customer.subscription.updated": {
        const { object: sub } = event.data;
        await subsdb.update(sub.id, {
          next_billing: sub.current_period_end,
        });
        console.info(
          `Updated subscription ${sub.id} next_billing to ${sub.current_period_end}`
        );
        break;
      }
      case "customer.subscription.deleted": {
        const { object: sub } = event.data;
        await subsdb.update(sub.id, {
          status: "cancelled",
          status_cancel_reason: sub.cancellation_details?.comment ?? undefined,
          updated_at: getUnixTime(new Date()),
        });
        console.info(`cancelled subscription ${sub.id}`);
        break;
      }
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
    await fiat_monitor.sendAlert({
      type: "ERROR",
      from: `stripe-event-handler-${stage}`,
      title: "Stripe Event Processing",
      body: errorMessage,
    });
    return new Response(errorMessage, { status: 400 });
  }
};
