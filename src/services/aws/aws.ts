import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { Auth } from "aws-amplify";
import {
  ProfileUpdatePayload,
  VersionSpecificWalletProfile,
  isDeleteMsg,
} from "../types";
import {
  ApplicationsQueryParams,
  DonationsQueryParams,
  EndowListPaginatedAWSQueryRes,
  EndowmentCard,
  EndowmentOption,
  EndowmentProfile,
  EndowmentProfileUpdate,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  Program,
  WalletProfile,
} from "types/aws";
import { network } from "services/constants";
import { createAuthToken } from "helpers";
import { APIs } from "constants/urls";
import { version as v } from "../helpers";

const getWalletProfileQuery = (walletAddr: string) =>
  `/${v(2)}/profile/${network}/user/${walletAddr}`;

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
    async prepareHeaders(headers) {
      // As 'prepareHeaders' is called after builder.query returns the request to be sent,
      // this check allows for custom 'authorization' headers to be set within the builder.query
      if (!headers.has("authorization")) {
        const token = await Auth.currentSession().then((res) =>
          res.getAccessToken().getJwtToken()
        );

        headers.append("authorization", `Bearer ${token}`);
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
    "applications",
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
    endowmentOptions: builder.query<EndowmentOption[], EndowmentsQueryParams>({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/${v(5)}/endowments/${network}`,
          params: { ...params, return: endowSelectorOptionFields },
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
    profile: builder.query<
      EndowmentProfile,
      { endowId: number; isLegacy?: boolean }
    >({
      providesTags: ["profile"],
      query: ({ endowId, isLegacy = false }) => ({
        params: { legacy: isLegacy },
        url: `/${v(2)}/profile/${network}/endowment/${endowId}`,
      }),
      transformResponse(r: EndowmentProfile) {
        //transform cloudsearch placeholders
        const tagline = r.tagline === " " ? "" : r.tagline;
        return {
          ...r,
          tagline,
        };
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
    applications: builder.query<
      PaginatedAWSQueryRes<any[]>,
      ApplicationsQueryParams
    >({
      providesTags: ["applications"],
      query: (params) => {
        return {
          url: `${v(1)}/applications`,
          params,
        };
      },
    }),
  }),
});

export const {
  useWalletProfileQuery,
  useToggleBookmarkMutation,
  useEndowmentCardsQuery,
  useEndowmentOptionsQuery,
  useProfileQuery,
  useProgramQuery,
  useEditProfileMutation,
  useApplicationsQuery,

  endpoints: {
    endowmentCards: { useLazyQuery: useLazyEndowmentCardsQuery },
    endowmentOptions: { useLazyQuery: useLazyEndowmentOptionsQuery },
    profile: { useLazyQuery: useLazyProfileQuery },
    applications: { useLazyQuery: useLazyApplicationsQuery },
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

const endowSelectorOptionObj: {
  [key in Extract<EndowCardFields, "id" | "name">]: any;
} = {
  id: "",
  name: "",
};
const endowSelectorOptionFields = Object.keys(endowSelectorOptionObj).join(",");
