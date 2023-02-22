import { Args, Res, Result } from "./queryContract/types";
import { EndowmentAsset } from "services/types";
import { AccountType, EndowmentEntry } from "types/contracts";
import { accountTags } from "services/juno/tags";
import { condenseToNum } from "helpers";
import { contracts } from "constants/contracts";
import { IS_TEST } from "constants/env";
import { denoms, symbols } from "constants/tokens";
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
    asset: builder.query<
      EndowmentAsset,
      Args<"accState"> & { type: AccountType }
    >({
      providesTags: [{ type: "account", id: accountTags.state }],
      query: ({ type, ...args }) => genQueryPath("accState", args, accounts),
      transformResponse: (res: Res<"accState">, meta, { type }) => {
        const { tokens_on_hand } = res.data;

        const denom = IS_TEST ? denoms.ujunox : denoms.axlusdc;
        const coin = tokens_on_hand[type].native.find(
          (t) => t.denom === denom
        ) || { denom, amount: "0" };

        const free = condenseToNum(coin.amount);
        const total = free + 0;

        return { free, invested: 0, total, symbol: symbols[denom] };
      },
    }),
  }),
});

export const { useStateQuery, useEndowmentsQuery, useAssetQuery } = account_api;

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
