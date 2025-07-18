import { type TxItems, Txs } from "@better-giving/db/txs";
import type { Donation } from "@better-giving/donation";
import type { Allocation } from "@better-giving/donation/schema";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import type { Payout } from "@better-giving/payout";
import { PayoutsDB } from "@better-giving/payouts/db";
import { tables } from "@better-giving/types/list";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { balance_update, to_db_update } from "./helpers";
import { apes } from ".server/aws/db";
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
  msg_to_npo?: string;
  allocation: Allocation;
}

export async function settle_txs(base: Base, o: Overrides): Promise<TxItems> {
  const timestamp = new Date().toISOString();
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

  if (o.msg_to_npo) {
    uniques.msg_to_npo = o.msg_to_npo;
  }

  if (o.allocation) {
    uniques.allocation = o.allocation;
  }

  const record: Donation.V2DBRecord = {
    ...base,
    ...uniques,
  };

  const net_alloc: Allocation = {
    cash: o.allocation.cash * o.net,
    liq: o.allocation.liq * o.net,
    lock: o.allocation.lock * o.net,
  };

  const txs = new Txs();
  if (net_alloc.lock) {
    const navdb = new NavHistoryDB(apes, base.network);
    const nav = await navdb.ltd();

    const new_nav = produce(nav, (x) => {
      const purchased_units = net_alloc.lock / nav.price;
      x.reason = `npo:${o.endowId} donation allocation to lock`;
      x.date = timestamp;
      x.units += purchased_units;
      // new investments are allocated to cash portion and rebalanced later
      x.composition.CASH.qty += net_alloc.lock;
      x.value += net_alloc.lock;
      x.holders[o.endowId] ||= 0;
      x.holders[o.endowId] += purchased_units;
    });

    txs.append(navdb.log_items(new_nav));
  }

  const balUpdate = balance_update(net_alloc, 0, base.appUsed, {
    base: o.fees.base,
    fsa: o.fees.fsa,
    processing: o.fees.processing,
  });
  const dbBalUpdate = to_db_update(balUpdate, {
    network: base.network,
    id: o.endowId,
  });

  // const payouts = new PayoutsDB(apes, base.network);
  const payout: Payout.UnprocessedDBRecord = {
    source: "donation",
    uuid: nanoid(),
    sourceId: o.txId,
    amount: balUpdate.payoutsPending,
    dateAdded: timestamp,
    endowmentId: o.endowId,
    network: base.network,
  };

  //create payout-v2
  const payout_db = new PayoutsDB(apes, base.network);
  const payout_item = payout_db.new_payout_item({
    id: nanoid(),
    source_id: o.txId,
    recipient_id: o.endowId.toString(),
    source: "Grant from donation",
    date: timestamp,
    amount: net_alloc.cash,
    type: "pending",
  });

  txs.put({
    TableName: PayoutsDB.name,
    Item: payout_item,
  });

  txs.put({
    TableName: tables.donations,
    Item: record,
  });

  if (payout.amount > 0) {
    txs
      .put({
        TableName: tables.payouts,
        Item: payout,
      })
      .update(dbBalUpdate);
  }

  return txs.all;
}
