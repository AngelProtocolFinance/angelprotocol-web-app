import { YYYYMMDD } from "@better-giving/helpers/date";
import { isMonday } from "date-fns";
import type { ILog } from "lib/nav/interfaces";
import type { ActionFunction } from "react-router";
import { update_tickers } from "./update-tickers.js";
import { navdb } from ".server/aws/db.js";
import { is_resp, qstash_body } from ".server/utils.js";

export const action: ActionFunction = async ({ request }) => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  const now = new Date();
  const now_day_num = YYYYMMDD(now);

  const latest = await navdb.ltd();
  const ltd_day_num = YYYYMMDD(latest.price_updated);

  if (now_day_num === ltd_day_num) {
    console.info(`No updates needed for day ${now_day_num}`);
    return;
  }

  const updated_tickers = await update_tickers(
    Object.values(latest.composition)
  );

  const portfolio_value = updated_tickers.reduce((acc, t) => acc + t.value, 0);

  const timestamp = now.toISOString();
  //update other fields
  const updated_ltd: ILog = {
    ...latest,
    reason: "daily price update",
    date: timestamp,
    composition: updated_tickers.reduce(
      (acc, t) => ({ ...acc, [t.id]: t }),
      {}
    ),
    price: portfolio_value / latest.units,
    price_updated: timestamp,
    value: portfolio_value,
  };

  await navdb.log_put(updated_ltd, { day: true, week: isMonday(now) });
  console.info("Updated LTD:", updated_ltd);
};
