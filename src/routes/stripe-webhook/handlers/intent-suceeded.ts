import type { StripeDonation } from "@better-giving/donation";
import type { Subscription } from "@better-giving/donation/subscription";
import { tables } from "@better-giving/types/list";
import { to_onhold } from "routes/helpers/donation-metadata";
import type Stripe from "stripe";
import { type Settled, to_final } from "../../helpers/donation";
import { str_id } from "../../helpers/stripe";
import { payment_method } from "../helpers/payment-method";
import { settled_fn } from "../helpers/settled";
import { UpdateCommand, apes } from ".server/aws/db";
import { qstash, stripe } from ".server/sdks";

export async function handle_intent_succeeded(
  { object: intent }: Stripe.PaymentIntentSucceededEvent.Data,
  base_url: string
) {
  //PaymentIntent Event does not have expandable field so we query for PaymentMethod
  // Fetch settled amount and fee
  const [{ fee, net }, pm] = await Promise.all([
    settled_fn(intent.id),
    payment_method(str_id(intent.payment_method)),
  ]);
  const settled: Settled = {
    fee,
    net,
    in: { id: "fiat", currency: "USD", hash: intent.id },
  };

  if (is_onetime(intent.metadata)) {
    const meta = intent.metadata as StripeDonation.Metadata;
    const order = to_onhold(meta, { payment_method: pm });
    const final = to_final(order, settled);
    return qstash.publishJSON({
      body: final,
      url: `${base_url}/q/final-recorder`,
      retries: 0,
      deduplicationId: intent.id,
    });
  }

  // PaymentIntent Event does not contain subs metadata so we query for Invoice
  const { subscription, subscription_details, hosted_invoice_url } =
    await stripe.invoices.retrieve(str_id(intent.invoice));

  const subs_meta =
    subscription_details?.metadata as StripeDonation.SetupIntentMetadata | null;
  if (!subs_meta) throw `missing subs metadata`;

  const onhold = to_onhold(subs_meta, { payment_method: pm });
  const final = to_final(onhold, settled);

  const res = await qstash.publishJSON({
    body: final,
    url: `${base_url}/q/final-recorder`,
    retries: 0,
    deduplicationId: intent.id,
  });

  console.info(`Final donation record sent:${res.messageId}`);

  const subs_update = new UpdateCommand({
    TableName: tables.subscriptions,
    Key: {
      subscription_id: str_id(subscription),
    } satisfies Subscription.PrimaryKey,
    UpdateExpression: "SET latest_invoice = :latest_invoice, #status = :status",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":latest_invoice": hosted_invoice_url || "",
      ":status": "active",
    },
  });

  await apes.send(subs_update);
}

// One time payment intents have their own `metadata` unlike subs payment intents which comes from invoice
function is_onetime(metadata: any): metadata is StripeDonation.Metadata {
  return Object.keys(metadata).length > 0;
}
