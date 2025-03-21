import type { StripeDonation } from "@better-giving/donation";
import type { DonationIntent } from "@better-giving/donation/intent";
import { convertToAtomicFormat } from "../helpers";
import { PaymentMethods } from "../payment-methods";
import { stripe } from ".server/sdks";

export async function createPaymentIntent(
  amount: DonationIntent["amount"],
  metadata: StripeDonation.Metadata,
  customerId: string
): Promise<string> {
  const totalToPay = amount.amount + amount.tip + amount.feeAllowance;
  const currency = amount.currency.toLowerCase();

  // Create a Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: convertToAtomicFormat(totalToPay, currency),
    currency,
    customer: customerId,
    metadata: {
      isRecurring: "false",
      ...metadata,
    } satisfies StripeDonation.Metadata,
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
    payment_method_types: PaymentMethods[currency] ?? ["card"],
  });

  if (!paymentIntent.client_secret)
    throw { message: "Failed to create client secret" };

  return paymentIntent.client_secret;
}
