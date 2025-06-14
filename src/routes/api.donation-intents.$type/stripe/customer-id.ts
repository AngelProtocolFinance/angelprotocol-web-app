import type Stripe from "stripe";
import { stripe } from ".server/sdks";

/**
 * @param currency - uppercase
 * @param email - lowercase
 */
export async function get_customer_id(
  currency: string,
  email: string
): Promise<Stripe.Customer["id"]> {
  // Search for existing Stripe Customer data
  const subs: Stripe.Customer[] = [];
  let next_page: string | undefined;
  do {
    const result = await stripe.customers.search({
      expand: ["data.subscriptions"], // needed so we can check if customer has existing subs
      query: `email:"${email}"`,
      page: next_page,
    });

    const filtered = result.data.filter(
      (x) => !x.deleted && x.currency?.toUpperCase() === currency
    );
    subs.push(...filtered);

    if (result.next_page) next_page = result.next_page;
  } while (next_page);

  if (subs.length === 0) {
    // no existing customer found, create a new one
    return stripe.customers.create({ email }).then((x) => x.id);
  }

  return subs[0].id;
}
