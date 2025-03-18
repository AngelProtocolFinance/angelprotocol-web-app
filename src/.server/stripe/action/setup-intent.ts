import type { StripeDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import { roundNumber } from "@better-giving/helpers";
import { PaymentMethods, nonSubsPM } from "../payment-methods";
import { stripeEnvs } from ".server/env";
import { stripe } from ".server/sdks";

export async function createSetupIntent(
  amount: DonationIntent["amount"],
  metadata: StripeDonation.Metadata,
  customerId: string,
  usdRate: number
): Promise<string> {
  const currency = amount.currency.toLowerCase();

  // Fetch Subs Product ID
  const product_id = stripeEnvs.subsProductId;

  // Compute for Subs Quantity
  const totalAmount = amount.amount + amount.tip;
  const totalAmountUsd = totalAmount / usdRate;
  const subsQuantity = roundNumber(totalAmountUsd, 0);

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
    payment_method_types: (PaymentMethods[currency] ?? ["card"]).filter(
      nonSubsPM
    ),
    metadata: {
      // Subscription required fields
      productId: stripeEnvs.subsProductId,
      subsQuantity: String(subsQuantity),
      isRecurring: "true",
      ...metadata,
    } satisfies StripeDonation.SetupIntentMetadata,
    usage: "off_session",
  });

  if (!setupIntent.client_secret)
    throw { message: "Failed to create client secret" };

  return setupIntent.client_secret;
}
