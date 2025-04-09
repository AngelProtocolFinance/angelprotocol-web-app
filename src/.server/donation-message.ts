import type { DonationMessage } from "@better-giving/donation/donation-message";
import { tables } from "@better-giving/types/list";
import { DeleteCommand, GetCommand, apes } from "./aws/db";

export const getDonationMessage = async (
  id: DonationMessage.PrimaryKey["PK"]
): Promise<DonationMessage.DBRecord | [number, string]> => {
  const cmd = new GetCommand({
    TableName: tables.donation_messages,
    Key: { PK: id, SK: id } satisfies DonationMessage.PrimaryKey,
  });
  const dm = await apes.send(cmd);
  return dm.Item
    ? (dm.Item as DonationMessage.DBRecord)
    : [404, "Donation message not found"];
};

export const delDonationMessage = async (
  id: DonationMessage.PrimaryKey["PK"]
) => {
  const cmd = new DeleteCommand({
    TableName: tables.donation_messages,
    Key: { PK: id, SK: id } satisfies DonationMessage.PrimaryKey,
  });
  return apes.send(cmd);
};
