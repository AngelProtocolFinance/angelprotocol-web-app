import { NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface ITicker {
  /** uppercase ticker */
  id: string;
  qty: number;
  /** YYYY-MM-DD */
  price_date: string;
  price: number;
  /** qty * price */
  value: number;
}

export interface ILog {
  /** rebalance, purchase, redemption */
  reason: string;
  /** log:created, ltd:updated  */
  date: string;
  units: number;
  price: number;
  /** modified by price updator */
  price_updated: string;
  /** ticker: uppercase, ITicker */
  composition: Record<string, ITicker>;
  /** total value of composition */
  value: number;
  /** holder-id, units */
  holders: Record<string, number>;
}

export interface LoaderData {
  ltd: ILog;
  logs: ILog[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const navdb = new NavHistoryDB(apes, env);

  const [ltd, logs] = await Promise.all([navdb.ltd(), navdb.week_series()]);

  return resp.json({
    ltd,
    logs: logs.items,
  } satisfies LoaderData);
};
