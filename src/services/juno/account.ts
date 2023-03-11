import { Args, Res, Result } from "./queryContract/types";
import { accountTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

const accounts = contracts.accounts;
export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    state: builder.query<Result<"accState">, Args<"accState">>({
      providesTags: [{ type: "account", id: accountTags.state }],
      query: (args) => genQueryPath("accState", args, accounts),
      transformResponse: (res: Res<"accState">) => {
        return res.data;
      },
    }),
  }),
});

export const { useStateQuery } = account_api;
