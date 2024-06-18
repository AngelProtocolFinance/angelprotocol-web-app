import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Quotation = {
  [index: string]: {
    usd: number;
  };
};

type TokenDetails = {
  detail_platforms: {
    [platformId: string]: { decimal_place: number; contract_address: string };
  };
  image: {
    thumb: string;
  };
};

export const coingecko = createApi({
  reducerPath: "coingecko",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com",
  }),
  endpoints: (builder) => ({
    usdRate: builder.query<number, string>({
      query: (coinId) => `api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      transformResponse: (res: Quotation, _, coinId) => res[coinId].usd,
    }),
    tokenDetails: builder.query<TokenDetails, string>({
      query: (coinId) =>
        `api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
    }),
  }),
});

export const { useUsdRateQuery, useLazyTokenDetailsQuery } = coingecko;
