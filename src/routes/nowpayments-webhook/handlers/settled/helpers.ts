import { type TxItems, Txs } from "@better-giving/db";
import type { Donation } from "@better-giving/donation";
import type { Environment, INpo } from "@better-giving/endowment";
import * as ref_db from "@better-giving/referrals/db";

interface Commission {
  txs: TxItems;
  to: string;
  breakdown: Donation.ReferrerCommission;
}

export const referral_commission_rate = 0.3;

export const commissionFn = (
  tx: { tip: number; fee: number; id: string },
  endow: INpo,
  env: Environment
): Commission | null => {
  if (!endow.referrer || !endow.referrer_expiry) return null;
  const is_expired = new Date(endow.referrer_expiry) < new Date();

  if (is_expired) return null;
  const txs = new Txs();
  const d = new Date().toISOString();
  const status = "pending";
  const commission: ref_db.Commission = {
    PK: `Cm#${endow.referrer}`,
    SK: d,
    gsi1PK: `Cms#${env}`,
    gsi1SK: status,
    date: d,
    referrer: endow.referrer,
    donation_id: tx.id,
    npo: endow.id,
    amount: tx.fee + tx.tip,
    status,
    env,
  };
  txs.put({ TableName: ref_db.name, Item: commission });

  txs.update({
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
    txs: txs.all,
    breakdown: {
      from_tip: tx.tip,
      from_fee: tx.fee,
    },
  };
};
