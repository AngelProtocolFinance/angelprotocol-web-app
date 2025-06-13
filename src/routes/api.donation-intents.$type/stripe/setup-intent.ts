import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import { round_number } from "helpers/round-number";
import { to_metadata } from "../../helpers/donation-metadata";
import { stripeEnvs } from ".server/env";
import { stripe } from ".server/sdks";
import { nonSubsPM, payment_methods } from ".server/stripe/payment-methods";

export async function setup_intent(
  order: OnHoldDonation.FiatDBRecord,
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
      payment_methods[order.denomination.toLowerCase()] ?? ["card"]
    ).filter(nonSubsPM),
    metadata: {
      // Subscription required fields
      productId: stripeEnvs.subsProductId,
      subsQuantity: String(round_number(order.usdValue, 0)),
      isRecurring: "true",
      ...to_metadata(order),
    } satisfies StripeDonation.SetupIntentMetadata,
    usage: "off_session",
  });

  return client_secret || "invalid client secret";
}
