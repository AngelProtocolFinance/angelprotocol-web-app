import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  Profile,
  ProfileUpdatePayload,
  VersionSpecificWalletProfile,
  isDeleteMsg,
} from "../types";
import {
  EndowListPaginatedAWSQueryRes,
  EndowmentCard,
  EndowmentOption,
  EndowmentProfile,
  EndowmentProfileUpdate,
  EndowmentsQueryParams,
  NewAST,
  Program,
  TStrategy,
  WalletProfile,
} from "types/aws";
import { network } from "services/constants";
import { createAuthToken } from "helpers";
import { chainIds } from "constants/chainIds";
import { IS_AST } from "constants/env";
import { APIs } from "constants/urls";
import { version as v } from "../helpers";

const getWalletProfileQuery = (walletAddr: string) =>
  `/${v(2)}/profile/${network}/user/${walletAddr}`;

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
    "program",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowmentCards: builder.query<
      EndowListPaginatedAWSQueryRes<EndowmentCard[]>,
      EndowmentsQueryParams
    >({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/${v(5)}/endowments/${network}`,
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
    endowmentOptions: builder.query<EndowmentOption[], EndowmentsQueryParams>({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/${v(5)}/endowments/${network}`,
          params: { ...params, return: ENDOW_ID_NAME_FIELDS },
        };
      },
      transformResponse(res: EndowListPaginatedAWSQueryRes<EndowmentOption[]>) {
        return res.Items;
      },
    }),
    walletProfile: builder.query<VersionSpecificWalletProfile, string>({
      providesTags: ["walletProfile"],
      query: getWalletProfileQuery,
      transformResponse(res: WalletProfile, meta, walletAddr) {
        return {
          ...res,
          version: walletAddr.startsWith("juno") ? "legacy" : "latest",
        };
      },
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
    profile: builder.query<Profile, { endowId: number; isLegacy?: boolean }>({
      providesTags: ["profile"],
      query: ({ endowId, isLegacy = false }) => ({
        params: { legacy: isLegacy },
        url: IS_AST
          ? `/${v(1)}/ast/${chainIds.polygon}/${endowId}`
          : `/${v(2)}/profile/${network}/endowment/${endowId}`,
      }),
      transformResponse(r: EndowmentProfile) {
        //transform cloudsearch placeholders
        const tagline = r.tagline === " " ? "" : r.tagline;
        return {
          ...r,
          tagline,
          type: IS_AST ? "ast" : "charity",
        } as Profile;
      },
    }),
    program: builder.query<Program, { endowId: number; programId: string }>({
      providesTags: ["profile", "program"],
      query: ({ endowId, programId }) =>
        `/${v(1)}/profile/${network}/program/${endowId}/${programId}`,
    }),
    editProfile: builder.mutation<EndowmentProfile, ProfileUpdatePayload>({
      invalidatesTags: (result, error) =>
        error ? [] : ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: `/${v(3)}/profile/${network}/endowment`,
          method: isDeleteMsg(payload.unsignedMsg) ? "DELETE" : "PUT",
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
          url: `/${v(1)}/ast`,
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
  useEndowmentOptionsQuery,
  useProfileQuery,
  useProgramQuery,
  useEditProfileMutation,

  endpoints: {
    endowmentCards: { useLazyQuery: useLazyEndowmentCardsQuery },
    endowmentOptions: { useLazyQuery: useLazyEndowmentOptionsQuery },
    profile: { useLazyQuery: useLazyProfileQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

type EndowCardFields = keyof (Omit<EndowmentCard, "hq"> &
  /** replace with cloudsearch specific field format */
  Pick<EndowmentProfileUpdate, "hq_country">);

//object format first to avoid duplicates
const endowCardObj: {
  [key in EndowCardFields]: any; //we care only for keys
} = {
  hq_country: "",
  endow_designation: "",
  active_in_countries: "",
  sdgs: "",
  id: "",
  logo: "",
  kyc_donors_only: "",
  contributor_verification_required: "",
  name: "",
  tagline: "",
  endow_type: "",
  published: false,
  program: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const ENDOW_ID_NAME_OBJ: {
  [key in Extract<EndowCardFields, "id" | "name">]: any;
} = {
  id: "",
  name: "",
};
const ENDOW_ID_NAME_FIELDS = Object.keys(ENDOW_ID_NAME_OBJ).join(",");
