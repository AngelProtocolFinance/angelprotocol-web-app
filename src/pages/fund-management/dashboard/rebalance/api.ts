import { Txs } from "@better-giving/db";
import {
  type IComposition,
  type IRebalanceLog,
  type ITicker,
  NavHistoryDB,
} from "@better-giving/nav-history";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { parse } from "valibot";
import { prices_fn, to_bals } from "./helpers";
import { fv as schema, ticker_nets } from "./types";
import { cognito, toAuth } from ".server/auth";
import { TransactWriteCommand, navdb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };
  return navdb.ltd();
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const ltd = await navdb.ltd();
  const bals = to_bals(ltd.composition);

  const fv = parse(schema, {
    txs: await request.json(),
    bals,
  });

  const timestamp = new Date().toISOString();
  const nets = ticker_nets(fv.bals, fv.txs);
  const prices = prices_fn(fv.txs);

  const tickers: ITicker[] = Object.values(ltd.composition).map((t) => {
    const ps = prices[t.id];
    const n = nets[t.id];
    if (!ps || n == null) return t; // no price or net, return original ticker

    const ps_sum = ps.reduce((a, b) => a + b, 0);
    const ps_avg = ps_sum / ps.length;

    return {
      ...t,
      qty: n,
      price: ps_avg,
      value: n * ps_avg,
      price_date: timestamp,
    };
  });
  const total = tickers.reduce((sum, t) => sum + t.value, 0);
  const comp = tickers.reduce(
    (acc, t) => ({ ...acc, [t.id]: t }),
    {} as IComposition
  );

  const txs = new Txs();
  const rebalance_id = nanoid();
  const rebalance: IRebalanceLog = {
    txs: fv.txs,
    bals: fv.bals,
    id: rebalance_id,
    date: timestamp,
  };

  txs.put({
    TableName: NavHistoryDB.name,
    Item: navdb.rebalance_item(rebalance),
  });

  const updated_nav = produce(ltd, (x) => {
    x.reason = `rebalance: ${rebalance_id}`;
    x.composition = comp;
    x.value = total;
    x.price = total / ltd.units;
    x.price_updated = timestamp;
  });

  const nav_update_txis = navdb.update_txis(updated_nav);
  txs.append(nav_update_txis);

  const cmd = new TransactWriteCommand({
    TransactItems: txs.all,
  });

  await navdb.client.send(cmd);
  return redirect("..");
};
