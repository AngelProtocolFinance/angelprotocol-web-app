import type {
  DonationMessage,
  GSI1 as Index,
} from "@better-giving/donation/donation-message";
import { tables } from "@better-giving/types/list";
import { DeleteCommand, GetCommand, apes } from "./aws/db";

interface DM
  extends DonationMessage.NonKeyAttributes,
    Pick<Index.Key, "gsi1SK"> {}

export const getDonationMessage = async (
  id: DonationMessage.PrimaryKey["PK"]
): Promise<DM | [number, string]> => {
  const cmd = new GetCommand({
    TableName: tables.donation_messages,
    Key: { PK: id, SK: id } satisfies DonationMessage.PrimaryKey,
  });
  const res = await apes.send(cmd);
  if (!res.Item) return [404, "Donation message not found"];

  const { PK, SK, gsi1PK, ...dm } = res.Item as DonationMessage.DBRecord;
  return dm;
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
