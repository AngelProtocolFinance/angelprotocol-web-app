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
        return res.data.endowments.reduce((result, entry) => {
          const { categories, tier } = entry;
          //TODO: this structure allows endowment to be listed in only 1 sdg row
          const sdgNum = categories.sdgs[0] || 0;
          if (tier === "Level1") {
            return result;
          } else {
            result[sdgNum] ||= [];
            result[sdgNum].push(entry);
            return result;
          }
        }, {} as CategorizedEndowments);
      },
    }),
    endowmentProfile: builder.query<Result<"accProfile">, Args<"accProfile">>({
      providesTags: [{ type: junoTags.account, id: accountTags.profile }],
      query: (args) => genQueryPath("accProfile", args, accounts),
      transformResponse: (res: Res<"accProfile">) => {
        return res.data;
      },
    }),
    balance: builder.query<Result<"accBalance">, Args<"accBalance">>({
      providesTags: [{ type: junoTags.account, id: accountTags.balance }],
      query: (args) => genQueryPath("accBalance", args, accounts),
      transformResponse: (res: Res<"accBalance">) => {
        return res.data;
      },
    }),
    endowment: builder.query<Result<"accEndowment">, Args<"accEndowment">>({
      providesTags: [{ type: junoTags.account, id: accountTags.balance }],
      query: (args) => genQueryPath("accEndowment", args, accounts),
      transformResponse: (res: Res<"accEndowment">) => {
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
  useEndowmentQuery,
} = account_api;
