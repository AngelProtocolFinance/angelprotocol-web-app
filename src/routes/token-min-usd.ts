import { is_custom, tokens_map } from "@better-giving/assets/tokens";
import type { NP } from "@better-giving/nowpayments/types";
import { resp } from "helpers/https";
import type { Route } from "./+types/token-min-usd";
import { coingecko } from ".server/sdks";
import type { ITokenMin } from "types/api";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const tkn = tokens_map[params.id];
  if (!tkn) throw new Response("not found", { status: 404 });

  if (is_custom(tkn.id)) {
    //get usd rate from coingecko
    const res = await coingecko((x) => {
      x.pathname = `api/v3/simple/price?ids=${tkn.cg_id}&vs_currencies=usd`;
      return x;
    });

    if (!res.ok) throw res;
    const {
      [tkn.cg_id]: { usd: rate },
    } = await res.json();

    return resp.json({ min: 1 / rate, rate } satisfies ITokenMin);
  }

  const res = await fetch(
    `/api/nowpayments/v1/min-amount?currency_from=${tkn.code}&fiat_equivalent=usd`
  );
  if (!res.ok) throw res;
  const { min_amount: min, fiat_equivalent: min_usd }: Required<NP.Estimate> =
    await res.json();

  const rate = min_usd / min;

  const BG_MIN = 1;
  const gt_bg_min = min_usd >= BG_MIN ? min : BG_MIN / rate;
  /**  
   3% allowance:
   - 0.5% fee
   - 2.5% spread in case server estimate is not the same
   */
  const adjusted = gt_bg_min * 1.03;
  return resp.json({ min: adjusted, rate } satisfies ITokenMin);
};
