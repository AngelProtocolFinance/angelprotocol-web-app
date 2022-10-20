import { Args, Res, Result } from "./queryContract/types";
import { EndowmentEntry } from "types/contracts";
import { accountTags, junoTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { queryContract } from "./queryContract";
import { genQueryPath } from "./queryContract/genQueryPath";

const accounts = contracts.accounts;
export const account_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    //fetch endowments by batch to avoid hitting gas limits
    endowments: builder.query<EndowmentEntry[], unknown>({
      providesTags: [{ type: junoTags.registrar, id: accountTags.endowments }],
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

    endowmentDetails: builder.query<
      Result<"accEndowment">,
      Args<"accEndowment">
    >({
      providesTags: [{ type: junoTags.account, id: accountTags.endowment }],
      query: (args) => genQueryPath("accEndowment", args, accounts),
      transformResponse: (res: Res<"accEndowment">) => {
        return res.data;
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
  }),
});

export const {
  useEndowmentDetailsQuery,
  useEndowmentProfileQuery,
  useBalanceQuery,
  useEndowmentsQuery,
} = account_api;

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
