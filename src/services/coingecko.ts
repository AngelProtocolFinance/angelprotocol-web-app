import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Quotation = {
  [index: string]: {
    usd: number;
  };
};

type Coin = {
  /** e.g. ethereum */
  id: string;
  /** e.g. Ethereum */
  name: string;
  /** e.g. ETH */
  symbol: string;
  /**  */
  platforms: { [platformId: string]: string };
  /** images */
  thumb: string;
  large: string;
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
    tokens: builder.query<Coin[], unknown>({
      query: () => `api/v3/coins-list?include_platform=true&status=active`,
      transformResponse: (res: { coins: Coin[] }) => res.coins,
    }),
  }),
});

export const { useUsdRateQuery, useTokensQuery } = coingecko;
