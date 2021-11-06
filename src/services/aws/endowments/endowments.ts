import { aws } from "../aws";
import { Result, Lookup, Accounts, Endowment } from "./types";

const endowments_api = aws.injectEndpoints({
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
  endowments_api;
