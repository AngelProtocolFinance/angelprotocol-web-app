import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  Endowment,
  EndowmentBookmark,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

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
  tagTypes: ["airdrop", "admin", "bookmarks", "profile", "endowments"],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowments: builder.query<
      PaginatedAWSQueryRes<Endowment[]>,
      EndowmentsQueryParams
    >({
      providesTags: [{ type: "endowments" }],
      query: (params) => {
        return { url: `/v2/endowments/${network}`, params };
      },
    }),
    bookmarks: builder.query<WalletProfile, string>({
      providesTags: [{ type: "bookmarks" }],
      query: (walletAddr) => `/v1/bookmarks/${walletAddr}/${network}`,
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string } & EndowmentBookmark
    >({
      invalidatesTags: [{ type: "profile" }],
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
