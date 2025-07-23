import { NavHistoryDB } from "@better-giving/nav-history/db";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { npoBalances } from ".server/npo-balances";

export interface LoaderData {
  id: number;
  bal_lock: number;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const navdb = new NavHistoryDB(apes, env);
  const id = v.parse(plusInt, params.id);

  const [{ lock_units = 0 }, ltd] = await Promise.all([
    npoBalances(id),
    navdb.ltd(),
  ]);
  return {
    id,
    bal_lock: lock_units * ltd.price,
  } satisfies LoaderData;
};
