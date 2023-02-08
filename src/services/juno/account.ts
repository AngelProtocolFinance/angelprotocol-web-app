import { Args, Res, Result } from "./queryContract/types";
import { EndowmentAssets } from "services/types";
import { AccountType, EndowmentEntry } from "types/contracts";
import { accountTags } from "services/juno/tags";
import { condenseToNum } from "helpers";
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
    balance: builder.query<Result<"accBalance">, Args<"accBalance">>({
      providesTags: [{ type: "account", id: accountTags.balance }],
      query: (args) => genQueryPath("accBalance", args, accounts),
      transformResponse: (res: Res<"accBalance">) => {
        return res.data;
      },
    }),
    assets: builder.query<
      EndowmentAssets,
      Args<"accBalance"> & { type: AccountType }
    >({
      providesTags: [{ type: "account", id: accountTags.balance }],
      query: ({ type, ...args }) => genQueryPath("accBalance", args, accounts),
      transformResponse: (res: Res<"accBalance">, meta, { type }) => {
        const { tokens_on_hand, invested_liquid, invested_locked } = res.data;

        //coin is ujunox (testnet) || uusdc (mainnet)
        const coin = tokens_on_hand[type].native[0] || {
          amount: "0",
          denom: "",
        };

        const investments =
          type === "liquid" ? invested_liquid : invested_locked;

        const invested = condenseToNum(
          investments.reduce((sum, [_, balance]) => +balance + sum, 0)
        );
        const free = condenseToNum(coin.amount);
        const total = free + invested;

        return { free, invested, total };
      },
    }),
  }),
});

export const { useBalanceQuery, useEndowmentsQuery, useAssetsQuery } =
  account_api;

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
