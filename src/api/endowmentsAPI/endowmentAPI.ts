import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { Result, Lookup, Accounts, Endowment } from "./types";

//TODO: restructure api categories and reducer nesting
export const endowmentAPI = createApi({
  reducerPath: "endowmentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      transformResponse: (res: Result) => {
        const _lookup: Lookup = {};
        res.Items.forEach((endowment) => {
          _lookup[endowment.owner] = endowment.address;
        });
        return _lookup;
      },
    }),
    accounts: builder.query<Accounts, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: Result) => {
        const _accounts: Accounts = {};
        res.Items.forEach(
          ({ address, name, description, url, icon, iconLight = false }) => {
            _accounts[address] = {
              name,
              description,
              url,
              icon,
              iconLight,
            };
          }
        );
        return _accounts;
      },
    }),
    endowments: builder.query<Endowment[], boolean>({
      //TODO:refactor this query pattern - how?
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: Result) => {
        return res.Items;
      },
    }),
  }),
});

export const { useLookupQuery, useAccountsQuery, useEndowmentsQuery } =
  endowmentAPI;
