import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  AWSQueryRes,
  Endowment,
  EndowmentBookmark,
  EndowmentsQueryParams,
  UserBookMarkInfo,
} from "types/aws";
import { NetworkType } from "types/lists";
import { createAuthToken, toBase64 } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";
import { awsTags } from "./tags";

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
  { maxRetries: 0 }
);

export const aws = createApi({
  tagTypes: [awsTags.admin, awsTags.cha, awsTags.bookmarks, awsTags.endowments],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowments: builder.query<AWSQueryRes<Endowment[]>, EndowmentsQueryParams>({
      providesTags: [{ type: awsTags.endowments }],
      query: (params) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
        return { url: `/v1/endowments/${network}`, params };
      },
      async onQueryStarted(
        arg,
        { queryFulfilled, getCacheEntry, updateCachedData }
      ) {
        const { originalArgs } = getCacheEntry();
        if (originalArgs) {
          const {
            key: origKey,
            prevKey: origPrevKey,
            ...prevParams
          } = originalArgs;
          const { key, prevKey, ...params } = arg;

          //append results into prev result obtained with the same params
          if (toBase64(prevParams) === toBase64(params)) {
            //since loading is only forwards, append prev cache entry whenever key changes
            if (prevKey !== key) {
              const { data } = await queryFulfilled;
              updateCachedData((cacheData) => {
                cacheData.Items.push(...data.Items);
                cacheData.LastEvaluatedKey = data.LastEvaluatedKey;
              });
            }
          }
        }
      },
    }),

    bookmarks: builder.query<EndowmentBookmark[], string>({
      providesTags: [{ type: awsTags.bookmarks }],
      query: (walletAddr) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
        return `/v1/bookmarks/${walletAddr}/${network}`;
      },
      transformResponse(res: UserBookMarkInfo) {
        return res.endowments;
      },
    }),
    toggleBookmark: builder.mutation<
      unknown,
      { type: "add" | "delete"; wallet: string } & EndowmentBookmark
    >({
      invalidatesTags: [{ type: awsTags.bookmarks }],
      query: ({ type, ...payload }) => {
        const network: NetworkType = IS_TEST ? "testnet" : "mainnet";
        return {
          url: "/v1/bookmarks",
          method: type === "add" ? "POST" : "DELETE",
          body: { ...payload, network },
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const {
  useBookmarksQuery,
  useToggleBookmarkMutation,
  useEndowmentsQuery,
  util: { invalidateTags: invalidateAwsTags },
} = aws;
