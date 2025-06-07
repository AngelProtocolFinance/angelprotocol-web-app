import type { NP } from "@better-giving/nowpayments/types";
import { delete_order, get_order } from "../../helpers/onhold";
import { sendEmail } from "../helpers";
import { np } from ".server/sdks";

/**
 * reasons:
 *  - paid below minimum amount
 *  - ???
 */
export async function handleFailed(payment: NP.PaymentPayload) {
  const pay = await np.estimate(payment.pay_currency);
  const failureReason =
    payment.actually_paid < pay.min
      ? `Paid amount: ${payment.actually_paid} ${payment.pay_currency} is less than the minimum processing amount: ${pay.min} ${payment.pay_currency}`
      : "Unknown error occured";

  const order = await get_order(payment.order_id);
  if (!order || !order.kycEmail) {
    throw `notif recipient not found for failed payment:${payment.payment_id}`;
  }

  const res = await sendEmail({
    recipients: [order.kycEmail],
    template: "donation-error",
    data: {
      donorFirstName: order.fullName,
      recipientName: order.charityName,
      errorMessage: failureReason,
    },
  });

  console.info("sent failure message", res.$metadata);

  /// DELETE INTENT IF APPLICABLE ///
  const outcome = await np.estimate(payment.outcome_currency);

  //denominated in outcome_currency
  const feesUsdc =
    payment.fee.serviceFee + payment.fee.depositFee + payment.fee.withdrawalFee;

  const feesUsd = feesUsdc * outcome.rate;

  const reprocessingNet = payment.actually_paid_at_fiat - 2 * feesUsd;
  if (reprocessingNet > 0) {
    throw `payment:${payment.payment_id} failed but can be reprocessed for an net of ${reprocessingNet}`;
  }

  return delete_order(payment.order_id);
}
