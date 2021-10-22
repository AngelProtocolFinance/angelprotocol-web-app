import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

import { Result, Endowment, Lookup } from "./types";

//TODO: restructure api categories and reducer nesting
export const endowmentAPI = createApi({
  reducerPath: "endowmentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, any>({
      query: () => {
        return {
          url: `endowments`,
          method: "GET",
        };
      },
      transformResponse: (res: Result) => {
        const _lookup: Lookup = {};
        res.Items.forEach((endowment) => {
          _lookup[endowment.owner] = endowment.address;
        });
        //TODO: remove this test data once testnet aws endpoint is available
        //manual add wallet address for testing
        _lookup["terra178u9lz89f54njqz6nentst3m9nye2cc7ezssmq"] =
          "test address";
        return _lookup;
      },
    }),
    details: builder.query<Endowment[], any>({
      query: () => {
        return {
          url: `endowments`,
          method: "GET",
        };
      },
      transformResponse: (res: Result) => {
        return res.Items;
      },
    }),
  }),
});

export const { useLookupQuery, useDetailsQuery } = endowmentAPI;
