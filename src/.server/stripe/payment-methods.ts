import type { StripeDonation } from "@better-giving/donation";

/**
 * Listed payment methods are ones that are enabled in our Stripe account
 * @see {@link https://docs.stripe.com/api/payment_methods/object#payment_method_object-type}
 */
export const payment_methods: {
  [key in string]: StripeDonation.PaymentMethods[];
} = {
  CAD: ["acss_debit", "card"],
  EUR: ["bancontact", "card", "eps", "ideal", "p24", "sepa_debit", "sofort"],
  PLN: ["card", "p24"],
  USD: ["amazon_pay", "card", "cashapp", "link", "us_bank_account"],
};

/** Remove payment methods that does not support recurring payments */
export function nonSubsPM(pm: StripeDonation.PaymentMethods) {
  return pm !== "eps" && pm !== "p24";
}
