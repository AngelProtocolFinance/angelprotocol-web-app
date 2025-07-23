import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { type TxItems, Txs } from "@better-giving/db/txs";
import type { Donation } from "@better-giving/donation";
import type { Allocation } from "@better-giving/donation/schema";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import type { Payout } from "@better-giving/payout";
import { PayoutsDB } from "@better-giving/payouts";
import { tables } from "@better-giving/types/list";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { type Increments, balance_update, to_db_update } from "./helpers";
import type { Base, Overrides, Uniques } from "./types";
import { apes } from ".server/aws/db";
import { npoBalances } from ".server/npo-balances";

export type { Base, Overrides, Uniques } from "./types";
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
    cash: (o.allocation.cash / 100) * o.net,
    liq: (o.allocation.liq / 100) * o.net,
    lock: (o.allocation.lock / 100) * o.net,
  };

  const txs = new Txs();
  const navdb = new NavHistoryDB(apes, base.network);
  if (net_alloc.lock || net_alloc.liq) {
    const { lock_units = 0, liq = 0 } = await npoBalances(o.endowId);
    const nav = await navdb.ltd();
    const baltxs_db = new BalanceTxsDb(apes, base.network);

    if (net_alloc.lock) {
      const purchased_units = net_alloc.lock / nav.price;

      const new_nav = produce(nav, (x) => {
        x.reason = `npo:${o.endowId} donation allocation to lock`;
        x.date = timestamp;
        x.units += purchased_units;
        // new investments are allocated to cash portion and rebalanced later
        x.composition.CASH.qty += net_alloc.lock;
        x.composition.CASH.value += net_alloc.lock;

        x.value += net_alloc.lock;
        x.holders[o.endowId] ||= 0;
        x.holders[o.endowId] += purchased_units;
      });

      txs.append(navdb.log_items(new_nav));

      const lock_tx: IBalanceTx = {
        id: nanoid(),
        date_created: timestamp,
        date_updated: timestamp,
        owner: o.endowId.toString(),
        account: "investments",
        bal_begin: lock_units,
        bal_end: lock_units + purchased_units,
        amount: net_alloc.lock,
        amount_units: purchased_units,
        status: "final",
        account_other_id: o.txId,
        account_other: "donation",
        account_other_bal_begin: net_alloc.lock,
        account_other_bal_end: 0,
      };
      const lock_tx_tx_item = baltxs_db.new_tx_item(lock_tx);
      txs.put({
        TableName: BalanceTxsDb.name,
        Item: lock_tx_tx_item,
      });
    }

    if (net_alloc.liq) {
      const lock_tx: IBalanceTx = {
        id: nanoid(),
        date_created: timestamp,
        date_updated: timestamp,
        owner: o.endowId.toString(),
        account: "savings",
        bal_begin: liq,
        bal_end: liq + net_alloc.liq,
        amount: net_alloc.liq,
        amount_units: net_alloc.liq,
        status: "final",
        account_other_id: o.txId,
        account_other: "donation",
        account_other_bal_begin: net_alloc.liq,
        account_other_bal_end: 0,
      };
      const liq_tx_tx_item = baltxs_db.new_tx_item(lock_tx);
      txs.put({
        TableName: BalanceTxsDb.name,
        Item: liq_tx_tx_item,
      });
    }
  }

  const incs: Increments = {
    liq: net_alloc.liq,
    lock: net_alloc.lock,
    lock_units: net_alloc.lock
      ? net_alloc.lock / (await navdb.ltd().then((x) => x.price))
      : 0,
    cash: net_alloc.cash,
    tip: 0,
    fees: {
      base: o.fees.base,
      fsa: o.fees.fsa,
      processing: o.fees.processing,
    },
  };

  const balUpdate = balance_update(incs, base.appUsed);
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
