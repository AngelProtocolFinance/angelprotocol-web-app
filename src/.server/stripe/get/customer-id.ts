import type Stripe from "stripe";
import type { GetCustomerId } from "types/stripe";
import { stripe } from ".server/sdks";

export const getCustomerId: GetCustomerId = async (intent) => {
  // Search for existing Stripe Customer data
  const customerList = [];
  let loadMore = false;
  let nextPage: string | undefined = undefined;
  const currency = intent.amount.currency.toUpperCase();
  const currencies = ["USD", currency];
  do {
    const customers = await stripe.customers.search({
      expand: ["data.subscriptions"], // needed so we can check if customer has existing subs
      query: `email:"${intent.donor.email}"`,
      page: nextPage,
    });

    loadMore = customers.has_more;
    if (!!customers.next_page) nextPage = customers.next_page;

    customerList.push(
      ...customers.data.filter(
        (_customer) =>
          // Subscription is always in "USD"
          !_customer.deleted &&
          currencies.includes(_customer.currency?.toUpperCase() ?? "USD")
      )
    );
  } while (loadMore);

  /**
   * Picking the most appropriate customer profile
   * If customer has existing subs, use that profile
   * If no existing subs, use the first available profile
   * Else, create new profile using their email
   */
  let customer: Stripe.Customer;
  if (customerList.length > 0) {
    customer =
      customerList.find((_customer) => {
        if (
          _customer.subscriptions &&
          // @ts-ignore (related issue with 'expand' param https://github.com/stripe/stripe-node/issues/1556)
          _customer.subscriptions.total_count > 0
        )
          return _customer;
      }) ?? customerList[0];
  } else {
    customer = await stripe.customers.create({ email: intent.donor.email });
  }
  return customer.id;
};
