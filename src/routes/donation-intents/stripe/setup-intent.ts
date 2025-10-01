import type { IDonationOnHoldAttr } from "@better-giving/donation";
import type { IMetadataSubs } from "@better-giving/stripe";
import { round_number } from "helpers/round-number";
import { to_metadata } from "../../helpers/donation-metadata";
import { stripe_envs } from ".server/env";
import { stripe } from ".server/sdks";
import { nonsubs_pm, payment_methods } from ".server/stripe/payment-methods";

export async function setup_intent(
  order: IDonationOnHoldAttr,
  customer_id: string
): Promise<string> {
  const { client_secret } = await stripe.setupIntents.create({
    customer: customer_id,
    payment_method_options: {
      acss_debit: {
        currency: "cad",
        mandate_options: {
          interval_description: "Monthly donations",
          payment_schedule: "interval",
          transaction_type: "business",
        },
        verification_method: "automatic",
      },
    },
    payment_method_types: (
      payment_methods[order.denomination] ?? ["card"]
    ).filter(nonsubs_pm),

    metadata: {
      ...to_metadata(order),
      productId: stripe_envs.subs_product_id,
      subsQuantity: String(round_number(order.usdValue, 0)),
    } satisfies IMetadataSubs,
    usage: "off_session",
  });

  return client_secret || "invalid client secret";
}
