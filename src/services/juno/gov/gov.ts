import { Args, Res, Result } from "../queryContract/types";
import { govTags, junoTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from "..";
import { genQueryPath } from "../queryContract/genQueryPath";

const gov = contracts.gov;
export const gov_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    govPolls: builder.query<Result<"govPolls">, Args<"govPolls">>({
      providesTags: [{ type: junoTags.gov, id: govTags.polls }],
      query: (args) => genQueryPath("govPolls", args, gov),
      transformResponse: (res: Res<"govPolls">) => {
        return res.data.polls;
      },
    }),

    govState: builder.query<Result<"govState">, Args<"govState">>({
      providesTags: [{ type: junoTags.gov, id: govTags.state }],
      query: (args) => genQueryPath("govPolls", args, gov),
      transformResponse: (res: Res<"govState">) => {
        return res.data;
      },
    }),
    govStaker: builder.query<Result<"govStaker">, Args<"govStaker">>({
      providesTags: [{ type: junoTags.gov, id: govTags.staker }],
      query: (args) => genQueryPath("govStaker", args, gov),
      transformResponse: (res: Res<"govStaker">) => {
        return res.data;
      },
    }),
    govConfig: builder.query<Result<"govConfig">, Args<"govConfig">>({
      providesTags: [{ type: junoTags.gov, id: govTags.config }],
      query: (args) => genQueryPath("govConfig", args, gov),
      transformResponse: (res: Res<"govConfig">) => {
        return res.data;
      },
    }),
  }),
});

export const { useGovStakerQuery, useGovPollsQuery } = gov_api;
export const {
  govStaker: { useQueryState: useGovStakerState },
} = gov_api.endpoints;
