import type { IDonationOnHoldAttr } from "@better-giving/donation";
import { to_metadata } from "../../helpers/donation-metadata";
import { stripe } from ".server/sdks";

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
    metadata: to_metadata(order) as any,
    usage: "off_session",
    automatic_payment_methods: { enabled: true },
  });

  return client_secret || "invalid client secret";
}
