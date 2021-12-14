import { aws } from "../aws";
import { QueryRes, Lookup, Accounts, Endowment, Profile } from "./types";

const endowments_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    lookup: builder.query<Lookup, boolean>({
      query: (isTest) => `endowments${isTest ? "/testnet" : ""}`,
      transformResponse: (res: QueryRes<Endowment[]>) => {
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
      transformResponse: (res: QueryRes<Endowment[]>) => {
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
      transformResponse: (res: QueryRes<Endowment[]>) => {
        return res.Items;
      },
    }),
    profiles: builder.query<Profile[], undefined>({
      //TODO:refactor this query pattern - how?
      query: () => `endowments/profiles`,
      //transform response before saving to cache for easy lookup by component
      transformResponse: (res: QueryRes<Profile[]>) => {
        return res.Items;
      },
    }),
    singleProfile: builder.query<Profile, undefined>({
      query: (endowmentAddr) => `/endowments/profiles${endowmentAddr}`,
      transformResponse: (res: Profile) => {
        return res;
      },
    }),
  }),
});

export const {
  useLookupQuery,
  useAccountsQuery,
  useEndowmentsQuery,
  useProfilesQuery,
  useSingleProfileQuery,
} = endowments_api;
