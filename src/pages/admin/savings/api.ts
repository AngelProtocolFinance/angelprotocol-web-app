import { BalanceDb } from "@better-giving/balance";
import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface LoaderData {
  id: number;
  bal_liq: number;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = v.parse(plusInt, params.id);
  const db = new BalanceDb(apes, env);

  const [{ liq }] = await Promise.all([db.npo_balance(id)]);

  return {
    id,
    bal_liq: liq,
  } satisfies LoaderData;
};
