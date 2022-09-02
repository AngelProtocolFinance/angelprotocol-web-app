import { Args, Res, Result } from "./queryContract/types";
import { CategorizedEndowments } from "types/contracts";
import { accountTags, junoTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

const accounts = contracts.accounts;
export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowments: builder.query<Result<"accEndowList">, Args<"accEndowList">>({
      providesTags: [{ type: junoTags.registrar, id: accountTags.endowments }],
      query: (args) => genQueryPath("accEndowList", args, accounts),
      transformResponse: (res: Res<"accEndowList">) => {
        return res.data.endowments;
      },
    }),
    categorizedEndowments: builder.query<
      Result<"accCategorizedEndows">,
      Args<"accCategorizedEndows">
    >({
      providesTags: [{ type: junoTags.registrar, id: accountTags.endowments }],
      query: (args) => genQueryPath("accCategorizedEndows", args, accounts),
      transformResponse: (res: Res<"accCategorizedEndows">) => {
        return res.data.endowments.reduce((result, profile) => {
          const { un_sdg, tier } = profile;
          if (un_sdg === undefined || tier === "Level1") {
            return result;
          } else {
            if (!result[un_sdg]) {
              result[un_sdg] = [];
            }
            result[un_sdg].push(profile);
            return result;
          }
        }, {} as CategorizedEndowments);
      },
    }),
    endowmentProfile: builder.query<Result<"accProfile">, Args<"accProfile">>({
      providesTags: [{ type: junoTags.endowment, id: accountTags.profile }],
      query: (args) => genQueryPath("accProfile", args, accounts),
      transformResponse: (res: Res<"accProfile">) => {
        return res.data;
      },
    }),
    balance: builder.query<Result<"accBalance">, Args<"accBalance">>({
      providesTags: [{ type: junoTags.endowment, id: accountTags.balance }],
      query: (args) => genQueryPath("accBalance", args, accounts),
      transformResponse: (res: Res<"accBalance">) => {
        return res.data;
      },
    }),
  }),
});

export const {
  useEndowmentProfileQuery,
  useBalanceQuery,
  useCategorizedEndowmentsQuery,
  useEndowmentsQuery,
} = account_api;
