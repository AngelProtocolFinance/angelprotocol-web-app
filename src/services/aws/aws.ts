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
      query: (paramsObj) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

        const selectedSDGs = Object.entries(paramsObj.sdgGroups).flatMap(
          ([, members]) => members
        );

        const params: EndowmentsQueryParams = {
          query: paramsObj.query || "matchall",
          sort: paramsObj.sort
            ? `${paramsObj.sort.key}+${paramsObj.sort.direction}`
            : "default",
          endow_types: paramsObj.endow_types.join(",") || undefined,
          tiers: paramsObj.tiers.join(",") || undefined,
          sdgs: selectedSDGs.join(",") || undefined,
          kyc_only: paramsObj.kyc_only.join(",") || undefined,
        };

        return { url: `/v2/endowments/${network}`, params };
      },
    }),

    bookmarks: builder.query<EndowmentBookmark[], string>({
      providesTags: [{ type: awsTags.bookmarks }],
      query: (walletAddr) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
        return `/v1/bookmarks/${walletAddr}/${network}`;
      },
      transformResponse(res: UserBookMarkInfo) {
        return res.endowments;
      },
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string } & EndowmentBookmark
    >({
      invalidatesTags: [{ type: awsTags.bookmarks }],
      query: ({ type, ...payload }) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
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
  useBookmarksQuery,
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
