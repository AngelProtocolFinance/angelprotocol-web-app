import { Res, Result, WithAddrArgs } from "./queryContract/types";
import { endowmentTags, junoTags } from "services/juno/tags";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentProfile: builder.query<
      Result<"accProfile">,
      WithAddrArgs<"accProfile">
    >({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.profile }],
      query: (contract) => genQueryPath("accProfile", null, contract),
      transformResponse: (res: Res<"accProfile">) => {
        return res.data;
      },
    }),
    balance: builder.query<Result<"accBalance">, WithAddrArgs<"accBalance">>({
      providesTags: [{ type: junoTags.endowment, id: endowmentTags.balance }],
      query: (contract) => genQueryPath("accBalance", null, contract),
      transformResponse: (res: Res<"accBalance">) => {
        return res.data;
      },
    }),
  }),
});

export const { useEndowmentProfileQuery, useBalanceQuery } = account_api;
