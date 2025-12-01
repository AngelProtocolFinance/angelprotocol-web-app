import type Stripe from "stripe";
import { stripe } from ".server/sdks";

/**
 * @param currency - uppercase
 * @param email - lowercase
 */
export async function get_customer_id(
  currency: string,
  email: string
): Promise<string> {
  // Search for existing Stripe Customer data
  const actives: Stripe.Customer[] = [];
  let next_page: string | undefined;
  do {
    const result = await stripe.customers.search({
      expand: ["data.subscriptions"], // needed so we can check if customer has existing subs
      query: `email:"${email}"`,
      page: next_page,
    });

    actives.push(...result.data.filter((x) => !x.deleted));
    if (result.next_page) next_page = result.next_page;
  } while (next_page);

  if (actives.length === 0) {
    // no existing customer found, create a new one
    return stripe.customers.create({ email }).then((x) => x.id);
  }
  const with_currency = actives.find(
    (x) => x.currency?.toUpperCase() === currency
  );

  return (with_currency || actives[0]).id;
}
