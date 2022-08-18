import { Args, Res, Result } from "./queryContract/types";
import { endowmentTags, junoTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

const accounts = contracts.accounts;
export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentProfile: builder.query<Result<"accProfile">, Args<"accProfile">>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: (args) => genQueryPath("accProfile", args, accounts),
      transformResponse: (res: Res<"accProfile">) => {
        return res.data;
      },
    }),
    balance: builder.query<Result<"accBalance">, Args<"accBalance">>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.balance }],
      query: (args) => genQueryPath("accBalance", args, accounts),
      transformResponse: (res: Res<"accBalance">) => {
        return res.data;
      },
    }),
  }),
});

export const { useEndowmentProfileQuery, useBalanceQuery } = account_api;
