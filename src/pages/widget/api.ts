import type { INpo } from "@better-giving/endowment";
import { $int_gte1 } from "@better-giving/schemas";
import { search } from "helpers/https";
import type { EndowmentOption } from "types/npo";
import * as v from "valibot";
import type { Route } from "./+types";
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
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { id: sid, query = "" } = search(url);
  const selected_id = v.parse(v.optional($int_gte1), sid ?? params.id);
  const route_npo_id = v.parse(v.optional($int_gte1), params.id);
  const id = selected_id ?? route_npo_id;

  const page1 = get_npos({
    query,
    page: 1,
    fields: ["id", "name"],
    claimed: [true],
    published: [true, false],
  });

  return {
    base_url: url.origin,
    endow: id ? await npodb.npo(id) : undefined,
    endows: await page1.then((page) => page.items),
  } satisfies WidgetData;
};
