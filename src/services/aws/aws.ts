import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  ADR36Payload,
  EndowmentBase,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

const getWalletProfileQuery = (walletAddr: string) =>
  `/v1/profile/${network}/user/${walletAddr}`;

const PROFILE_QUERY = `/v1/profile/${network}/endowment`;

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
    prepareHeaders(headers) {
      // As 'prepareHeaders' is called after builder.query returns the request to be sent,
      // this check allows for custom 'authorization' headers to be set within the builder.query
      if (!headers.has("authorization")) {
        headers.append("authorization", createAuthToken("charity-owner"));
      }
      return headers;
    },
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 1 }
);

export const aws = createApi({
  tagTypes: ["airdrop", "admin", "walletProfile", "profile", "endowments"],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowments: builder.query<
      PaginatedAWSQueryRes<EndowmentBase[]>,
      EndowmentsQueryParams
    >({
      providesTags: [{ type: "endowments" }],
      query: (params) => {
        return { url: `/v3/endowments/${network}`, params };
      },
    }),
    walletProfile: builder.query<WalletProfile, string>({
      providesTags: [{ type: "walletProfile" }],
      query: getWalletProfileQuery,
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string; endowId: number }
    >({
      invalidatesTags: [{ type: "walletProfile" }],
      query: ({ endowId, type, wallet }) => {
        return {
          url: `${getWalletProfileQuery(wallet)}/bookmarks`,
          method: type === "add" ? "POST" : "DELETE",
          body: { id: endowId },
          headers: { authorization: createAuthToken("app-user") },
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    profile: builder.query<EndowmentBase, number>({
      providesTags: [{ type: "profile" }],
      query: (endowId) => `${PROFILE_QUERY}/${endowId}`,
    }),
    editProfile: builder.mutation<EndowmentBase, ADR36Payload>({
      invalidatesTags: ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: PROFILE_QUERY,
          method: "PUT",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useWalletProfileQuery,
  useToggleBookmarkMutation,
  useEndowmentsQuery,
  useProfileQuery,
  useEditProfileMutation,

  endpoints: {
    endowments: { useLazyQuery: useLazyEndowmentsQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;
