import { fromUnixTime } from "date-fns";
import { str_id } from "helpers/stripe";
import type { IMetadata, IMetadataSubs } from "lib/stripe";
import type Stripe from "stripe";
import { type Settled, to_final } from "../../helpers/donation";
import { to_onhold } from "../../helpers/donation-metadata";
import { payment_method } from "../helpers/payment-method";
import { settled_fn } from "../helpers/settled";
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
    const d = fromUnixTime(intent.created).toISOString();
    const { transactionDate, ...m } = intent.metadata as IMetadata;
    const order = to_onhold(
      { ...m, transactionDate: d },
      { payment_method: pm, status: "pending" }
    );
    const final = to_final(order, settled);
    return qstash.publishJSON({
      body: final,
      url: `${base_url}/q/final-recorder`,
      retries: 0,
      deduplicationId: intent.id,
    });
  }

  // PaymentIntent Event does not contain subs metadata so we query for Invoice
  const { subscription, subscription_details, hosted_invoice_url, created } =
    await stripe.invoices.retrieve(str_id(intent.invoice));

  const subs_meta = subscription_details?.metadata as IMetadataSubs | null;
  if (!subs_meta) throw "missing subs metadata";

  const { transactionDate, ...sm } = subs_meta;
  const d = fromUnixTime(created).toISOString();
  const onhold = to_onhold(
    { ...sm, transactionDate: d },
    {
      payment_method: pm,
      status: "pending",
    }
  );

  // unique tx id per record
  const final = to_final({ ...onhold, transactionId: intent.id }, settled);
  const res = await qstash.publishJSON({
    body: final,
    url: `${base_url}/q/final-recorder`,
    retries: 0,
    deduplicationId: intent.id,
  });

  console.info(`Final donation record sent:${res.messageId}`);
}

// One time payment intents have their own `metadata` unlike subs payment intents which comes from invoice
function is_onetime(metadata: any): metadata is IMetadata {
  return Object.keys(metadata).length > 0;
}
