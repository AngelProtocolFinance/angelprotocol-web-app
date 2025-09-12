import { type Token, isCustom } from "@better-giving/assets/tokens";
import type { Payment } from "types/crypto";
import { _var, env } from ".server/env";
import { np } from ".server/sdks";

export interface Order {
  id: string;
  description: string;
  amount: number;
  rate: number;
  currency: string;
}
export async function crypto_payment(
  token: Token,
  order: Order,

  webhookUrl: string
): Promise<Payment> {
  if (isCustom(token.id)) {
    const deposit_addr = _var(`DEPOSIT_ADDR_${token.network.toUpperCase()}`);
    return {
      id: order.id,
      address: deposit_addr,
      amount: order.amount,
      currency: token.code,
      description: order.description,
      rate: order.rate,
    } satisfies Payment;
  }

  const invoice = await np.invoice({
    price_amount: order.amount * order.rate,
    price_currency: "usd",
    pay_currency: order.currency,
    ipn_callback_url: webhookUrl,
    order_id: order.id,
    order_description: order.description,
  });

  const p = await np.payment_invoice({
    iid: invoice.id,
    pay_currency: order.currency,
    order_description: order.description,
    // nowpayments only simulates in test
    case: env === "production" ? undefined : "success",
  });

  return {
    id: p.payment_id,
    address: p.pay_address,
    extra_address: p.payin_extra_id ?? undefined,
    amount: p.pay_amount,
    currency: p.pay_currency,
    description: order.description,
    rate: order.rate,
  };
}
