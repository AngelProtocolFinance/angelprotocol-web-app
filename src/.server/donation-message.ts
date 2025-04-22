import type {
  DMKey,
  DonationMessage,
} from "@better-giving/donation/donation-message";
import { tables } from "@better-giving/types/list";
import { DeleteCommand, GetCommand, apes } from "./aws/db";

export const getDonationMessage = async (
  id: string
): Promise<
  Omit<DonationMessage.NonKeyAttributes, "donor_id"> | [number, string]
> => {
  const dm: DMKey = `DM#${id}`;
  const cmd = new GetCommand({
    TableName: tables.donation_messages,
    Key: { PK: dm, SK: dm } satisfies DonationMessage.PrimaryKey,
  });
  const res = await apes.send(cmd);
  if (!res.Item) return [404, "Donation message not found"];

  const { PK, SK, gsi1PK, gsi1SK, donor_id, ...i } =
    res.Item as DonationMessage.DBRecord;
  return i;
};

export const delDonationMessage = async (id: string) => {
  const dm: DMKey = `DM#${id}`;
  const cmd = new DeleteCommand({
    TableName: tables.donation_messages,
    Key: { PK: dm, SK: dm } satisfies DonationMessage.PrimaryKey,
  });
  return apes.send(cmd);
};
