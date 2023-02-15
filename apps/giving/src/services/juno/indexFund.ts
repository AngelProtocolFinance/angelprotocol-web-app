import { Args, Res, Result } from "./queryContract/types";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";
import { indexfundTags } from "./tags";

const indexFund = contracts.index_fund;
export const indexFund_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    fundList: builder.query<Result<"ifFunds">, Args<"ifFunds">>({
      providesTags: [{ type: "gov", id: indexfundTags.fund_list }],
      query: (args) => genQueryPath("ifFunds", args, indexFund),
      transformResponse: (res: Res<"ifFunds">) => {
        return res.data.funds;
      },
    }),
    allianceMembers: builder.query<Result<"ifAlliance">, Args<"ifAlliance">>({
      providesTags: [{ type: "gov", id: indexfundTags.alliance_members }],
      query: (args) => genQueryPath("ifAlliance", args, indexFund),
      transformResponse: (res: Res<"ifAlliance">) => {
        return res.data.alliance_members;
      },
    }),
    indexFundConfig: builder.query<Result<"ifConfig">, Args<"ifConfig">>({
      providesTags: [{ type: "gov", id: indexfundTags.config }],
      query: (args) => genQueryPath("ifConfig", args, indexFund),
      transformResponse: (res: Res<"ifConfig">) => {
        return res.data;
      },
    }),
  }),
});

export const {
  useFundListQuery,
  useAllianceMembersQuery,
  useIndexFundConfigQuery,
} = indexFund_api;
