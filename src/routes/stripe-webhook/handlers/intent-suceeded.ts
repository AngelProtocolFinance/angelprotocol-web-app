import type { IMetadata, IMetadataSubs } from "@better-giving/stripe";
import { str_id } from "helpers/stripe";
import { to_onhold } from "routes/helpers/donation-metadata";
import type Stripe from "stripe";
import { type Settled, to_final } from "../../helpers/donation";
import { payment_method } from "../helpers/payment-method";
import { settled_fn } from "../helpers/settled";
import { subsdb } from ".server/aws/db";
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
    const meta = intent.metadata as IMetadata;
    const order = to_onhold(meta, { payment_method: pm, status: "pending" });
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

  const subs_meta = subscription_details?.metadata as IMetadataSubs | null;
  if (!subs_meta) throw "missing subs metadata";

  const onhold = to_onhold(subs_meta, {
    payment_method: pm,
    status: "pending",
  });

  // unique tx id per record
  const final = to_final({ ...onhold, transactionId: intent.id }, settled);
  const res = await qstash.publishJSON({
    body: final,
    url: `${base_url}/q/final-recorder`,
    retries: 0,
    deduplicationId: intent.id,
  });

  console.info(`Final donation record sent:${res.messageId}`);

  await subsdb.update(str_id(subscription), {
    latest_invoice: hosted_invoice_url || "",
    status: "active",
  });
}

// One time payment intents have their own `metadata` unlike subs payment intents which comes from invoice
function is_onetime(metadata: any): metadata is IMetadata {
  return Object.keys(metadata).length > 0;
}
