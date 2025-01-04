import type { Endow, Program } from "@better-giving/endowment";
import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import {
  type FiatCurrencies,
  getFiatCurrencies,
} from "api/get/fiat-currencies";
import { getPrograms } from "api/get/programs";
import { plusInt } from "api/schema/endow-id";
import { loadAuth } from "auth/load-auth";
import type { EndowOptionsPage, EndowmentOption } from "types/aws";
import * as v from "valibot";

export interface WidgetData {
  endow?: Endow;
  /** need to await */
  currencies: Promise<FiatCurrencies>;
  endows: EndowmentOption[];
  /** need to await */
  programs: Promise<Program[]>;
}

/* paths:
 * admin/:id/widget-config
 * /widget-config
 */
export const clientLoader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const selectedId = v.parse(
    v.nullish(plusInt),
    url.searchParams.get("id") ?? params.id
  );
  const routeEndowId = v.parse(v.optional(plusInt), params.id);
  const id = selectedId ?? routeEndowId;

  const auth = await loadAuth();
  return {
    endow: id ? await getEndow(id) : undefined,
    currencies: getFiatCurrencies(auth ?? undefined),
    endows: await getEndows(url.searchParams.get("query") ?? ""),
    programs: id ? getPrograms(id) : Promise.resolve([]),
  } satisfies WidgetData;
};

async function getEndows(query: string) {
  return ap
    .get<EndowOptionsPage>(`${ver(1)}/cloudsearch-nonprofits`, {
      searchParams: { page: 1, fields: "id,name", query },
    })
    .json()
    .then((data) => data.items);
}
