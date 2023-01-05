import { Res, Result, WithAddrArgs } from "./queryContract/types";
import { govTags } from "services/juno/tags";
import { condenseToNum } from "helpers";
import { junoApi } from "./";
import { genQueryPath } from "./queryContract/genQueryPath";

export const cw20Api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    cw20Balance: builder.query<
      Result<"cw20Balance">,
      WithAddrArgs<"cw20Balance">
    >({
      providesTags: [{ type: "gov", id: govTags.halo_balance }],
      query: ({ contract, ...args }) =>
        genQueryPath("cw20Balance", args, contract),
      transformResponse: (res: Res<"cw20Balance">) => {
        return condenseToNum(res.data.balance);
      },
    }),
    cw20Info: builder.query<Result<"cw20Info">, WithAddrArgs<"cw20Info">>({
      providesTags: [{ type: "gov", id: govTags.halo_info }],
      query: (contract) => genQueryPath("cw20Info", null, contract),
      transformResponse: (res: Res<"cw20Info">) => {
        return res.data;
      },
    }),
  }),
});

export const { useCw20BalanceQuery } = cw20Api;
