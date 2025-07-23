import type { IBalanceUpdateables } from "@better-giving/balance";
import type { Donation } from "@better-giving/donation";
import type { Keys } from "@better-giving/fundraiser/db";
import { tables } from "@better-giving/types/list";
import { UpdateCommand } from ".server/aws/db";

export const apply_fees = (
  amount: number,
  base_rate: number,
  fsa_rate: number,
  processing_fee: number,
  fee_allowance?: number
) => {
  const fees = {
    base: amount * base_rate,
    fsa: amount * fsa_rate,
    processing: processing_fee,
  };

  /// credit back processing fee if donor provided allowance
  const toCredit = fee_allowance ? amount + processing_fee : amount;

  return {
    fees,
    // as long as pctRate1 + pctRate2 ...+ pctRateN < 1, there would always remain of donation,
    net: toCredit - fees.base - fees.fsa,
    excess: fee_allowance ? fee_allowance - processing_fee : 0,
  };
};

interface Fees {
  base: number;
  fsa: number;
  processing: number;
}

export interface Increments {
  liq: number;
  lock: number;
  lock_units: number;
  cash: number;
  tip: number;
  fees: Fees;
}

export const bal_deltas_fn = (
  i: Increments,
  app: Donation.App
): Readonly<IBalanceUpdateables> => {
  const total = i.liq + i.lock + i.cash;
  return {
    totalContributions: total,
    contributionsCount: 1,
    totalContributionsViaMarketplace:
      app === "bg-marketplace" || app === "angel-protocol" ? total : 0,
    totalContributionsViaWidget: app === "bg-widget" ? total : 0,
    totalBaseFees: i.fees.base,
    totalFiscalSponsorFees: i.fees.fsa,
    totalProcessingFees: i.fees.processing,
    totalTips: i.tip,
    //include here as these would be included in atomic transaction
    payoutsPending: total,
    liq: i.liq,
    lock_units: i.lock_units,
    cash: i.cash,
  };
};

export const fund_contrib_update = (
  amount: number,
  fundId: string
): UpdateCommand => {
  return new UpdateCommand({
    TableName: tables.funds,
    Key: { PK: `Fund#${fundId}`, SK: `Fund#${fundId}` } satisfies Keys,
    UpdateExpression: "SET #c = if_not_exists(#c, :zero) + :c",
    ExpressionAttributeNames: { "#c": "donation_total_usd" },
    ExpressionAttributeValues: { ":c": amount, ":zero": 0 },
  });
};
