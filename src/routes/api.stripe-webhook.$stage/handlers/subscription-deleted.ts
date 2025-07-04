import type { Subscription } from "@better-giving/donation/subscription";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { DeleteCommand, apes } from ".server/aws/db";

/** Removes record from subscription DB */
export async function handle_subscription_deleted({
  object,
}: Stripe.CustomerSubscriptionDeletedEvent.Data) {
  return apes.send(
    new DeleteCommand({
      TableName: tables.subscriptions,
      Key: { subscription_id: object.id } satisfies Subscription.PrimaryKey,
      ConditionExpression: "attribute_exists(subscription_id)",
    })
  );
}
