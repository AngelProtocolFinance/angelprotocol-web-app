import type { StripeDonation } from "@better-giving/donation";
import { stripe } from ".server/sdks";

export async function create_subscription(
  customerId: string,
  paymentMethodId: string,
  donationIntent: StripeDonation.SetupIntentMetadata
): Promise<string> {
  // Update a Customer's default payment method
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  // Fetch latest price
  const prices = await stripe.prices.list({
    active: true,
    limit: 2,
    lookup_keys: ["standard_monthly"],
    product: donationIntent.productId,
    type: "recurring",
  });

  if (prices.data.length !== 1)
    throw { message: "Failed to fetch latest subscription price" };

  const price = prices.data[0].id;

  // Create a Subscription object
  const subs = await stripe.subscriptions.create({
    customer: customerId,
    currency: donationIntent.denomination.toLowerCase(),
    items: [
      {
        price,
        quantity: +donationIntent.subsQuantity, // subs qty. is integer: 1USD/unit
      },
    ],
    metadata: donationIntent,
    off_session: true,
  });

  return subs.id;
}
