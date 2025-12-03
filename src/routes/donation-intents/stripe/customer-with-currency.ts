import type Stripe from "stripe";
import { stripe } from ".server/sdks";

/**
 * @param currency - uppercase
 * @param email - lowercase
 */
export async function customer_with_currency(
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

  const with_currency = actives.find(
    (x) => x.currency?.toUpperCase() === currency
  );

  if (with_currency) return with_currency.id;

  //create new customer for the desired currency
  return stripe.customers.create({ email }).then((x) => x.id);
}
