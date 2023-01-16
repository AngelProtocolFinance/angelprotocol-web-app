import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Keplr } from "@keplr-wallet/types";
import {
  EndowmentCard,
  EndowmentProfile,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

type StdSignature = Awaited<ReturnType<Keplr["signArbitrary"]>>;
const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

const getProfileQuery = (endowId: number) =>
  `/v1/profile/${network}/endowment/${endowId}`;

const getWalletProfileQuery = (walletAddr: string) =>
  `/v1/profile/${network}/user/${walletAddr}`;

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
      PaginatedAWSQueryRes<EndowmentCard[]>,
      EndowmentsQueryParams
    >({
      providesTags: [{ type: "endowments" }],
      query: (params) => {
        return { url: `/v2/endowments/${network}`, params };
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
    profile: builder.query<EndowmentProfile, number>({
      providesTags: [{ type: "profile" }],
      query: (endowId) => getProfileQuery(endowId),
    }),
    updateProfile: builder.mutation<
      EndowmentProfile,
      { data: string; signature: StdSignature; signer: string }
    >({
      invalidatesTags: ["profile", "endowments"],
      query: ({ data, signature, signer }) => ({
        url: `v1/profile/${network}/endowment`,
        method: "PUT",
        body: {
          msg: [
            {
              type: "sign/MsgSignData",
              value: { signer, data },
            },
          ],
          fee: { gas: "0", amount: [] },
          memo: "",
          signatures: [
            {
              pub_key: {
                type: signature.pub_key.type,
                value: signature.pub_key.value,
              },
              signature: signature.signature,
            },
          ],
        },
      }),
    }),
  }),
});

export const {
  useWalletProfileQuery,
  useToggleBookmarkMutation,
  useEndowmentsQuery,
  useProfileQuery,
  useUpdateProfileMutation,

  endpoints: {
    endowments: { useLazyQuery: useLazyEndowmentsQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;
