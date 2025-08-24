import type { TxType } from "@better-giving/db";
import type { Donation } from "@better-giving/donation";
import type {
  DMKey,
  DonationMessage,
} from "@better-giving/donation/donation-message";
import type { INpo } from "@better-giving/endowment";
import { TxBuilder } from "@better-giving/helpers-db";
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

export interface ICommissionSource {
  /** npo id */
  id: number;
  amnt: number;
}
export interface IReferrerLtdItem {
  id: string;
  source: ICommissionSource;
}

interface Commission {
  ltd: IReferrerLtdItem;
  record: TxType["Put"];
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

  const source: ICommissionSource = {
    id: endow.id,
    amnt: commission.amount,
  };
  return {
    ltd: { id: endow.referrer, source },
    record: { TableName: ref_db.name, Item: commission },
    breakdown: {
      from_tip: tx.tip,
      from_fee: tx.fee,
    },
  };
};

export const ltd_by_referrer = (items: IReferrerLtdItem[]) => {
  return items.reduce(
    (acc, curr) => {
      acc[curr.id] ||= [];
      acc[curr.id].push(curr.source);
      return acc;
    },
    {} as Record<string, ICommissionSource[]>
  );
};

export const referrer_ltd_update_txi = (
  referrer: string,
  sources: ICommissionSource[]
): TxType["Update"] => {
  const names: Record<string, string> = {
    "#referrer": "referrer",
  };
  const values: Record<string, any> = {
    ":zero": 0,
    ":referrer": referrer,
  };

  // Create SET expressions for each source
  const sets = sources.map((source, index) => {
    const alias = `#amount${source.id}`;
    const placeholder = `:amount${index}`;

    names[alias] = `#${source.id}`;
    values[placeholder] = source.amnt;

    return `${alias} = if_not_exists(${alias}, :zero) + ${placeholder}`;
  });

  const exp = `SET ${sets.join(", ")}, #referrer = :referrer`;

  return {
    TableName: ref_db.name,
    Key: {
      PK: `Ltd#${referrer}`,
      SK: `Ltd#${referrer}`,
    } satisfies Pick<ref_db.Ltd, "PK" | "SK">,
    UpdateExpression: exp,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
  };
};
