import tokens from "@better-giving/assets/tokens/map";
import type { NP } from "@better-giving/nowpayments/types";
import { type Settled, to_final } from "../../../helpers/donation";
import { get_order } from "../../../helpers/onhold";
import { np, qstash } from ".server/sdks";

/**
 * fees, outcomes, are all denominated in the same currency
 * settlement currency is USDC ( set in account), regardless of chain
 * fiat equivalents (actual_paid_amount_fiat) in "usd" set in account
 *
 */
export const handleSettled = async (
  payment: NP.PaymentPayload,
  origin: string
) => {
  const order = await get_order(payment.order_id);

  if (!order) throw `Record ${payment.order_id} not found!`;

  const { rate: outcomeRate } = await np.estimate(payment.outcome_currency);
  const outcomeToken = tokens[payment.outcome_currency.toUpperCase()];
  /** all in usd */
  const settlement: Settled = {
    net: payment.outcome_amount * outcomeRate,
    fee:
      payment.fee.depositFee +
      payment.fee.serviceFee +
      payment.fee.withdrawalFee,
    in: {
      id: outcomeToken.network,
      currency: outcomeToken.symbol,
      hash: payment.payment_id.toString(),
    },
  };

  const final = to_final(order, settlement);

  return qstash.publishJSON({
    url: `${origin}/q/final-recorder`,
    body: final,
    retries: 0,
    deduplicationId: payment.order_id,
  });
};
