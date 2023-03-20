import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  ADR36Payload,
  EndowmentCard,
  EndowmentCloudSearchParams,
  EndowmentProfile,
  EndowmentsQueryParams,
  NewAIF,
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
    endowments: builder.query<
      PaginatedAWSQueryRes<Partial<EndowmentCard>[]>,
      EndowmentsQueryParams & { templateResult: Partial<EndowmentCard> }
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
    profile: builder.query<EndowmentProfile, number>({
      providesTags: ["profile"],
      query: (endowId) => `/v1/profile/${network}/endowment/${endowId}`,
      transformResponse({ tagline, ...rest }: EndowmentProfile) {
        //transform cloudsearch placeholders
        return {
          tagline: tagline === " " ? "" : tagline,
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

export const useEndowmentsQuery = <T extends Partial<EndowmentCard>>(
  qParams: EndowmentsQueryParams & { templateResult: T }
) => {
  const result = aws.endpoints.endowments.useQuery(qParams);
  return {
    ...result,
    data: result.data as PaginatedAWSQueryRes<T[]>,
    originalArgs: result.originalArgs as EndowmentsQueryParams & {
      templateResult: T;
    },
  };
};

export const useLazyEndowmentsQuery = () => {
  const [fetch, ...rest] = aws.endpoints.endowments.useLazyQuery();
  const func = <T extends Partial<EndowmentCard>>(
    params: EndowmentsQueryParams & { templateResult: T }
  ) =>
    fetch(params).then((res) => ({
      ...res,
      data: res.data as PaginatedAWSQueryRes<T[]>,
    }));
  return [func, ...rest] as [typeof func, ...typeof rest];
};

function createReturnParam(templateResult: Partial<EndowmentCard>): string {
  const { categories, ...okFields } = templateResult;

  const cloudSearchParams: EndowmentCloudSearchParams = {
    ...okFields,
  };

  if (!!categories) {
    // doesn't matter what the value is, it's only important to have a defined `categories_sdgs` key
    cloudSearchParams.categories_sdgs = categories.sdgs;
  }

  return Object.keys(cloudSearchParams).join(",");
}
