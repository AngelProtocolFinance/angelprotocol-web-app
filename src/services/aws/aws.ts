import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { apiEnv } from "services/constants";
import type { RootState } from "store/store";
import { userIsSignedIn } from "types/auth";
import type {
  Application,
  ApplicationDetails,
  ApplicationVerdict,
  ApplicationsQueryParams,
  DonationRecord,
  DonationsQueryParams,
  EndowListPaginatedAWSQueryRes,
  Endowment,
  EndowmentCard,
  EndowmentOption,
  EndowmentsQueryParams,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { version as v } from "../helpers";
import type {
  EndowmentUpdate,
  IdOrSlug,
  VersionSpecificWalletProfile,
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
    "endowment",
    "endowments",
    "strategy",
    "programs",
    "program",
    "applications",
    "application",
    "banking-applications",
    "banking-application",
    "registration",
    "users",
    "donations",
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
          url: "algolia-endowments",
          params: {
            ...params,
            fields: endowCardFields,
            env: apiEnv,
          },
        };
      },
    }),
    endowmentOptions: builder.query<EndowmentOption[], EndowmentsQueryParams>({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: "algolia-endowments",
          params: { ...params, fields: endowSelectorOptionFields, env: apiEnv },
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
      IdOrSlug & { fields?: (keyof Endowment)[] }
    >({
      providesTags: ["endowment"],
      query: ({ fields, ...args }) => ({
        url: "id" in args ? `v8/endowments/${args.id}` : "v8/endowments",
        params: {
          env: apiEnv,
          slug: args.slug,
          ...(fields ? { fields: fields.join(",") } : {}),
        },
      }),
    }),
    endowWithEin: builder.query<
      Pick<Endowment, "id" | "name" | "claimed" | "registration_number">,
      string
    >({
      query: (ein) => ({ url: "v8/endowments", params: { ein, env: apiEnv } }),
    }),

    editEndowment: builder.mutation<Endowment, EndowmentUpdate>({
      invalidatesTags: (_, error) =>
        error ? [] : ["endowments", "endowment", "walletProfile"],
      query: ({ id, ...payload }) => {
        return {
          url: `/${v(7)}/endowments/${id}`,
          method: "PATCH",
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
          url: `${v(3)}/applications`,
          method: "PUT",
          headers: { authorization: TEMP_JWT },
          body: verdict,
        };
      },
    }),
    donations: builder.query<
      { Items: DonationRecord[]; nextPage?: number },
      DonationsQueryParams
    >({
      providesTags: ["donations"],
      query: (params) => {
        return {
          url: `${v(1)}/donations`,
          params,
          headers: { authorization: TEMP_JWT },
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
  useEditEndowmentMutation,
  useApplicationsQuery,
  useApplicationQuery,
  useReviewApplicationMutation,
  useDonationsQuery,
  useLazyDonationsQuery,
  useLazyEndowWithEinQuery,
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
  kyc_donors_only: "",
  name: "",
  tagline: "",
  claimed: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const endowSelectorOptionObj: {
  [key in keyof Required<EndowmentOption>]: "";
} = {
  id: "",
  name: "",
  hide_bg_tip: "",
};
const endowSelectorOptionFields = Object.keys(endowSelectorOptionObj).join(",");
