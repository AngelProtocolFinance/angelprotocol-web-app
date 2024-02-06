import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Quotation = {
  [index: string]: {
    usd: number;
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
  }),
});

export const { useUsdRateQuery } = coingecko;
