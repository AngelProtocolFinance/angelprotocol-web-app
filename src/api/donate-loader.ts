import { BalanceDb, type IPrettyBalance } from "@better-giving/balance";
import type { Endow } from "@better-giving/endowment";
import { type LoaderFunction, data } from "@vercel/remix";
import * as v from "valibot";
import { plusInt } from "./schema/endow-id";
import { apes } from ".server/aws/db";
import { env } from ".server/env";
import { getNpo } from ".server/npo";

export interface DonateData {
  id: number;
  endow: Endow;
  /** need to await */
  balance: Promise<IPrettyBalance>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = v.parse(plusInt, params.id);
  const endow = await getNpo(id);
  if (!endow) throw new Response(null, { status: 404 });
  const bal_db = new BalanceDb(apes, env);

  return data({
    id,
    endow,
    balance: bal_db.npo_balance(id),
  } satisfies DonateData);
};
