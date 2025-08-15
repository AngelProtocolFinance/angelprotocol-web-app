import type { Endow } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import type { EndowmentOption } from "types/npo";
import * as v from "valibot";
import { getNpos } from ".server/npos";

export interface WidgetData {
  base_url: string;
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
    v.nullish($int_gte1),
    url.searchParams.get("id") ?? params.id
  );
  const routeEndowId = v.parse(v.optional($int_gte1), params.id);
  const id = selectedId ?? routeEndowId;

  const endowsPage = getNpos({
    query: url.searchParams.get("query") ?? "",
    page: 1,
    fields: ["id", "name"],
  });

  return {
    base_url: url.origin,
    endow: id ? await getEndow(id) : undefined,
    endows: await endowsPage.then((page) => page.items),
  } satisfies WidgetData;
};
