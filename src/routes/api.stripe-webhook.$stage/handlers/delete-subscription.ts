import { DeleteCommand, SubsTable, apesDynamo } from "../sdk.mjs";

import type { Subscription } from "@better-giving/donation/subscription";
import type Stripe from "stripe";

/** Removes record from subscription DB */
export async function handleDeleteSubscription({
  object,
}: Stripe.CustomerSubscriptionDeletedEvent.Data) {
  await apesDynamo.send(
    new DeleteCommand({
      TableName: SubsTable,
      Key: { subscription_id: object.id } satisfies Subscription.PrimaryKey,
      ConditionExpression: "attribute_exists(subscription_id)",
    })
  );
}
