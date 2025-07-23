import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import * as v from "valibot";
import { cognito, toAuth } from ".server/auth";
import { npoBalances } from ".server/npo-balances";

export interface LoaderData {
  id: number;
  bal_liq: number;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = v.parse(plusInt, params.id);

  const [{ liq = 0 }] = await Promise.all([npoBalances(id)]);

  return {
    id,
    bal_liq: liq,
  } satisfies LoaderData;
};
