import type Stripe from "stripe";
import { stripe } from ".server/sdks";

export async function getSubsInvoice(
  id: string
): Promise<Stripe.Response<Stripe.Invoice>> {
  return stripe.invoices.retrieve(id);
}
