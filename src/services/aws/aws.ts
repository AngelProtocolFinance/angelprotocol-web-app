import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { EndowmentInfo } from "services/types";
import {
  Endowment,
  EndowmentBookmark,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { ProfileResponse } from "types/contracts";
import { NetworkType } from "types/lists";
import { queryContract } from "services/juno/queryContract";
import { createAuthToken } from "helpers";
import { contracts } from "constants/contracts";
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
  tagTypes: ["airdrop", "admin", "walletProfile", "profile", "endowments"],
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
    walletProfile: builder.query<WalletProfile, string>({
      providesTags: [{ type: "walletProfile" }],
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
    profile: builder.query<ProfileResponse, number>({
      providesTags: [{ type: "profile" }],
      query: (endowId) => getProfileQuery(endowId),
    }),
    endowInfo: builder.query<EndowmentInfo, number>({
      providesTags: [{ type: "endowments" }, { type: "profile" }],
      async queryFn(endowId, _api, _opts, baseQuery) {
        const [{ data: profile }, endow] = await Promise.all([
          baseQuery(getProfileQuery(endowId)),
          queryContract("accEndowment", contracts.accounts, { id: endowId }),
        ]);

        return {
          data: { ...(profile as ProfileResponse), ...endow, id: endowId },
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
  useEndowInfoQuery,

  endpoints: {
    endowments: { useLazyQuery: useLazyEndowmentsQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

const getProfileQuery = (endowId: number) =>
  `/v1/profile/${network}/endowment/${endowId}`;
