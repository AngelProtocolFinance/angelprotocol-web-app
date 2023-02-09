import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import {
  ADR36Payload,
  EndowmentCard,
  EndowmentProfile,
  EndowmentProfileUpdate,
  EndowmentsQueryData,
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
    endowmentCards: builder.query<
      PaginatedAWSQueryRes<EndowmentCard[]>,
      EndowmentsQueryData
    >({
      providesTags: ["endowments"],
      query: (params) => createEndowmentsQuery(params, endowCardFields),
    }),
    endowmentIdNames: builder.query<
      PaginatedAWSQueryRes<Pick<EndowmentCard, "id" | "name">[]>,
      EndowmentsQueryData
    >({
      providesTags: ["endowments"],
      query: (params) => createEndowmentsQuery(params, ENDOW_ID_NAME_FIELDS),
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
    profile: builder.query<EndowmentProfile, number>({
      providesTags: ["profile"],
      query: (endowId) => `/v1/profile/${network}/endowment/${endowId}`,
      transformResponse({ tagline, hq, ...rest }: EndowmentProfile) {
        //transform cloudsearch placeholders
        return {
          tagline: tagline === " " ? "" : tagline,
          hq: { ...hq, city: hq.city === "City" ? "" : hq.city },
          ...rest,
        };
      },
    }),
    editProfile: builder.mutation<EndowmentProfile, ADR36Payload>({
      invalidatesTags: ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: `/v1/profile/${network}/endowment`,
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
  useEndowmentCardsQuery,
  useEndowmentIdNamesQuery,
  useProfileQuery,
  useEditProfileMutation,

  endpoints: {
    endowmentCards: { useLazyQuery: useLazyEndowmentCardsQuery },
    endowmentIdNames: { useLazyQuery: useLazyEndowmentIdNamesQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

function createEndowmentsQuery(
  params: EndowmentsQueryData,
  returnFields: string | null
): string | FetchArgs {
  const urlParams = createEndowQueryParams(params, returnFields);

  return {
    url: `/v3/endowments/${network}`,
    params: { ...urlParams },
  };
}

function createEndowQueryParams(
  params: EndowmentsQueryData,
  returnFields: string | null
): EndowmentsQueryParams {
  return {
    query: params.query || "matchall",
    sort: params.sort
      ? `${params.sort.key}+${params.sort.direction}`
      : "default",
    endow_types: (params.endow_types || []).join(",") || null,
    tiers: (params.tiers || []).join(",") || null,
    sdgs: (params.sdgs || []).join(",") || 0,
    kyc_only: (params.kyc_only || []).join(",") || null,
    ...(params.endow_designations
      ? { endow_designation: params.endow_designations.join(",") }
      : {}),
    ...(params.hq_countries
      ? { hq_country: params.hq_countries.join(",") }
      : {}),
    ...(params.active_in_countries
      ? { active_in_countries: params.active_in_countries.join(",") }
      : {}),
    start: params.start || 0,
    return: returnFields,
  };
}

type EndowCardFields = keyof (Omit<EndowmentCard, "hq" | "categories"> &
  /** replace with cloudsearch specific field format */
  Pick<EndowmentProfileUpdate, "hq_city" | "hq_country" | "categories_sdgs">);
//object format first to avoid duplicates
const endowCardObj: {
  [key in EndowCardFields]: any; //we care only for keys
} = {
  hq_city: "",
  hq_country: "",
  active_in_countries: "",
  categories_sdgs: "",
  id: "",
  image: "",
  kyc_donors_only: "",
  name: "",
  tagline: "",
  endow_type: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const ENDOW_ID_NAME_OBJ: {
  [key in Extract<EndowCardFields, "id" | "name">]: any;
} = {
  id: "",
  name: "",
};
const ENDOW_ID_NAME_FIELDS = Object.keys(ENDOW_ID_NAME_OBJ).join(",");
