import { is_custom, tokens_map } from "@better-giving/crypto";
import { resp } from "helpers/https";
import type { ITokenEstimate } from "types/api";
import type { Route } from "./+types/token-estimate";
import { coingecko, np } from ".server/sdks";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const tkn = tokens_map[params.code];
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

    return resp.json({ min: 1 / rate, rate } satisfies ITokenEstimate);
  }

  const { min, min_usd, rate } = await np.estimate(tkn.code);

  const BG_MIN = 1;
  const gt_bg_min = min_usd >= BG_MIN ? min : BG_MIN / rate;
  /**  
   3% allowance:
   - 0.5% fee
   - 2.5% spread in case server estimate is not the same
   */
  const adjusted = gt_bg_min * 1.03;
  return resp.json({ min: adjusted, rate } satisfies ITokenEstimate);
};
