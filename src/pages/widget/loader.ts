import type { INpo } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import { search } from "helpers/https";
import type { LoaderFunction } from "react-router";
import type { EndowmentOption } from "types/npo";
import * as v from "valibot";
import { npodb } from ".server/aws/db";
import { get_npos } from ".server/npos";

export interface WidgetData {
  base_url: string;
  // user: UserV2 | null; user currency not needed in preview
  endow?: INpo;
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
  const { id: sid, query = "" } = search(url);
  const selectedId = v.parse(v.optional($int_gte1), sid ?? params.id);
  const routeEndowId = v.parse(v.optional($int_gte1), params.id);
  const id = selectedId ?? routeEndowId;

  const page1 = get_npos({
    query,
    page: 1,
    fields: ["id", "name"],
  });

  return {
    base_url: url.origin,
    endow: id ? await npodb.npo(id) : undefined,
    endows: await page1.then((page) => page.items),
  } satisfies WidgetData;
};
