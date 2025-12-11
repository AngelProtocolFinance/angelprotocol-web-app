import { Txs } from "@better-giving/db";
import { type IPayout, PayoutsDB } from "@better-giving/payouts";
import type { IBalanceTx } from "lib/balance-txs";
import { nanoid } from "nanoid";
import { type ActionFunction, redirect } from "react-router";
import { parse } from "valibot";
import { type Schema, type Source, schema } from "./types";
import {
  TransactWriteCommand,
  baldb,
  btxdb,
  navdb,
  podb,
} from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

type TRedirects = { [S in Source]: string };

export const withdraw_action =
  (redirects: TRedirects): ActionFunction =>
  async (x) => {
    const adm = await admin_checks(x);
    if (is_resp(adm)) return adm;

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

      txs.put(btxdb.tx_put_txi(tx));
      const bal_update = baldb.balance_update_txi(adm.id, {
        lock_units: ["dec", units],
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
      txs.put(btxdb.tx_put_txi(tx));
      const bal_update = baldb.balance_update_txi(adm.id, {
        liq: ["dec", +fv.amount],
        cash: ["inc", +fv.amount],
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
        Item: podb.payout_record(payout),
      });
    }

    const cmd = new TransactWriteCommand({
      TransactItems: txs.all,
    });
    await baldb.client.send(cmd);
    return redirect(redirects[fv.source]);
  };
