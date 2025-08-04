import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { NavHistoryDB } from "@better-giving/nav-history";
import { type IPayout, PayoutsDB } from "@better-giving/payouts";
import { type ActionFunction, redirect } from "@vercel/remix";
import { produce } from "immer";
import { nanoid } from "nanoid";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";

const verdict_schema = v.picklist(["approve", "reject"]);
const tx_id_schema = v.pipe(
  v.string("required"),
  v.nonEmpty("tx id is required")
);

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, { headers });
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const json = await request.json();
  const { verdict } = v.parse(v.object({ verdict: verdict_schema }), json);
  const tx_id = v.parse(tx_id_schema, params.tx_id);

  const timestamp = new Date().toISOString();
  const txsdb = new BalanceTxsDb(apes, env);
  const baldb = new BalanceDb(apes, env);

  const tx = await txsdb.tx(tx_id);

  if (!tx) return { status: 404 };
  const navdb = new NavHistoryDB(apes, env);
  const ltd = await navdb.ltd();

  if (ltd.composition.CASH.value < tx.amount) {
    return {
      status: 400,
      message: "insufficient cash balance to approve this request.",
    };
  }

  if (verdict === "reject") {
    const txs = new Txs();
    const upd81 = await txsdb.tx_update_status_item(tx, "cancelled");
    //add back units
    const upd82 = baldb.update_balance_item(+tx.owner, {
      lock_units: tx.amount_units,
    });
    txs.update(upd81).update(upd82);
    const cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await baldb.client.send(cmd);
    return redirect("..");
  }

  const txs = new Txs();
  const upd81 = await txsdb.tx_update_status_item(tx, "final");
  txs.update(upd81);

  //create payout
  const payoutsdb = new PayoutsDB(apes, env);
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
    Item: payoutsdb.new_payout_item(payout),
  });

  //log nav
  const new_nav = produce(ltd, (x) => {
    // value based on ltd price
    const curr_val = x.price * tx.amount_units;

    x.reason = `npo:${tx.owner} units redemption with diff:${tx.amount - curr_val}`;
    x.date = timestamp;
    x.units += tx.amount_units;

    //redemptions are from cash portion
    x.composition.CASH.qty -= curr_val;
    x.composition.CASH.value -= curr_val;

    x.value -= curr_val;
    x.holders[tx.owner] -= tx.amount_units;
  });

  txs.append(navdb.log_items(new_nav));
};
