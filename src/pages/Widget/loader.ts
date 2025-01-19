import type { Endow } from "@better-giving/endowment";
import type { LoaderFunction } from "@vercel/remix";
import { getEndow } from "api/get/endow";
import { plusInt } from "api/schema/endow-id";
import type { EndowmentOption } from "types/aws";
import * as v from "valibot";
import { getNpos } from ".server/get-npos";

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

  const endowsPage = getNpos({
    query: url.searchParams.get("query") ?? "",
    page: 1,
    fields: ["id", "name"],
  });

  return {
    origin: url.origin,
    endow: id ? await getEndow(id) : undefined,
    endows: await endowsPage.then((page) => page.items),
  } satisfies WidgetData;
};
