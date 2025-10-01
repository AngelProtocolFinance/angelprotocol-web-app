import { partition } from "@better-giving/helpers";
import type { NP } from "@better-giving/nowpayments/types";
import type { Stage } from "routes/types/donation-message";
import { onholddb } from ".server/aws/db";
import { np } from ".server/sdks";

export async function handle_confirming(
  payment: NP.PaymentPayload,
  stage: Stage
) {
  const order = await onholddb.item(payment.order_id);

  if (!order) throw `Record ${payment.order_id} not found!`;
  /* ** EXTRACT TIP, FEE ALLOWANCE ** */

  const { rate: pay_rate } = await np.estimate(payment.pay_currency);

  // in staging, use fake amount
  const paid = stage === "production" ? payment.actually_paid : order.amount;
  const paidUsd = paid * pay_rate;

  //proportion tip and fees based on actual paid
  const parts = partition(order.amount, order.tipAmount, order.feeAllowance);
  const actual = parts(paid);

  const updated = await onholddb.update(order.transactionId, {
    status: "pending",
    amount: paid,
    tipAmount: actual.tip,
    feeAllowance: actual.feeAllowance,
    usdValue: paidUsd,
  });
  return updated;
}
