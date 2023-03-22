import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  ADR36Payload,
  Endowment,
  EndowmentCloudSearchFields,
  EndowmentsQueryParams,
  NewAIF,
  PaginatedAWSQueryRes,
  WalletProfile,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken } from "helpers";
import { cleanObject } from "helpers/cleanObject";
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
    endowments: builder.query<
      PaginatedAWSQueryRes<Partial<Endowment>[]>,
      EndowmentsQueryParams<Partial<Endowment>>
    >({
      providesTags: ["endowments"],
      query: ({ templateResult, ...params }) => {
        const returnParam = createReturnParam(templateResult);
        return {
          url: `/v3/endowments/${network}`,
          params: {
            ...params,
            return: returnParam,
          },
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
    profile: builder.query<Endowment, number>({
      providesTags: ["profile"],
      query: (endowId) => `/v1/profile/${network}/endowment/${endowId}`,
      transformResponse({ tagline, ...rest }: Endowment) {
        //transform cloudsearch placeholders
        return {
          tagline: tagline === " " ? "" : tagline,
          ...rest,
        };
      },
    }),
    editProfile: builder.mutation<Endowment, ADR36Payload>({
      invalidatesTags: ["endowments", "profile", "walletProfile"],
      query: (payload) => {
        return {
          url: `/v1/profile/${network}/endowment`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    saveAIF: builder.mutation<unknown, NewAIF>({
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
  useSaveAIFMutation,
  useProfileQuery,
  useEditProfileMutation,

  endpoints: {
    profile: { useLazyQuery: useLazyProfileQuery },
  },
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;

export const useEndowmentsQuery = <T extends Partial<Endowment>>(
  qParams: EndowmentsQueryParams<T>
) => {
  const result = aws.endpoints.endowments.useQuery(qParams);
  return {
    ...result,
    data: result.data as PaginatedAWSQueryRes<T[]>,
    originalArgs: result.originalArgs as EndowmentsQueryParams<T>,
  };
};

export const useLazyEndowmentsQuery = () => {
  const [fetch, ...rest] = aws.endpoints.endowments.useLazyQuery();
  const func = <T extends Partial<Endowment>>(
    params: EndowmentsQueryParams<T>
  ) =>
    fetch(params).then((res) => ({
      ...res,
      data: res.data as PaginatedAWSQueryRes<T[]>,
    }));
  return [func, ...rest] as [typeof func, ...typeof rest];
};

function createReturnParam(templateResult: Partial<Endowment>): string {
  const cloudSearchFields: EndowmentCloudSearchFields = {
    active_in_countries: templateResult.active_in_countries,
    categories_sdgs: templateResult.categories?.sdgs,
    endow_type: templateResult.endow_type,
    hq_country: templateResult.hq_country,
    id: templateResult.id,
    image: templateResult.image,
    kyc_donors_only: templateResult.kyc_donors_only,
    logo: templateResult.logo,
    name: templateResult.name,
    on_hand_liq: templateResult.on_hand_liq,
    on_hand_lock: templateResult.on_hand_lock,
    on_hand_overall: templateResult.on_hand_overall,
    overall: templateResult.overall,
    overview: templateResult.overview,
    registration_number: templateResult.registration_number,
    social_media_url_discord: templateResult.social_media_urls?.discord,
    social_media_url_facebook: templateResult.social_media_urls?.facebook,
    social_media_url_instagram: templateResult.social_media_urls?.instagram,
    social_media_url_linkedin: templateResult.social_media_urls?.linkedin,
    social_media_url_tiktok: templateResult.social_media_urls?.tiktok,
    social_media_url_twitter: templateResult.social_media_urls?.twitter,
    social_media_url_youtube: templateResult.social_media_urls?.youtube,
    street_address: templateResult.street_address,
    tagline: templateResult.tagline,
    total_liq: templateResult.total_liq,
    total_lock: templateResult.total_lock,
    url: templateResult.url,
  };

  return Object.keys(cleanObject(cloudSearchFields)).join(",");
}
