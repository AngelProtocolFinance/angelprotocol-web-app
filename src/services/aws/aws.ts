import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { apiEnv } from "services/constants";
import { RootState } from "store/store";
import { userIsSignedIn } from "types/auth";
import {
  Application,
  ApplicationDetails,
  ApplicationVerdict,
  ApplicationsQueryParams,
  EndowListPaginatedAWSQueryRes,
  Endowment,
  EndowmentCard,
  EndowmentOption,
  EndowmentProfile,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  Program,
  WalletProfile,
} from "types/aws";
import { version as v } from "../helpers";
import {
  ProfileUpdateMsg,
  ProgramDeleteMsg,
  VersionSpecificWalletProfile,
  isDeleteMsg,
} from "../types";

const getWalletProfileQuery = (walletAddr: string) =>
  `/${v(2)}/profile/${apiEnv}/user/${walletAddr}`;

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
    prepareHeaders(headers, { getState }) {
      const {
        auth: { user },
      } = getState() as RootState;

      if (headers.get("authorization") === TEMP_JWT) {
        headers.set("authorization", userIsSignedIn(user) ? user.token : "");
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
    "application",
    "banking-applications",
    "banking-application",
    "users",
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
          url: `/${v(5)}/endowments/${apiEnv}`,
          params: { ...params, return: endowCardFields },
        };
      },
    }),
    endowmentOptions: builder.query<EndowmentOption[], EndowmentsQueryParams>({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `/${v(5)}/endowments/${apiEnv}`,
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
      transformResponse(res: WalletProfile, _meta, walletAddr) {
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
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    endowment: builder.query<
      Endowment,
      { id: number; fields?: (keyof Endowment)[] }
    >({
      providesTags: ["profile"],
      query: ({ id, fields }) => ({
        url: `v6/endowments/${id}`,
        params: {
          env: apiEnv,
          ...(fields ? { fields: fields.join(",") } : {}),
        },
      }),
    }),
    program: builder.query<Program, { endowId: number; programId: string }>({
      providesTags: ["profile", "program"],
      query: ({ endowId, programId }) =>
        `/${v(1)}/profile/${apiEnv}/program/${endowId}/${programId}`,
    }),
    editProfile: builder.mutation<
      EndowmentProfile,
      ProfileUpdateMsg | ProgramDeleteMsg
    >({
      invalidatesTags: (_, error) =>
        error ? [] : ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: `/${v(1)}/profile/endowment`,
          method: isDeleteMsg(payload) ? "DELETE" : "PUT",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    applications: builder.query<
      PaginatedAWSQueryRes<Application[]>,
      ApplicationsQueryParams
    >({
      providesTags: ["applications"],
      query: (params) => {
        return {
          url: `${v(1)}/applications`,
          params,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    application: builder.query<ApplicationDetails, string>({
      providesTags: ["application"],
      query: (uuid) => ({
        url: `${v(1)}/applications`,
        params: { uuid },
        headers: { authorization: TEMP_JWT },
      }),
    }),
    reviewApplication: builder.mutation<any, ApplicationVerdict>({
      invalidatesTags: ["application", "applications"],
      query: (verdict) => {
        return {
          url: `${v(2)}/applications`,
          method: "PUT",
          headers: { authorization: TEMP_JWT },
          body: verdict,
        };
      },
    }),
  }),
});

export const {
  useWalletProfileQuery,
  useToggleBookmarkMutation,
  useEndowmentQuery,
  useEndowmentCardsQuery,
  useEndowmentOptionsQuery,
  useProgramQuery,
  useEditProfileMutation,
  useApplicationsQuery,
  useApplicationQuery,
  useReviewApplicationMutation,

  endpoints: {
    endowmentCards: { useLazyQuery: useLazyEndowmentCardsQuery },
    endowmentOptions: { useLazyQuery: useLazyEndowmentOptionsQuery },
    endowment: { useLazyQuery: useLazyProfileQuery },
    applications: { useLazyQuery: useLazyApplicationsQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

//object format first to avoid duplicates
const endowCardObj: {
  [key in keyof EndowmentCard]: ""; //we care only for keys
} = {
  hq_country: "",
  endow_designation: "",
  active_in_countries: "",
  sdgs: "",
  id: "",
  card_img: "",
  logo: "",
  kyc_donors_only: "",
  name: "",
  tagline: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const endowSelectorOptionObj: {
  [key in keyof EndowmentOption]: "";
} = {
  id: "",
  name: "",
};
const endowSelectorOptionFields = Object.keys(endowSelectorOptionObj).join(",");
