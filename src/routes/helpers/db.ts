import type {
  DMKey,
  DonationMessage,
} from "@better-giving/donation/donation-message";
import { nanoid } from "nanoid";
import type { IDonationMessage } from "routes/types/donation-message";
import { env } from ".server/env";

export const build_donation_msg = ({
  date,
  donor_id,
  donor_message,
  donor_name,
  recipient_id,
  transaction_id,
  usd_value,
}: IDonationMessage): DonationMessage.DBRecord => {
  const uuid = nanoid();
  const message_id: DMKey = `DM#${uuid}`;
  return {
    PK: message_id,
    SK: message_id,
    gsi1PK: `Recipient#${recipient_id}#${env}`,
    gsi1SK: date,
    amount: usd_value,
    date,
    donation_id: transaction_id,
    donor_id,
    donor_message,
    donor_name,
    env,
    id: uuid,
    recipient_id,
  };
};
