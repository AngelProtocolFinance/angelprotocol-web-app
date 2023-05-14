import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Profile } from "../types";
import {
  EndowmentCard,
  EndowmentProfile,
  EndowmentProfileUpdate,
  EndowmentsQueryParams,
  NewAST,
  PaginatedAWSQueryRes,
  TStrategy,
  WalletProfile,
} from "types/aws";
import { NetworkType } from "types/lists";
import { SemiPartial } from "types/utils";
import { createAuthToken } from "helpers";
import { chainIds } from "constants/chainIds";
import { IS_AST, IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

const getWalletProfileQuery = (walletAddr: string) =>
  `/v2/profile/${network}/user/${walletAddr}`;

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
  tagTypes: [
    "airdrop",
    "admin",
    "walletProfile",
    "profile",
    "endowments",
    "strategy",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowmentCards: builder.query<
      PaginatedAWSQueryRes<EndowmentCard[]>,
      EndowmentsQueryParams
    >({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/v4/endowments/${network}`,
          params: { ...params, return: endowCardFields },
        };
      },
    }),
    strategyCards: builder.query<TStrategy[], {}>({
      providesTags: ["strategy"],
      query: (params) => {
        return {
          url: `/v1/strategy/list`,
          params: { ...params },
        };
      },
    }),
    endowmentIdNames: builder.query<
      PaginatedAWSQueryRes<Pick<EndowmentCard, "id" | "name">[]>,
      EndowmentsQueryParams
    >({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/v4/endowments/${network}`,
          params: { ...params, return: ENDOW_ID_NAME_FIELDS },
        };
      },
    }),
    walletProfile: builder.query<WalletProfile, string>({
      providesTags: ["walletProfile"],
      query: getWalletProfileQuery,
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string; endowId: number }
    >({
      invalidatesTags: ["walletProfile"],
      query: ({ endowId, type, wallet }) => {
        return {
          url: `${getWalletProfileQuery(wallet)}/bookmarks`,
          method: type === "add" ? "POST" : "DELETE",
          body: { endowId },
          headers: { authorization: createAuthToken("app-user") },
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    profile: builder.query<Profile, number>({
      providesTags: ["profile"],
      query: (endowId) =>
        IS_AST
          ? `/v1/ast/${chainIds.polygon}/${endowId}`
          : `/v2/profile/${network}/endowment/${endowId}`,
      transformResponse(r: EndowmentProfile) {
        //transform cloudsearch placeholders
        const tagline = r.tagline === " " ? "" : r.tagline;
        return {
          ...r,
          tagline,
          type: IS_AST ? "ast" : "endowment",
        };
      },
    }),
    editProfile: builder.mutation<
      EndowmentProfile,
      {
        unsignedMsg: SemiPartial<EndowmentProfileUpdate, "id" | "owner">;
        rawSignature: string;
      }
    >({
      invalidatesTags: (result, error) =>
        error ? [] : ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: `/v2/profile/${network}/endowment`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    saveAST: builder.mutation<unknown, NewAST>({
      invalidatesTags: (result, error) =>
        error ? [] : ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        const token = createAuthToken("app-user");
        return {
          url: `/v1/ast`,
          method: "POST",
          body: payload,
          headers: { authorization: token },
        };
      },
    }),
  }),
});

export const {
  useWalletProfileQuery,
  useToggleBookmarkMutation,
  useSaveASTMutation,
  useEndowmentCardsQuery,
  useStrategyCardsQuery,
  useEndowmentIdNamesQuery,
  useProfileQuery,
  useEditProfileMutation,

  endpoints: {
    endowmentCards: { useLazyQuery: useLazyEndowmentCardsQuery },
    endowmentIdNames: { useLazyQuery: useLazyEndowmentIdNamesQuery },
    profile: { useLazyQuery: useLazyProfileQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

type EndowCardFields = keyof (Omit<EndowmentCard, "hq" | "categories"> &
  /** replace with cloudsearch specific field format */
  Pick<EndowmentProfileUpdate, "hq_country" | "categories_sdgs">);

//object format first to avoid duplicates
const endowCardObj: {
  [key in EndowCardFields]: any; //we care only for keys
} = {
  hq_country: "",
  endow_designation: "",
  active_in_countries: "",
  categories_sdgs: "",
  id: "",
  image: "",
  kyc_donors_only: "",
  contributor_verification_required: "",
  name: "",
  tagline: "",
  endow_type: "",
  published: false,
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const ENDOW_ID_NAME_OBJ: {
  [key in Extract<EndowCardFields, "id" | "name">]: any;
} = {
  id: "",
  name: "",
};
const ENDOW_ID_NAME_FIELDS = Object.keys(ENDOW_ID_NAME_OBJ).join(",");
