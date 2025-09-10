import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { type TxItems, Txs } from "@better-giving/db";
import type { Donation } from "@better-giving/donation";
import type { Allocation } from "@better-giving/donation/schema";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import { PayoutsDB } from "@better-giving/payouts";
import { tables } from "@better-giving/types/list";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { type Increments, bal_deltas_fn } from "./helpers";
import type { Base, Overrides, Uniques } from "./types";
import { apes } from ".server/aws/db";
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
  const baldb = new BalanceDb(apes, base.network);
  if (net_alloc.lock || net_alloc.liq) {
    const { lock_units, liq } = await baldb.npo_balance(o.endowId);
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

      txs.put(navdb.log_put_txi(new_nav));

      const lock_tx: IBalanceTx = {
        id: nanoid(),
        date_created: timestamp,
        date_updated: timestamp,
        owner: o.endowId.toString(),
        account: "lock",
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
        account: "liq",
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

  //create payout-v2
  if (net_alloc.cash > 0) {
    const payout_db = new PayoutsDB(apes, base.network);
    const por = payout_db.payout_record({
      id: nanoid(),
      source_id: o.txId,
      recipient_id: o.endowId.toString(),
      source: "donation",
      date: timestamp,
      amount: net_alloc.cash,
      type: "pending",
    });
    txs.put({ TableName: PayoutsDB.name, Item: por });
  }

  if (o.net > 0) {
    const bal_deltas = bal_deltas_fn(incs, base.appUsed);
    txs.update(baldb.balance_update_txi(o.endowId, bal_deltas));
  }

  txs.put({
    TableName: tables.donations,
    Item: record,
  });

  return txs.all;
}
