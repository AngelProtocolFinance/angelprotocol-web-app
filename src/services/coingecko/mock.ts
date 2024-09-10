import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { TokenDetails } from "./coingecko";

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
];
