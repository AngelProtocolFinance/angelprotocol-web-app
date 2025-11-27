import type { ActionFunction } from "react-router";

import type { ICurrencyFvMap } from "lib/table";
import { table } from ".server/aws/db";
import { openexchange_app_id } from ".server/env";
import { is_resp, qstash_body } from ".server/utils";

export const action: ActionFunction = async ({
  request,
}): Promise<Response> => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

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
