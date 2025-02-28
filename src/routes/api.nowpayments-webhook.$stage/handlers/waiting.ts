import type { OnHoldDonation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import { UpdateCommand, apes } from ".server/aws/db";

/**
 * attach payment_id to order so user can resume in my donations page
 */
export async function handleWaiting(paymentId: number, orderId: string) {
  const cmd = new UpdateCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: orderId } satisfies OnHoldDonation.PrimaryKey,
    UpdateExpression: "SET payment_id = :id",
    ExpressionAttributeValues: { ":id": paymentId },
    ReturnValues: "ALL_NEW",
  });

  return apes.send(cmd);
}
