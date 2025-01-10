import type { Endow } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import { BASE_URL } from "constants/env";
import type { EndowOptionsPage, EndowmentOption } from "types/aws";
import * as v from "valibot";

export interface WidgetData {
  origin: string;
  // user: UserV2 | null; user currency not needed in preview
  endow?: Endow;
  /** need to await */
  endows: EndowmentOption[];
  /** need to await */
}

/* paths:
 * admin/:id/widget-config
 * /widget-config
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const selectedId = v.parse(
    v.nullish(plusInt),
    url.searchParams.get("id") ?? params.id
  );
  const routeEndowId = v.parse(v.optional(plusInt), params.id);
  const id = selectedId ?? routeEndowId;

  return {
    origin: request.headers.get("host") ?? BASE_URL,
    endow: id ? await getEndow(id) : undefined,
    endows: await getEndows(url.searchParams.get("query") ?? ""),
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
