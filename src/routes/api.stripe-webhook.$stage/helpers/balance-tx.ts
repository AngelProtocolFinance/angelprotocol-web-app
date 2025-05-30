import type Stripe from "stripe";
import { stripe } from ".server/sdks";

export async function getBalanceTx(
  id: string,
  attempt = 1
): Promise<Stripe.BalanceTransaction> {
  const { latest_charge } = await stripe.paymentIntents.retrieve(id, {
    expand: ["latest_charge.balance_transaction"],
  });

  if (
    latest_charge &&
    typeof latest_charge !== "string" &&
    latest_charge.balance_transaction &&
    typeof latest_charge.balance_transaction !== "string"
  ) {
    console.log(latest_charge.balance_transaction);
    return latest_charge.balance_transaction;
  }

  if (attempt === 3) {
    throw `timeout: Failed to fetch Payment Intent's balance transaction:${id}`;
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return getBalanceTx(id, attempt + 1);
}
