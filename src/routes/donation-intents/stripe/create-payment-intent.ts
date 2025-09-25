import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import { round_number } from "helpers/round-number";
import { to_metadata } from "../../helpers/donation-metadata";
import { stripe } from ".server/sdks";
import { payment_methods } from ".server/stripe/payment-methods";

export async function create_payment_intent(
  order: OnHoldDonation.FiatDBRecord,
  customer_id: string
): Promise<string> {
  // Create a Payment Intent
  const { client_secret } = await stripe.paymentIntents.create({
    amount: to_atomic(order.amount, order.denomination),
    currency: order.denomination,
    customer: customer_id,
    metadata: {
      isRecurring: "false",
      ...to_metadata(order),
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
    payment_method_types: payment_methods[order.denomination] ?? ["card"],
  });
  return client_secret || "invalid client secret";
}

/** @see {@link https://stripe.com/docs/currencies#zero-decimal} */
export const to_atomic = (amount: number, currency: string): number => {
  //biome-ignore format:
  const places: { [currency: string]: number } = {
    BIF: 0, CLP: 0, DJF: 0, GNF: 0, JPY: 0,  KMF: 0,  KRW: 0,  MGA: 0, PYG: 0, RWF: 0,UGX: 0,VND: 0, VUV: 0, XAF: 0,  XOF: 0,  XPF: 0, BHD: 3,
    JOD: 3,KWD: 3,OMR: 3, TND: 3,
  } as const;

  const p = places[currency.toUpperCase()] ?? 2;
  return Math.trunc(round_number(amount, p) * 10 ** p);
};
