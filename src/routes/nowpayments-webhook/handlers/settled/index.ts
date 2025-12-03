import { tokens_map } from "@better-giving/crypto";
import type { NP } from "lib/nowpayments/types";
import { href } from "react-router";
import { type Settled, to_final } from "../../../helpers/donation";
import { onholddb } from ".server/aws/db";
import { np, qstash } from ".server/sdks";

/**
 * fees, outcomes, are all denominated in the same currency
 * settlement currency is USDC ( set in account), regardless of chain
 * fiat equivalents (actual_paid_amount_fiat) in "usd" set in account
 *
 */
export const handle_settled = async (
  payment: NP.PaymentPayload,
  base_url: string
) => {
  const order = await onholddb.item(payment.order_id);

  if (!order) throw `Record ${payment.order_id} not found!`;
  const { rate: outcomeRate } = await np.estimate(payment.outcome_currency);
  const outcome_token = tokens_map[payment.outcome_currency.toUpperCase()];
  /** all in usd */
  const settlement: Settled = {
    net: payment.outcome_amount * outcomeRate,
    fee:
      payment.fee.depositFee +
      payment.fee.serviceFee +
      payment.fee.withdrawalFee,
    in: {
      id: outcome_token.network,
      currency: outcome_token.symbol,
      hash: payment.payment_id.toString(),
    },
  };

  const final = to_final(order, settlement);

  return qstash.publishJSON({
    url: `${base_url}/q/final-recorder`,
    body: final,
    retries: 0,
    deduplicationId: payment.order_id,
    failureCallback: `${base_url}${href("/failure-callback")}`,
  });
};
