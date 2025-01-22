import type { Endow } from "@better-giving/endowment";
import { type LoaderFunction, data } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { getEndowBalance } from "./get/endow-balance";
import { plusInt } from "./schema/endow-id";
import { cognito } from ".server/auth";
import { getNpoByIdOrSlug } from ".server/get-npo";

export interface DonateData {
  id: number;
  endow: Endow;
  user: UserV2 | null;
  /** need to await */
  balance: Promise<EndowmentBalances>;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  const id = v.parse(plusInt, params.id);
  const endow = await getNpoByIdOrSlug(id);
  if (!endow) return { status: 404 };

  return data(
    {
      id,
      user,
      endow,
      balance: getEndowBalance(id.toString()),
    } satisfies DonateData,
    { headers }
  );
};
