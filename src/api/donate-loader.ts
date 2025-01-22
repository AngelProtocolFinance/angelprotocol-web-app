import type { Endow } from "@better-giving/endowment";
import { type LoaderFunction, data } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { getEndow } from "./get/endow";
import { getEndowBalance } from "./get/endow-balance";
import { plusInt } from "./schema/endow-id";
import { cognito } from ".server/auth";

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
  return data(
    {
      id,
      user,
      endow: await getEndow(id),
      balance: getEndowBalance(id.toString()),
    } satisfies DonateData,
    { headers }
  );
};
