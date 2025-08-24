import type { IPrettyBalance } from "@better-giving/balance";
import type { INpo } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import { type LoaderFunction, data } from "@vercel/remix";
import * as v from "valibot";
import { baldb, npodb } from ".server/aws/db";

export interface DonateData {
  id: number;
  endow: INpo;
  /** need to await */
  balance: Promise<IPrettyBalance>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = v.parse($int_gte1, params.id);
  const endow = await npodb.npo(id);
  if (!endow) throw new Response(null, { status: 404 });

  return data({
    id,
    endow,
    balance: baldb.npo_balance(id),
  } satisfies DonateData);
};
