import type { StripeDonation } from "@better-giving/donation";
import type { Subscription } from "@better-giving/donation/subscription";
import { TxBuilder } from "@better-giving/helpers-db";
import { tables } from "@better-giving/types/list";
import type Stripe from "stripe";
import { type Settled, to_final } from "../../helpers/donation";
import { to_onhold } from "../../helpers/donation-metadata";
import { getBalanceTx } from "../helpers/balance-tx";
import { payment_method } from "../helpers/payment-method";
import { getSubsInvoice } from "../helpers/subs-invoice";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { qstash } from ".server/sdks";

/**
 * Sends message to `final-donation-processor` for DB recording
 * Updates record in subscription DB and deletes record in on hold donations DB if applicable
 */

export async function handleUpdateSubscription(
  pi: Stripe.PaymentIntent,
  origin: string
) {
  if (!pi.invoice || typeof pi.invoice === "object")
    throw new Error("Invalid invoice ID for subscription");

  // PaymentIntent Event does not contain subs metadata so we query for Invoice
  const {
    subscription: subsId,
    subscription_details: subsDetails,
    hosted_invoice_url,
  } = await getSubsInvoice(pi.invoice);

  if (typeof subsId !== "string")
    throw new Error("Invoice is not for subscription");

  if (
    !subsDetails ||
    !subsDetails.metadata ||
    Object.keys(subsDetails.metadata).length === 0
  )
    throw new Error("Invalid subscription metadata");

  // Setup intent metadata is transferred to subs metadata when creating it
  const meta = subsDetails.metadata as StripeDonation.SetupIntentMetadata;

  if ((!meta.endowmentId || +meta.endowmentId < 0) && !meta.fund_id)
    throw new Error(
      `Endowment ID must be a positive number, provided value was: ${meta.endowmentId}`
    );

  if (!pi.payment_method || typeof pi.payment_method === "object")
    throw new Error("Invalid payment method ID for subscription");

  // Fetch settled amount and fee
  const { fee, net } = await getBalanceTx(pi.id);

  const onhold = to_onhold(meta, {
    //PaymentIntent Event does not have expandable field so we query for PaymentMethod
    payment_method: await payment_method(pi.payment_method),
  });
  const settled: Settled = {
    fee,
    net,
    in: { id: "fiat", currency: "USD" },
  };
  const final = to_final(onhold, settled);

  const res = await qstash.publishJSON({
    body: final,
    url: `${origin}/q/final-recorder`,
    retries: 0,
    deduplicationId: pi.id,
  });

  console.log(`Final donation record sent:${res.messageId}`);

  // DB Ops
  const builder = new TxBuilder();
  builder.update({
    TableName: tables.subscriptions,
    Key: { subscription_id: subsId } satisfies Subscription.PrimaryKey,
    UpdateExpression: "SET latest_invoice = :latest_invoice, #status = :status",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":latest_invoice": hosted_invoice_url || "",
      ":status": "active",
    },
  });

  await apes.send(new TransactWriteCommand({ TransactItems: builder.txs }));
}
