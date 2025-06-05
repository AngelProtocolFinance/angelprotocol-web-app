import type { StripeDonation } from "@better-giving/donation";
import { stripe } from ".server/sdks";

export async function payment_method(id: string): Promise<string> {
  const paymentMethod = await stripe.paymentMethods.retrieve(id);

  let payment;
  switch (paymentMethod.type as StripeDonation.PaymentMethods) {
    case "amazon_pay":
      payment = "Amazon Pay";
      break;
    case "card":
      const funding = paymentMethod.card?.funding;
      if (funding === "credit") payment = "Credit Card";
      else if (funding === "debit") payment = "Debit Card";
      else payment = "Card";
      break;
    case "cashapp":
      payment = "Cash App";
      break;
    /** @see {@link https://stripe.com/payments/link} */
    case "link":
      payment = "Stripe Link";
      break;
    /** Bank Debit/Transfer */
    case "acss_debit":
    case "bancontact":
    case "eps":
    case "ideal":
    case "p24":
    case "sepa_debit":
    case "sofort":
    case "us_bank_account":
      payment = "Bank Transfer";
      break;
    /** Others */
    default:
      payment = paymentMethod.type;
  }
  return payment;
}
