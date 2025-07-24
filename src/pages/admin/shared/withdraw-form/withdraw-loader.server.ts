import { BalanceDb } from "@better-giving/balance";
import { endowIdParam } from "@better-giving/endowment/schema";
import { NavHistoryDB } from "@better-giving/nav-history/db";
import type { LoaderFunction } from "@vercel/remix";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface LoaderData {
  id: number;
  bal_lock: number;
  bal_liq: number;
}

export const withdraw_loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(endowIdParam, params.id);

  const nav_db = new NavHistoryDB(apes, env);
  const baldb = new BalanceDb(apes, env);

  const [ltd, bal] = await Promise.all([nav_db.ltd(), baldb.npo_balance(id)]);

  return {
    id,
    bal_lock: bal.lock_units * ltd.price,
    bal_liq: bal.liq,
  } satisfies LoaderData;
};
