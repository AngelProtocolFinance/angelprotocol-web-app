import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunction, defer } from "react-router-dom";
import { version as ver } from "services/helpers";
import type { Endowment, EndowmentOption, Program } from "types/aws";
import type { EndowListPaginatedAWSQueryRes } from "types/aws";
import * as v from "valibot";
import { getEndow } from "./get/endow";
import { type FiatCurrencies, getFiatCurrencies } from "./get/fiat-currencies";
import { getPrograms } from "./get/programs";
import { endowId } from "./schema/endow-id";

export interface WidgetData {
  endow?: Endowment;
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
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const selectedId = v.parse(
    v.nullish(endowId),
    url.searchParams.get("id") ?? params.id
  );
  const routeEndowId = v.parse(v.optional(endowId), params.id);
  const id = selectedId ?? routeEndowId;

  const auth = await loadAuth();
  return defer({
    endow: id ? await getEndow(id) : undefined,
    currencies: getFiatCurrencies(auth ?? undefined),
    endows: await getEndows(url.searchParams.get("query") ?? ""),
    programs: id ? getPrograms(id) : Promise.resolve([]),
  } satisfies WidgetData);
};

async function getEndows(query: string) {
  const url = new URL(APIs.aws);
  url.pathname = `${ver(1)}/cloudsearch-nonprofits`;
  url.searchParams.set("page", "1");
  url.searchParams.set("fields", "id,name");
  url.searchParams.set("query", query);

  return cacheGet(url)
    .then<EndowListPaginatedAWSQueryRes<EndowmentOption[]>>((res) => res.json())
    .then((data) => data.Items);
}
