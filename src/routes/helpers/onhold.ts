import type { OnHoldDonation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import { DeleteCommand, GetCommand, apes } from ".server/aws/db";

export const get_order = async (order_id: string) => {
  const cmd = new GetCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: order_id } satisfies OnHoldDonation.PrimaryKey,
  });

  return apes
    .send(cmd)
    .then<OnHoldDonation.DBRecord | undefined>((res) => res.Item as any);
};

export async function delete_order(orderId: string) {
  const cmd = new DeleteCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: orderId } satisfies OnHoldDonation.PrimaryKey,
    ReturnValues: "ALL_OLD",
  });
  return apes.send(cmd);
}
