import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import { round_number } from "helpers/round-number";
import { build_metadata } from "./build-metadata";
import { stripe } from ".server/sdks";
import { PaymentMethods } from ".server/stripe/payment-methods";

export async function create_payment_intent(
  order: OnHoldDonation.FiatDBRecord,
  customerId: string
): Promise<string> {
  // Create a Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: to_atomic(order.amount, order.denomination),
    currency: order.denomination,
    customer: customerId,
    metadata: {
      isRecurring: "false",
      ...build_metadata(order), //will be cast to string
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
    payment_method_types: PaymentMethods[order.denomination] ?? ["card"],
  });

  if (!paymentIntent.client_secret)
    throw { message: "Failed to create client secret" };

  return paymentIntent.client_secret;
}

/** @see {@link https://stripe.com/docs/currencies#zero-decimal} */
export const to_atomic = (amount: number, currency: string): number => {
  const zeroDecimals = [
    "BIF",
    "CLP",
    "DJF",
    "GNF",
    "JPY",
    "KMF",
    "KRW",
    "MGA",
    "PYG",
    "RWF",
    "UGX",
    "VND",
    "VUV",
    "XAF",
    "XOF",
    "XPF",
  ];
  const threeDecimals = ["BHD", "JOD", "KWD", "OMR", "TND"];

  const _currency = currency.toUpperCase();

  // Uses `roundNumber()` to ensure that we don't have decimal overflow
  if (zeroDecimals.includes(_currency)) return round_number(amount, 0);
  if (threeDecimals.includes(_currency))
    return Math.trunc(round_number(amount, 3) * 1000);
  return Math.trunc(round_number(amount, 2) * 100); // two decimals
};
