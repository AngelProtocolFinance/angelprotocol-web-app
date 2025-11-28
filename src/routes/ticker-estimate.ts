import { resp } from "helpers/https";
import type { ITokenEstimate } from "types/api";
import type { Route } from "./+types/ticker-estimate";
import { finnhub } from ".server/sdks";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const res = await finnhub((x) => {
    x.pathname = "api/v1/quote";
    x.searchParams.set("symbol", params.symbol);
    return x;
  });

  if (!res.ok) throw res;

  const BG_MIN = 50;
  // https://finnhub.io/docs/api/quote
  const { pc: usd_per_unit } = await res.json();

  return resp.json({
    min: BG_MIN / usd_per_unit,
    rate: usd_per_unit,
  } satisfies ITokenEstimate);
};
