import type { Endow, Program } from "@better-giving/endowment";
import type { LoaderFunction } from "@remix-run/react";
import { loadAuth } from "auth/load-auth";
import { decodeState } from "helpers/state-params";
import type { UserV2 } from "types/auth";
import type { DonationIntent, EndowmentBalances } from "types/aws";
import * as v from "valibot";
import { getEndow } from "./get/endow";
import { getEndowBalance } from "./get/endow-balance";
import { type FiatCurrencies, getFiatCurrencies } from "./get/fiat-currencies";
import { getPrograms } from "./get/programs";
import { plusInt } from "./schema/endow-id";

export interface DonateData {
  id: number;
  intent: DonationIntent.ToResume | null;
  endow: Endow;
  user: UserV2 | null;
  /** need to await */
  currencies: Promise<FiatCurrencies>;
  programs: Promise<Program[]>;
  balance: Promise<EndowmentBalances>;
}

export const clientLoader: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  const id = v.parse(plusInt, params.id);
  const url = new URL(request.url);
  //setter of this should make sure that intent.endowmentId is the same as this page's param.id.
  const intent = decodeState<DonationIntent.ToResume>(
    url.searchParams.get("_s")
  );

  return {
    id,
    user: auth,
    intent,
    endow: await getEndow(id),
    currencies: getFiatCurrencies(auth ?? undefined),
    programs: getPrograms(id),
    balance: getEndowBalance(id.toString()),
  } satisfies DonateData;
};
