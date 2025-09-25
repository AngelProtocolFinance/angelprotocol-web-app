import type { Donation } from "@better-giving/donation";
import { tables } from "@better-giving/types/list";
import { UpdateCommand, apes } from "./aws/db";

type KYC = Omit<Donation.V2FullKyc, "ukGiftAid">;

export const sendDonationReceipt = async (id: string, update: KYC) => {
  const components = Object.entries(update).map(([k, v]) => ({
    update: `#${k} = :${k}`,
    name: [`#${k}`, k],
    value: [`:${k}`, v],
  }));
  const command = new UpdateCommand({
    TableName: tables.donations,
    Key: { transactionId: id } satisfies Donation.PrimaryKey,
    ConditionExpression: "attribute_exists(transactionId)",
    UpdateExpression: `SET ${components.map(({ update: u }) => u).join(",")}`,
    ExpressionAttributeNames: components.reduce(
      (prev, { name: [n, _n] }) => ({ ...prev, [n]: _n }),
      {}
    ),
    ExpressionAttributeValues: components.reduce(
      (prev, { value: [v, _v] }) => ({ ...prev, [v]: _v }),
      {}
    ),
  });
  await apes.send(command);
};
