import { npo_series_opts } from "@better-giving/nav-history/schemas";
import type { LoaderFunction } from "@vercel/remix";
import { resp, search } from "helpers/https";
import type { INpoMetrics } from "types/npo-sf-metrics";
import { parse } from "valibot";
import { navdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const opts = parse(npo_series_opts, search(x.request));

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const items = await navdb.npo_series(adm.id, opts);

  /** compute twr */
  let $twr = 1;
  for (let j = 1; j < items.length; j++) {
    const curr = items[j].price;
    const prev = items[j - 1].price;
    if (prev > 0) {
      const period_return = curr / prev;
      $twr *= period_return;
    }
  }

  const res: INpoMetrics = {
    points: items,
    twr: $twr - 1,
  };

  return resp.json(res);
};
