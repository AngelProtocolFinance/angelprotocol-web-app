import type { Balance } from "@better-giving/balance";
import type { Donation } from "@better-giving/donation";
import type { Allocation } from "@better-giving/endowment";
import type { Keys } from "@better-giving/fundraiser/db";
import type { TxType } from "@better-giving/helpers-db";
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
export const balance_update = (
  /** values are resolved */
  alloc: Allocation,
  tip: number,
  appUsed: Donation.App,
  fees: Fees
): Readonly<Balance.DonationBalanceUpdate> => {
  const total = alloc.cash + alloc.liq + alloc.lock + tip;
  return {
    totalContributions: total,
    contributionsCount: 1,
    totalContributionsViaMarketplace:
      appUsed === "bg-marketplace" || appUsed === "angel-protocol" ? total : 0,
    totalContributionsViaWidget: appUsed === "bg-widget" ? total : 0,
    totalBaseFees: fees.base,
    totalFiscalSponsorFees: fees.fsa,
    totalProcessingFees: fees.processing,
    totalTips: tip,
    //include here as these would be included in atomic transaction
    payoutsPending: total,
    liq: alloc.liq,
    lock: alloc.lock,
    //pending payout
    cash: alloc.cash,
  };
};

export const to_db_update = (
  update: Balance.DonationBalanceUpdate,
  key: Balance.PrimaryKey
): TxType["Update"] => {
  const comps = Object.entries(update).map(([k, v]) => ({
    update: `#${k} = if_not_exists(#${k}, :zero) + :${k}`,
    name: [`#${k}`, k],
    value: [`:${k}`, v],
  }));
  return {
    TableName: tables.balances,
    Key: key,
    UpdateExpression:
      "SET #ver = :v, " + comps.map(({ update: u }) => u).join(","),
    ExpressionAttributeNames: comps.reduce(
      (p, { name: [n, _n] }) => ({ ...p, [n]: _n }),
      { "#ver": "version" }
    ),
    ExpressionAttributeValues: comps.reduce(
      (p, { value: [v, _v] }) => ({ ...p, [v]: _v }),
      { ":zero": 0, ":v": 2 }
    ),
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
