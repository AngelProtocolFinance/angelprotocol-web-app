import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { endowIdParam } from "@better-giving/endowment/schema";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import { type IPayout, PayoutsDB } from "@better-giving/payouts";
import { redirect, useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@vercel/remix";
import { nanoid } from "nanoid";
import { parse } from "valibot";
import { type Schema, WithdrawForm, schema } from "../shared/widthraw-form";
import { use_dashboard_data } from "./use-dashboard-data";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const id = parse(endowIdParam, params.id);
  if (!user.endowments.includes(id)) return { status: 403 };

  const navdb = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);
  const [bal, ltd] = await Promise.all([baldb.npo_balance(id), navdb.ltd()]);
  const json = await request.json();
  const fv = parse(schema, {
    ...json,
    bals: {
      liq: bal.liq,
      lock: bal.lock_units * ltd.price,
    },
  } satisfies Schema);

  const txs = new Txs();
  const bal_txs_db = new BalanceTxsDb(apes, env);
  const payouts_db = new PayoutsDB(apes, env);
  const timestamp = new Date().toISOString();
  const to_id = nanoid();
  const from_id = nanoid();

  const common = {
    id: from_id,
    date_created: timestamp,
    date_updated: timestamp,
    owner: id.toString(),
    status: "pending",
    account_other_id: to_id,
    account_other: "grant",
    account_other_bal_begin: 0,
    account_other_bal_end: +fv.amount,
  } as IBalanceTx;

  if (fv.source === "lock") {
    const units = +fv.amount / ltd.price;
    const tx: IBalanceTx = {
      ...common,
      account: "investments",
      bal_begin: bal.lock_units,
      bal_end: bal.lock_units - units,
      amount: +fv.amount,
      amount_units: units,
    };
    txs.put({
      TableName: BalanceTxsDb.name,
      Item: bal_txs_db.new_tx_item(tx),
    });
    const bal_update = baldb.update_balance_item(id, { lock_units: -units });
    txs.update(bal_update);
  }

  if (fv.source === "liq") {
    const tx: IBalanceTx = {
      ...common,
      account: "savings",
      bal_begin: bal.liq,
      bal_end: bal.liq - +fv.amount,
      amount: +fv.amount,
      amount_units: +fv.amount,
    };
    txs.put({
      TableName: BalanceTxsDb.name,
      Item: bal_txs_db.new_tx_item(tx),
    });
    const bal_update = baldb.update_balance_item(id, { liq: -fv.amount });
    txs.update(bal_update);
  }

  const payout: IPayout = {
    id: to_id,
    source_id: from_id,
    recipient_id: id.toString(),
    source: "lock",
    date: timestamp,
    amount: +fv.amount,
    type: "pending",
  };

  txs.put({
    TableName: PayoutsDB.name,
    Item: payouts_db.new_payout_item(payout),
  });
  const cmd = new TransactWriteCommand({
    TransactItems: txs.all,
  });
  await baldb.client.send(cmd);
  return redirect("../savings");
};

export default function Page() {
  const data = use_dashboard_data();
  const fetcher = useFetcher();
  return (
    <WithdrawForm
      bals={{
        liq: data.bal_liq,
        lock: data.bal_lock,
      }}
      onSubmit={(fv) =>
        fetcher.submit(fv, { method: "POST", encType: "application/json" })
      }
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
