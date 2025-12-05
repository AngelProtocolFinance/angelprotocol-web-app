import type { IDonationOnHoldAttr } from "@better-giving/donation";
import { to_atomic } from "helpers/stripe";
import { to_metadata } from "../../helpers/donation-metadata";
import { stripe } from ".server/sdks";

export async function payment_intent(
  order: IDonationOnHoldAttr,
  customer_id: string
): Promise<string> {
  const { client_secret } = await stripe.paymentIntents.create({
    amount: to_atomic(order.amount, order.denomination),
    currency: order.denomination,
    customer: customer_id,
    metadata: to_metadata(order) as any,
    payment_method_options: {
      acss_debit: {
        mandate_options: {
          payment_schedule: "sporadic",
          transaction_type: "business",
        },
        setup_future_usage: "on_session",
        verification_method: "automatic",
      },
    },
    automatic_payment_methods: { enabled: true },
  });
  return client_secret || "invalid client secret";
}
