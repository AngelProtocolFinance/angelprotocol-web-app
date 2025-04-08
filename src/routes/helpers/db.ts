import crypto from "node:crypto";
import type { DonationMessage } from "@better-giving/donation/donation-message";
import type { DonationMessageParams } from "routes/types";
import { env } from ".server/env";

export const buildDonationMsg = ({
  date,
  donor_id,
  donor_message,
  donor_name,
  recipient_id,
  transaction_id,
  usd_value,
}: DonationMessageParams): DonationMessage.DBRecord => {
  const message_id: DonationMessage.PrimaryKey["PK"] = `DM#${crypto.randomUUID()}`;
  return {
    PK: message_id,
    SK: message_id,
    gsi1PK: `Recipient#${recipient_id}#${env}`,
    gsi1SK: date,
    amount: usd_value,
    donation_id: transaction_id,
    donor_id,
    donor_message,
    donor_name,
    env,
    id: message_id,
    recipient_id,
  };
};
