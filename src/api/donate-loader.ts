import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { decodeState } from "helpers/state-params";
import { type LoaderFunction, defer } from "react-router-dom";
import { apiEnv } from "services/constants";
import type { DonationIntent, EndowmentProfile, Program } from "types/aws";
import * as v from "valibot";
import { type FiatCurrencies, getFiatCurrencies } from "./get/fiat-currencies";
import { getPrograms } from "./get/programs";
import { endowId } from "./schema/endow-id";

export interface DonateData {
  id: number;
  intent: DonationIntent.ToResume | null;
  endow: EndowmentProfile;
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
    intent,
    endow: await getEndow(id),
    currencies: getFiatCurrencies(auth ?? undefined),
    programs: getPrograms(id),
  } satisfies DonateData);
};

async function getEndow(id: number) {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  url.pathname = `v9/endowments/${id}`;
  return cacheGet(url).then((res) => res.json());
}
