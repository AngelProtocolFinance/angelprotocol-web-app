import type { Verdict } from "@better-giving/registration/approval";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import type { Donation, DonationsQueryParams, Endowment } from "types/aws";
import { version as v } from "../helpers";
import type { EndowmentUpdate } from "../types";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 1 }
);

export const aws = createApi({
  tagTypes: [
    "airdrop",
    "admin",
    "endowment",
    "endowments",
    "strategy",
    "programs",
    "program",
    "media",
    "medium",
    "applications",
    "application",
    "banking-applications",
    "banking-application",
    "endow-admins",
    "donations",
    "user",
    "user-bookmarks",
    "user-endows",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    userBookmarks: builder.query<number[], null>({
      providesTags: ["user-bookmarks"],
      query: () => ({
        url: `${v(1)}/bookmarks`,
        //get user id from jwt
        headers: { authorization: TEMP_JWT },
      }),
    }),
    toggleUserBookmark: builder.mutation<
      unknown,
      { endowId: number; action: "add" | "delete" }
    >({
      invalidatesTags: ["user-bookmarks"],
      query: ({ endowId, action }) => {
        if (action === "add") {
          return {
            url: `${v(1)}/bookmarks`,
            method: "POST",
            body: { endowId },
            headers: { authorization: TEMP_JWT },
          };
        }

        return {
          url: `${v(1)}/bookmarks/${endowId}`,
          method: "DELETE",
          //get user id from jwt
          headers: { authorization: TEMP_JWT },
        };
      },
      async onQueryStarted({ endowId, action }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          aws.util.updateQueryData("userBookmarks", null, (draft) => {
            if (action === "add") {
              draft.push(endowId);
            } else {
              const idx = draft.indexOf(endowId);
              if (idx !== -1) {
                draft.splice(idx, 1);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    editEndowment: builder.mutation<Endowment, EndowmentUpdate>({
      invalidatesTags: (_, error) => (error ? [] : ["endowments", "endowment"]),
      query: ({ id, ...payload }) => {
        return {
          url: `/${v(10)}/endowments/${id}`,
          method: "PATCH",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),

    reviewApplication: builder.mutation<any, Verdict & { id: string }>({
      invalidatesTags: ["application", "applications"],
      query: ({ id, ...verdict }) => {
        return {
          url: `${v(1)}/registrations/${id}/review`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
          body: verdict,
        };
      },
    }),
    donations: builder.query<
      { Items: Donation.Record[]; nextPage?: number },
      DonationsQueryParams
    >({
      providesTags: ["donations"],
      query: (params) => {
        return {
          url: `${v(2)}/donations`,
          params,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useUserBookmarksQuery,
  useToggleUserBookmarkMutation,
  useEditEndowmentMutation,
  useReviewApplicationMutation,
  useDonationsQuery,
  useLazyDonationsQuery,
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;
