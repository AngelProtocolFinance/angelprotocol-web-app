import type { StripeDonation } from "@better-giving/donation";

/**
 * Listed payment methods are ones that are enabled in our Stripe account
 * @see {@link https://docs.stripe.com/api/payment_methods/object#payment_method_object-type}
 */
export const PaymentMethods: {
  [key in string]: StripeDonation.PaymentMethods[];
} = {
  cad: ["acss_debit", "card"],
  eur: ["bancontact", "card", "eps", "ideal", "p24", "sepa_debit", "sofort"],
  pln: ["card", "p24"],
  usd: ["amazon_pay", "card", "cashapp", "link", "us_bank_account"],
};

/** Remove payment methods that does not support recurring payments */
export function nonSubsPM(pm: StripeDonation.PaymentMethods) {
  return pm !== "eps" && pm !== "p24";
}
