import { loadAuth } from "auth/load-auth";
import { decodeState } from "helpers/state-params";
import { type LoaderFunction, defer } from "react-router-dom";
import type { UserV2 } from "types/auth";
import type { DonationIntent, EndowmentProfile, Program } from "types/aws";
import * as v from "valibot";
import { getEndow } from "./get/endow";
import { type FiatCurrencies, getFiatCurrencies } from "./get/fiat-currencies";
import { getPrograms } from "./get/programs";
import { endowId } from "./schema/endow-id";

export interface DonateData {
  id: number;
  intent: DonationIntent.ToResume | null;
  endow: EndowmentProfile;
  user: UserV2 | null;
  /** need to await */
  currencies: Promise<FiatCurrencies>;
  programs: Promise<Program[]>;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  const id = v.parse(endowId, params.id);
  const url = new URL(request.url);
  //setter of this should make sure that intent.endowmentId is the same as this page's param.id.
  const intent = decodeState<DonationIntent.ToResume>(
    url.searchParams.get("_s")
  );

  return defer({
    id,
    user: auth,
    intent,
    endow: await getEndow(id),
    currencies: getFiatCurrencies(auth ?? undefined),
    programs: getPrograms(id),
  } satisfies DonateData);
};
