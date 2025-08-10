import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb, type IBalanceTx } from "@better-giving/balance-txs";
import { Txs } from "@better-giving/db";
import { NavHistoryDB } from "@better-giving/nav-history";
import { type IPayout, PayoutsDB } from "@better-giving/payouts";
import { redirect } from "@remix-run/react";
import type { ActionFunction } from "@vercel/remix";
import { nanoid } from "nanoid";
import { parse } from "valibot";
import { type Schema, type Source, schema } from "./types";
import { TransactWriteCommand, apes } from ".server/aws/db";
import { env } from ".server/env";
import { admin_checks, is_resp } from ".server/utils";

type TRedirects = { [S in Source]: string };

export const withdraw_action =
  (redirects: TRedirects): ActionFunction =>
  async (x) => {
    const adm = await admin_checks(x);
    if (is_resp(adm)) return adm;

    const navdb = new NavHistoryDB(apes, env);
    const baldb = new BalanceDb(apes, env);
    const [bal, ltd] = await Promise.all([
      baldb.npo_balance(adm.id),
      navdb.ltd(),
    ]);
    const json = await adm.req.json();
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
      owner: adm.id.toString(),
      account_other_id: to_id,
      account_other: "grant",
      account_other_bal_begin: 0,
      account_other_bal_end: +fv.amount,
    } as IBalanceTx;

    if (fv.source === "lock") {
      const units = +fv.amount / ltd.price;
      const tx: IBalanceTx = {
        ...common,
        status: "pending",
        account: "lock",
        bal_begin: bal.lock_units,
        bal_end: bal.lock_units - units,
        amount: +fv.amount,
        amount_units: units,
      };
      txs.put({
        TableName: BalanceTxsDb.name,
        Item: bal_txs_db.new_tx_item(tx),
      });
      const bal_update = baldb.update_balance_item(adm.id, {
        lock_units: -units,
      });
      txs.update(bal_update);
    }

    if (fv.source === "liq") {
      const tx: IBalanceTx = {
        ...common,
        // liq withdrawals create payouts immediately
        status: "final",
        account: "liq",
        bal_begin: bal.liq,
        bal_end: bal.liq - +fv.amount,
        amount: +fv.amount,
        amount_units: +fv.amount,
      };
      txs.put({
        TableName: BalanceTxsDb.name,
        Item: bal_txs_db.new_tx_item(tx),
      });
      const bal_update = baldb.update_balance_item(adm.id, {
        liq: -fv.amount,
        cash: +fv.amount,
      });
      txs.update(bal_update);

      // liq withdrawals create payouts immediately
      const payout: IPayout = {
        id: to_id,
        source_id: from_id,
        recipient_id: adm.id.toString(),
        source: fv.source,
        date: timestamp,
        amount: +fv.amount,
        type: "pending",
      };

      txs.put({
        TableName: PayoutsDB.name,
        Item: payouts_db.payout_record(payout),
      });
    }

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    await baldb.client.send(cmd);
    return redirect(redirects[fv.source]);
  };
