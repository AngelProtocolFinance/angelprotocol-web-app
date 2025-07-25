import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { endowIdParam } from "@better-giving/endowment/schema";
import { NavHistoryDB } from "@better-giving/nav-history";
import { redirect } from "@remix-run/react";
import type { ActionFunction } from "@vercel/remix";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { parse } from "valibot";
import { type Schema, type Source, schema } from "./types";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";

type TRedirects = { [S in Source]: string };

export const transfer_action =
  (redirects: TRedirects): ActionFunction =>
  async ({ request, params }) => {
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
    const timestamp = new Date().toISOString();
    const to_id = nanoid();
    const from_id = nanoid();

    interface Common
      extends Pick<IBalanceTx, "date_created" | "date_updated" | "owner"> {}
    const common: Common = {
      date_created: timestamp,
      date_updated: timestamp,
      owner: id.toString(),
    };

    const units = +fv.amount / ltd.price;
    if (fv.source === "lock") {
      const tx: IBalanceTx = {
        ...common,
        id: from_id,
        status: "pending",
        account: "lock",
        bal_begin: bal.lock_units,
        bal_end: bal.lock_units - units,
        amount: +fv.amount,
        amount_units: units,
        account_other_id: to_id,
        account_other: "liq",
        account_other_bal_begin: bal.liq,
        account_other_bal_end: bal.liq + +fv.amount,
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
        id: from_id,
        status: "final",
        account: "liq",
        bal_begin: bal.liq,
        bal_end: bal.liq - +fv.amount,
        amount: +fv.amount,
        amount_units: +fv.amount,
        account_other_id: to_id,
        account_other: "lock",
        account_other_bal_begin: bal.lock_units,
        account_other_bal_end: bal.lock_units + units,
      };
      const lock_tx: IBalanceTx = {
        ...common,
        id: to_id,
        status: "final",
        account: "lock",
        bal_begin: bal.lock_units,
        bal_end: bal.lock_units + units,
        amount: +fv.amount,
        amount_units: units,
        account_other_id: from_id,
        account_other: "liq",
        account_other_bal_begin: bal.liq,
        account_other_bal_end: bal.liq - +fv.amount,
      };
      txs.put({
        TableName: BalanceTxsDb.name,
        Item: bal_txs_db.new_tx_item(tx),
      });

      txs.put({
        TableName: BalanceTxsDb.name,
        Item: bal_txs_db.new_tx_item(lock_tx),
      });

      const bal_update = baldb.update_balance_item(id, {
        liq: -fv.amount,
        lock_units: units,
      });

      const nav_log = produce(ltd, (x) => {
        x.reason = `npo:${id} transfer allocation from liq to lock`;
        x.date = timestamp;
        x.units += units;
        // new investments are allocated to cash portion and rebalanced later
        x.composition.CASH.qty += +fv.amount;
        x.composition.CASH.value += +fv.amount;

        x.value += +fv.amount;
        x.holders[id] ||= 0;
        x.holders[id] += units;
      });

      txs.append(navdb.log_items(nav_log));
      txs.update(bal_update);
    }

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    await baldb.client.send(cmd);
    return redirect(redirects[fv.source]);
  };
