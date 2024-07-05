import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type WalletControllerChainOptions,
  getChainOptions,
} from "@terra-money/wallet-provider";

export const terra = createApi({
  reducerPath: "terra",
  baseQuery: fetchBaseQuery({ baseUrl: "not-used" }),
  endpoints: (builder) => ({
    chainOptions: builder.query<WalletControllerChainOptions, void>({
      //this means lcd endpoints are public - from: https://assets.terra.money/chains.json
      queryFn: () => getChainOptions().then((options) => ({ data: options })),
    }),
  }),
});

export const { useChainOptionsQuery } = terra;
