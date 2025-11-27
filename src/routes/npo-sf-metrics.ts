import { resp, search } from "helpers/https";
import type { ISeriesPoint } from "lib/nav";
import { npo_series_opts } from "lib/nav/schemas";
import type { LoaderFunction } from "react-router";
import type { INpoMetrics, IPerfPoint } from "types/npo-sf-metrics";
import { parse } from "valibot";
import { navdb } from ".server/aws/db";
import { admin_checks, is_resp } from ".server/utils";

export const loader: LoaderFunction = async (x) => {
  const opts = parse(npo_series_opts, search(x.request));

  const adm = await admin_checks(x);
  if (is_resp(adm)) return adm;

  const ltd = await navdb.ltd();
  const ltd_holding: ISeriesPoint = {
    date: ltd.date,
    units: ltd.holders[adm.id] || 0,
    price: ltd.price,
    value: ltd.holders[adm.id] * ltd.price,
  };
  const series = await navdb.npo_series(adm.id, opts);
  const items = series.concat([ltd_holding]);

  let $running = items[0].value;
  let $perf = 0;
  const $points: IPerfPoint[] = [];

  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1];
    const curr = items[i];
    const diff = curr.units - prev.units;
    const net = diff * curr.price;

    $running += net;
    $perf = curr.value;

    $points.push({
      date: curr.date,
      perf: curr.value,
      invested: $running,
    });
  }

  const total_return = $running > 0 ? ($perf - $running) / $running : 0;

  return resp.json({
    points: $points,
    total_return,
  } satisfies INpoMetrics);
};
