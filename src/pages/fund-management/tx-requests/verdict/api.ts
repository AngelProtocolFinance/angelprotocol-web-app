import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { type IPayout, PayoutsDB } from "@better-giving/payouts";
import { type ActionFunction, redirect } from "@vercel/remix";
import { produce } from "immer";
import { nanoid } from "nanoid";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import {
  TransactWriteCommand,
  baldb,
  btxdb,
  navdb,
  podb,
} from ".server/aws/db";

const verdict_schema = v.picklist(["approve", "reject"]);
const tx_id_schema = v.pipe(
  v.string("required"),
  v.nonEmpty("tx id is required")
);

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const fv = await request.formData();
  const verdict = v.parse(verdict_schema, fv.get("verdict"));
  const tx_id = v.parse(tx_id_schema, params.tx_id);

  const timestamp = new Date().toISOString();

  const tx = await btxdb.tx(tx_id);
  if (!tx) return { status: 404 };

  if (tx.account !== "lock") throw `expected lock account, got ${tx.account}`;

  const ltd = await navdb.ltd();

  if (ltd.composition.CASH.value < tx.amount) {
    throw `insufficient cash balance to approve this request.`;
  }

  if (verdict === "reject") {
    const txs = new Txs();
    const upd81 = await btxdb.tx_update_status_item(tx, "cancelled");
    //add back units
    const upd82 = baldb.balance_update_txi(+tx.owner, {
      lock_units: ["inc", tx.amount_units],
    });
    txs.update(upd81).update(upd82);
    const cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await baldb.client.send(cmd);
    return redirect("..");
  }

  const txs = new Txs();
  const upd81 = await btxdb.tx_update_status_item(tx, "final");
  txs.update(upd81);

  //log nav
  const new_nav = produce(ltd, (x) => {
    // value based on ltd price
    const curr_val = x.price * tx.amount_units;

    x.reason = `npo:${tx.owner} units redemption with diff:${tx.amount - curr_val}`;
    x.date = timestamp;
    x.units -= tx.amount_units;

    //redemptions are from cash portion
    x.composition.CASH.qty -= curr_val;
    x.composition.CASH.value -= curr_val;

    x.value -= curr_val;
    x.holders[tx.owner] -= tx.amount_units;
  });

  txs.append(navdb.log_txis(new_nav));

  //transfer to savings
  if (tx.account_other === "liq") {
    const bal = await baldb.npo_balance(+tx.owner);
    const liq_tx: IBalanceTx = {
      id: nanoid(),
      date_created: timestamp,
      date_updated: timestamp,
      owner: tx.owner,
      status: "final",
      account: "liq",
      bal_begin: bal.liq,
      bal_end: bal.liq + tx.amount,
      amount: tx.amount,
      amount_units: tx.amount,
      account_other_id: tx.id,
      account_other: "lock",
      account_other_bal_begin: tx.bal_begin,
      account_other_bal_end: tx.bal_begin - tx.amount_units,
    };
    const upd82 = baldb.balance_update_txi(+tx.owner, {
      liq: ["inc", tx.amount],
      // lock_units - already deducted in tx creation
    });

    txs.put({ TableName: BalanceTxsDb.name, Item: btxdb.new_tx_item(liq_tx) });
    txs.update(upd82);
    const cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await baldb.client.send(cmd);

    return redirect("..");
  }

  //transfer to grant
  const payout: IPayout = {
    id: nanoid(),
    source_id: tx.id,
    recipient_id: tx.owner,
    source: "lock",
    date: timestamp,
    amount: tx.amount,
    type: "pending",
  };
  txs.put({
    TableName: PayoutsDB.name,
    Item: podb.payout_record(payout),
  });
  const bal_update = baldb.balance_update_txi(+tx.owner, {
    payoutsPending: ["inc", tx.amount],
    cash: ["inc", tx.amount],
  });
  txs.update(bal_update);
  const cmd = new TransactWriteCommand({ TransactItems: txs.all });
  await baldb.client.send(cmd);

  return redirect("..");
};
