import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import { round_number } from "helpers/round-number";
import { build_metadata } from "routes/api.donation-intents.$type/stripe/build-metadata";
import { stripeEnvs } from ".server/env";
import { stripe } from ".server/sdks";
import { PaymentMethods, nonSubsPM } from ".server/stripe/payment-methods";

export async function setup_intent(
  order: OnHoldDonation.FiatDBRecord,
  customerId: string
): Promise<string> {
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
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
      PaymentMethods[order.denomination] ?? ["card"]
    ).filter(nonSubsPM),
    metadata: {
      // Subscription required fields
      productId: stripeEnvs.subsProductId,
      subsQuantity: String(round_number(order.usdValue, 0)),
      isRecurring: "true",
      ...build_metadata(order),
    } satisfies StripeDonation.SetupIntentMetadata,
    usage: "off_session",
  });

  if (!setupIntent.client_secret)
    throw { message: "Failed to create client secret" };

  return setupIntent.client_secret;
}
