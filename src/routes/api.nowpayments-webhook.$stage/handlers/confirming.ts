import type { OnHoldDonation } from "@better-giving/donation";
import { partition } from "@better-giving/helpers";
import type { NP } from "@better-giving/nowpayments/types";
import { tables } from "@better-giving/types/list";
import type { AttrNames } from "@better-giving/types/utils";
import type { Stage } from "routes/types";
import { getOrder } from "../helpers";
import { UpdateCommand, apes } from ".server/aws/db";
import { np } from ".server/sdks";

export async function handleConfirming(
  payment: NP.PaymentPayload,
  stage: Stage
) {
  const order = await getOrder(payment.order_id);

  if (!order) throw `Record ${payment.order_id} not found!`;
  /* ** EXTRACT TIP, FEE ALLOWANCE ** */

  const { rate: payRate } = await np.estimate(payment.pay_currency);

  // in staging, use fake amount
  const paid = stage === "production" ? payment.actually_paid : order.amount;
  const paidUsd = paid * payRate;

  //proportion tip and fees based on actual paid
  const parts = partition(order.amount, order.tipAmount, order.feeAllowance);
  const actual = parts(paid);

  type Update = Pick<
    OnHoldDonation.DBRecord,
    "status" | "amount" | "tipAmount" | "feeAllowance" | "usdValue"
  >;
  const names: AttrNames<Update> = {
    "#status": "status",
    "#amount": "amount",
    "#tipAmount": "tipAmount",
    "#feeAllowance": "feeAllowance",
    "#usdValue": "usdValue",
  };
  //update intent to pending
  const cmd = new UpdateCommand({
    TableName: tables.on_hold_donations,
    Key: {
      transactionId: payment.order_id,
    } satisfies OnHoldDonation.PrimaryKey,
    UpdateExpression:
      "SET #status = :pending, #amount = :actual_amount, #tipAmount = :actual_tip, #feeAllowance = :actual_allowance, #usdValue = :paid_usd",
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: {
      ":pending": "pending",
      ":actual_amount": paid,
      ":actual_tip": actual.tip,
      ":actual_allowance": actual.feeAllowance,
      ":paid_usd": paidUsd,
    },
    ReturnValues: "ALL_NEW",
  });

  return apes.send(cmd);
}
