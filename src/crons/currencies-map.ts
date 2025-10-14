import type { LoaderFunction } from "react-router";

import type { ICurrencyFvMap } from "lib/table";
import { table } from ".server/aws/db";
import { cron_secret, openexchange_app_id } from ".server/env";

export const loader: LoaderFunction = async ({ request }) => {
  const auth_header = request.headers.get("authorization");
  if (auth_header !== `Bearer ${cron_secret}`) {
    return new Response("unauthorized", { status: 403 });
  }

  const res = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${openexchange_app_id}&base=USD`
  );
  if (!res.ok) throw res;

  const { rates } = await res.json();

  // SLL is now SLE
  const { SLL, ...other_rates } = rates;

  const map: ICurrencyFvMap = {
    date_created: new Date().toISOString(),
    all: other_rates,
  };

  const put = await table.currency_map_put(map, "Usd");
  console.info(put);
  return new Response(null, { status: 200 });
};
