import type {
  Application,
  Page,
  QueryParams,
  Verdict,
} from "@better-giving/registration/approval";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import { apiEnv } from "services/constants";
import type {
  Donation,
  DonationsQueryParams,
  EndowListPaginatedAWSQueryRes,
  EndowQParams,
  Endowment,
  EndowmentCard,
  EndowmentOption,
} from "types/aws";
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
    "registration",
    "endow-admins",
    "donations",
    "user",
    "user-bookmarks",
    "user-endows",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowmentCards: builder.query<
      EndowListPaginatedAWSQueryRes<EndowmentCard[]>,
      EndowQParams
    >({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `${v(1)}/cloudsearch-nonprofits`,
          params: { ...params, fields: endowCardFields },
        };
      },
    }),
    endowmentOptions: builder.query<EndowmentOption[], EndowQParams>({
      providesTags: ["endowments"],
      query: (p) => {
        return {
          url: `${v(1)}/cloudsearch-nonprofits`,
          params: { ...p, page: 1, fields: endowSelectorOptionFields },
        };
      },
      transformResponse(res: EndowListPaginatedAWSQueryRes<EndowmentOption[]>) {
        return res.Items;
      },
    }),
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

    endowWithEin: builder.query<
      Pick<Endowment, "id" | "name" | "claimed" | "registration_number">,
      string
    >({
      query: (ein) => ({ url: "v10/endowments", params: { ein, env: apiEnv } }),
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

    applications: builder.query<Page, QueryParams>({
      providesTags: ["applications"],
      query: (params) => {
        return {
          url: `${v(1)}/registrations`,
          params,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    application: builder.query<Application, string>({
      providesTags: ["application"],
      query: (uuid) => ({
        url: `${v(1)}/registrations/${uuid}`,
        headers: { authorization: TEMP_JWT },
      }),
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
  id: "",
  card_img: "",
  name: "",
  tagline: "",
  claimed: "",
  contributions_total: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const endowSelectorOptionObj: {
  [key in keyof Required<EndowmentOption>]: "";
} = {
  id: "",
  name: "",
};
const endowSelectorOptionFields = Object.keys(endowSelectorOptionObj).join(",");
