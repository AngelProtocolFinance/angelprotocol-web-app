import type { StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";
import { type Settled, to_final } from "../../helpers/donation";
import { to_onhold } from "../../helpers/donation-metadata";
import { getBalanceTx } from "../helpers/balance-tx";
import { payment_method } from "../helpers/payment-method";
import { qstash } from ".server/sdks";

/**
 * Sends message to `final-donation-processor` for DB recording
 * and deletes record in on hold donations DB if applicable
 */
export async function handleOneTimeDonation(
  intent: Stripe.PaymentIntent,
  origin: string
) {
  if (typeof intent.payment_method !== "string")
    throw new Error("Invalid payment method ID for subscription");

  // Fetch settled amount and fee
  const { fee, net } = await getBalanceTx(intent.id);

  const meta = intent.metadata as StripeDonation.Metadata;

  const settled: Settled = {
    fee,
    net,
    in: { id: "fiat", currency: "USD", hash: intent.id },
  };
  const order = to_onhold(meta, {
    payment_method: await payment_method(intent.payment_method),
  });
  const final = to_final(order, settled);
  return qstash.publishJSON({
    body: final,
    url: `${origin}/q/final-recorder`,
    retries: 0,
    deduplicationId: intent.id,
  });
}
