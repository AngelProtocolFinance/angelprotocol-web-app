import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";

export type TokenDetails = {
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
    baseUrl: APIs.coingecko,
  }),
  endpoints: (builder) => ({
    tokenDetails: builder.query<TokenDetails, string>({
      query: (coinId) =>
        `api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
    }),
  }),
});

export const { useLazyTokenDetailsQuery } = coingecko;
