import type { IMetadataSubs } from "@better-giving/stripe";
import { stripe } from ".server/sdks";

export async function create_subscription(
  customer_id: string,
  payment_method_id: string,
  intent: IMetadataSubs
): Promise<string> {
  // Update a Customer's default payment method
  await stripe.customers.update(customer_id, {
    invoice_settings: {
      default_payment_method: payment_method_id,
    },
  });

  // Fetch latest price
  const prices = await stripe.prices.list({
    active: true,
    limit: 2,
    lookup_keys: ["standard_monthly"],
    product: intent.productId,
    type: "recurring",
  });

  if (prices.data.length !== 1)
    throw { message: "Failed to fetch latest subscription price" };

  const price = prices.data[0].id;

  // Create a Subscription object
  const subs = await stripe.subscriptions.create({
    customer: customer_id,
    currency: intent.denomination.toLowerCase(),
    items: [
      {
        price,
        quantity: +intent.subsQuantity, // subs qty. is integer: 1USD/unit
      },
    ],
    metadata: intent as any,
    off_session: true,
  });

  return subs.id;
}
