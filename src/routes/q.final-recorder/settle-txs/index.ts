import type { Donation } from "@better-giving/donation";
import { TxBuilder, type TxItems } from "@better-giving/helpers-db";
import type { Payout } from "@better-giving/payout";
import { tables } from "@better-giving/types/list";
import { nanoid } from "nanoid";
import { balance_update, to_db_update } from "./helpers";
export type Base = Pick<
  Donation.V2DBRecord,
  | "transactionDate"
  | "email"
  | "inHonorOf"
  | "tributeNotif"
  | "appUsed"
  | "denomination"
  | "splitLiq"
  | "chainId"
  | "chainName"
  // not speficied for fund donations
  | "programId"
  | "fiatRamp"
  // not speficied for fund donations
  | "programName"
  | "client"
  | "network"
  | "paymentMethod"
  | "isRecurring"
  | "destinationChainId"
  | "donationFinalChainId"
  | "donationFinalTxDate"
  | "donationFinalTxHash"
  | "donationFinalDenom"
  | "company_name"
> &
  (Donation.WithKYC | Donation.WithoutKYC);

export type Uniques = Omit<Donation.V2DBRecord, keyof Base>;

export interface Overrides {
  input: number;
  inputUsd: number;
  /** usd, net of processing fee */
  settled: number;
  /** usd, net of bg fees fsa, base */
  net: number;
  /** usd */
  feeAllowance: number;
  /** usd */
  excessFeeAllowance: number;
  referrer?: {
    id: string;
    commission: Donation.ReferrerCommission;
  };
  /** usd */
  fees: {
    base: number;
    processing: number;
    fsa: number;
  };
  txId: string;
  /** exclusive for tips */
  parentTx?: string;

  /** exclusive for donations originating from fundraiser */
  fundTx?: string;
  fundId?: string;
  fundName?: string;

  endowId: number;
  endowName: string;
  claimed: boolean;
  fiscal_sponsored: boolean;
}

export function settle_txs(base: Base, o: Overrides): TxItems {
  if (o.net <= 0) return [];

  const uniques: Uniques = {
    amount: o.input,
    usdValue: o.inputUsd,
    transactionId: o.txId,
    parentTx: o.parentTx,
    endowmentId: o.endowId,
    charityName: o.endowName,
    donationFinalAmount: o.net,
    settledUsdAmount: o.settled,
    feeAllowance: o.feeAllowance,
    excessFeeAllowanceUsd: o.excessFeeAllowance,

    baseFee: o.fees.base,
    processingFee: o.fees.processing,
    fiscalSponsorFee: o.fees.fsa,

    fund_id: o.fundId,
    fund_name: o.fundName,
    claimed: o.claimed,
    fiscalSponsored: o.fiscal_sponsored,
  };

  if (o.referrer) {
    uniques.referrer = o.referrer.id;
    uniques.referrer_commission = o.referrer.commission;
  }

  const record: Donation.V2DBRecord = {
    ...base,
    ...uniques,
  };

  const balUpdate = balance_update(o.net, 0, base.appUsed, {
    base: o.fees.base,
    fsa: o.fees.fsa,
    processing: o.fees.processing,
  });
  const dbBalUpdate = to_db_update(balUpdate, {
    network: base.network,
    id: o.endowId,
  });

  const payout: Payout.UnprocessedDBRecord = {
    source: "donation",
    uuid: nanoid(),
    sourceId: o.txId,
    amount: balUpdate.payoutsPending,
    dateAdded: new Date().toISOString(),
    endowmentId: o.endowId,
    network: base.network,
  };

  const builder = new TxBuilder();
  builder.put({
    TableName: tables.donations,
    Item: record,
  });

  if (payout.amount > 0) {
    builder
      .put({
        TableName: tables.payouts,
        Item: payout,
      })
      .update(dbBalUpdate);
  }

  return builder.txs;
}
