import { contracts } from "@giving/constants/contracts";
import { Args, Res, Result } from "../queryContract/types";
import { junoApi } from "..";
import { genQueryPath } from "../queryContract/genQueryPath";

export const lp_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    pairSimul: builder.query<Result<"lpSimul">, Args<"lpSimul">>({
      query: (args) =>
        genQueryPath("lpSimul", args, contracts.loop_haloust_pair),
      transformResponse: (res: Res<"lpSimul">) => {
        return res.data;
      },
    }),
  }),
});

export const { usePairSimulQuery } = lp_api;
