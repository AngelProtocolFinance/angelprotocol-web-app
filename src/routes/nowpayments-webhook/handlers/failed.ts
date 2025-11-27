import { send_email } from "lib/email";
import type { NP } from "lib/nowpayments/types";
import { onholddb } from ".server/aws/db";
import { np } from ".server/sdks";

/**
 * reasons:
 *  - paid below minimum amount
 *  - ???
 */
export async function handle_failed(payment: NP.PaymentPayload) {
  const pay = await np.estimate(payment.pay_currency);
  const failureReason =
    payment.actually_paid < pay.min
      ? `Paid amount: ${payment.actually_paid} ${payment.pay_currency} is less than the minimum processing amount: ${pay.min} ${payment.pay_currency}`
      : "Unknown error occured";

  const order = await onholddb.item(payment.order_id);
  if (!order) {
    throw `notif recipient not found for failed payment:${payment.payment_id}`;
  }

  const res = await send_email(
    {
      name: "donation-error",
      donorFirstName: order.fullName,
      recipientName: order.charityName,
      errorMessage: failureReason,
    },
    [order.kycEmail]
  );

  console.info("sent failure message", res.$metadata);

  /// DELETE INTENT IF APPLICABLE ///
  const outcome = await np.estimate(payment.outcome_currency);

  //denominated in outcome_currency
  const fees_usdc =
    payment.fee.serviceFee + payment.fee.depositFee + payment.fee.withdrawalFee;

  const fees_usd = fees_usdc * outcome.rate;

  const reprocessing_net = payment.actually_paid_at_fiat - 2 * fees_usd;
  if (reprocessing_net > 0) {
    throw `payment:${payment.payment_id} failed but can be reprocessed for an net of ${reprocessing_net}`;
  }

  return onholddb.del(payment.order_id);
}
