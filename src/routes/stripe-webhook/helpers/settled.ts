import { stripe } from ".server/sdks";

/** in usd */
interface Settled {
  net: number;
  fee: number;
}

export async function settled_fn(id: string, attempt = 1): Promise<Settled> {
  const { latest_charge: lc } = await stripe.paymentIntents.retrieve(id, {
    expand: ["latest_charge.balance_transaction"],
  });

  if (
    lc &&
    typeof lc !== "string" &&
    lc.balance_transaction &&
    typeof lc.balance_transaction !== "string"
  ) {
    const { net, fee } = lc.balance_transaction;
    return { net: net / 100, fee: fee / 100 };
  }

  if (attempt === 3) {
    throw `timeout: Failed to fetch Payment Intent's balance transaction:${id}`;
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return settled_fn(id, attempt + 1);
}
