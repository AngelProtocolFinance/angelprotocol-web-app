import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { Quotation, TokenDetails } from "./coingecko";

export const handlers = [
  // ?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false
  http.get(`${APIs.coingecko}/api/v3/coins/:coinId`, () => {
    const details: TokenDetails = {
      image: { thumb: "" },
      detail_platforms: {
        ethereum: { decimal_place: 18, contract_address: "" },
      },
    };
    return HttpResponse.json(details);
  }),
  // ?ids=${coinId}&vs_currencies=usd
  http.get(`${APIs.coingecko}/api/v3/simple/price`, ({ request }) => {
    const url = new URL(request.url);
    const coinId = url.searchParams.get("ids");
    const quotation: Quotation = {
      [coinId ?? ""]: { usd: 1 },
    };
    return HttpResponse.json(quotation);
  }),
];
