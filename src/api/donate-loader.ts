import type { Endow } from "@better-giving/endowment";
import { type LoaderFunction, data } from "@vercel/remix";
import type { EndowmentBalances } from "types/npo-balance";
import * as v from "valibot";
import { getEndowBalance } from "./get/endow-balance";
import { plusInt } from "./schema/endow-id";
import { getNpo } from ".server/npo";

export interface DonateData {
  id: number;
  endow: Endow;
  /** need to await */
  balance: Promise<EndowmentBalances>;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = v.parse(plusInt, params.id);
  const endow = await getNpo(id);
  if (!endow) throw new Response(null, { status: 404 });

  return data({
    id,
    endow,
    balance: getEndowBalance(id.toString()),
  } satisfies DonateData);
};
