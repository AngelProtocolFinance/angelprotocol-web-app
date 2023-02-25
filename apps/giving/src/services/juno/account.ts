import { Args, Res, Result } from "./queryContract/types";
import { EndowmentEntry } from "@giving/types/contracts";
import { accountTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { genQueryPath } from "./queryContract/genQueryPath";

const accounts = contracts.accounts;
export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    //fetch endowments by batch to avoid hitting gas limits
    endowments: builder.query<EndowmentEntry[], unknown>({
      providesTags: [{ type: "account", id: accountTags.endowments }],
      async queryFn() {
        const endowments = await getEndowments(50, 0, []);
        return {
          data: endowments.filter(
            ({ endow_type, tier, status }) =>
              endow_type === "Charity" ||
              tier !== "Level1" ||
              status === "Approved"
          ),
        };
      },
    }),
    state: builder.query<Result<"accState">, Args<"accState">>({
      providesTags: [{ type: "account", id: accountTags.state }],
      query: (args) => genQueryPath("accState", args, accounts),
      transformResponse: (res: Res<"accState">) => {
        return res.data;
      },
    }),
  }),
});

export const { useStateQuery, useEndowmentsQuery } = account_api;

async function getEndowments(
  limit: 50,
  start_after: number,
  endowments: EndowmentEntry[]
): Promise<EndowmentEntry[]> {
  const endowmentRes = await queryContract("accEndowList", contracts.accounts, {
    limit,
    start_after,
  });
  const endows = endowmentRes.endowments;
  const numEndows = endows.length;
  if (numEndows < limit) {
    return endowments.concat(endows);
  } else {
    return getEndowments(limit, limit + start_after, endowments.concat(endows));
  }
}
