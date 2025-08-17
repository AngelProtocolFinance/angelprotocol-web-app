import type { Donation } from "@better-giving/donation";
import type {
  DMKey,
  DonationMessage,
} from "@better-giving/donation/donation-message";
import type { INpo } from "@better-giving/endowment";
import { TxBuilder, type TxItems } from "@better-giving/helpers-db";
import * as ref_db from "@better-giving/referrals/db";
import type { Environment } from "@better-giving/types/list";
import { nanoid } from "nanoid";

interface DonationMessageParams {
  date: string;
  donor_id: string;
  donor_message: string;
  donor_name: string;
  env: Environment;
  recipient_id: string;
  transaction_id: string;
  usd_value: number;
}

export const build_donation_msg = ({
  date,
  donor_id,
  donor_message,
  donor_name,
  env,
  recipient_id,
  transaction_id,
  usd_value,
}: DonationMessageParams): DonationMessage.DBRecord => {
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

interface Commission {
  txs: TxItems;
  to: string;
  breakdown: Donation.ReferrerCommission;
}

export const commission_fn = (
  tx: { tip: number; fee: number; id: string },
  endow: INpo
): Commission | null => {
  if (!endow.referrer || !endow.referrer_expiry) return null;
  const is_expired = new Date(endow.referrer_expiry) < new Date();

  if (is_expired) return null;
  const builder = new TxBuilder();
  const d = new Date().toISOString();
  const status = "pending";
  const commission: ref_db.Commission = {
    PK: `Cm#${endow.referrer}`,
    SK: d,
    gsi1PK: `Cms#${endow.env}`,
    gsi1SK: status,
    date: d,
    referrer: endow.referrer,
    donation_id: tx.id,
    npo: endow.id,
    amount: tx.fee + tx.tip,
    status,
    env: endow.env,
  };
  builder.put({ TableName: ref_db.name, Item: commission });

  builder.update({
    TableName: ref_db.name,
    Key: {
      PK: `Ltd#${endow.referrer}`,
      SK: `Ltd#${endow.referrer}`,
    } satisfies Pick<ref_db.Ltd, "PK" | "SK">,
    UpdateExpression:
      "SET #amount = if_not_exists(#amount, :zero) + :amount, #referrer = :referrer",
    ExpressionAttributeNames: {
      "#amount": `#${endow.id}`,
      "#referrer": "referrer",
    },
    ExpressionAttributeValues: {
      ":zero": 0,
      ":amount": tx.tip + tx.fee,
      ":referrer": endow.referrer,
    },
  });

  return {
    to: endow.referrer,
    txs: builder.txs,
    breakdown: {
      from_tip: tx.tip,
      from_fee: tx.fee,
    },
  };
};
