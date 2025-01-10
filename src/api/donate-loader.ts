import type { Endow, Program } from "@better-giving/endowment";
import { type LoaderFunction, data } from "@vercel/remix";
import { cognito } from "auth";
import type { UserV2 } from "types/auth";
import type { EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { getEndow } from "./get/endow";
import { getEndowBalance } from "./get/endow-balance";
import { type FiatCurrencies, getFiatCurrencies } from "./get/fiat-currencies";
import { getPrograms } from "./get/programs";
import { plusInt } from "./schema/endow-id";

export interface DonateData {
  id: number;
  endow: Endow;
  user: UserV2 | null;
  /** need to await */
  currencies: Promise<FiatCurrencies>;
  programs: Promise<Program[]>;
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
      currencies: getFiatCurrencies(user ?? undefined),
      programs: getPrograms(id),
      balance: getEndowBalance(id.toString()),
    } satisfies DonateData,
    { headers }
  );
};
