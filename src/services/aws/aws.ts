import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  Endowment,
  EndowmentBookmark,
  EndowmentsQueryParams,
  EndowmentsQueryRequest,
  PaginatedAWSQueryRes,
  UserBookMarkInfo,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { awsTags } from "./tags";

const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
    prepareHeaders(headers) {
      headers.append("authorization", createAuthToken("charity-owner"));
      return headers;
    },
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 1 }
);

export const aws = createApi({
  tagTypes: [awsTags.admin, awsTags.cha, awsTags.bookmarks, awsTags.endowments],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowments: builder.query<
      PaginatedAWSQueryRes<Endowment[]>,
      EndowmentsQueryRequest
    >({
      providesTags: [{ type: awsTags.endowments }],
      query: (request) => {
        const params: EndowmentsQueryParams = getParams(request);
        return { url: `/v2/endowments/${network}`, params };
      },
    }),
    profile: builder.query<UserBookMarkInfo, string>({
      providesTags: [{ type: awsTags.bookmarks }],
      query: (walletAddr) => `/v1/bookmarks/${walletAddr}/${network}`,
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string } & EndowmentBookmark
    >({
      invalidatesTags: [{ type: awsTags.bookmarks }],
      query: ({ type, ...payload }) => {
        return {
          url: "/v1/bookmarks",
          method: type === "add" ? "POST" : "DELETE",
          body: { ...payload, network },
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const {
  useProfileQuery,
  useToggleBookmarkMutation,
  useEndowmentsQuery,

  endpoints: {
    endowments: { useLazyQuery: useLazyEndowmentsQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

function getParams(paramsObj: EndowmentsQueryRequest): EndowmentsQueryParams {
  const selectedSDGs = Object.entries(paramsObj.sdgGroups).flatMap(
    ([, members]) => members
  );

  const params: EndowmentsQueryParams = {
    query: paramsObj.query || "matchall",
    sort: paramsObj.sort
      ? `${paramsObj.sort.key}+${paramsObj.sort.direction}`
      : "default",
    endow_types: paramsObj.endow_types.join(",") || null,
    tiers: paramsObj.tiers.join(",") || null,
    sdgs: selectedSDGs.join(",") || 0,
    kyc_only: paramsObj.kyc_only.join(",") || null,
    start: paramsObj.start || undefined,
  };

  return params;
}
