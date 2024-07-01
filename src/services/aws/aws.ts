import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
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
} from "types/aws";
import { version as v } from "../helpers";
import type { EndowmentUpdate, IdOrSlug } from "../types";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
    async prepareHeaders(headers, { getState }) {
      const {
        auth: { user },
      } = getState() as RootState;

      if (headers.get("authorization") === TEMP_JWT) {
        if (!userIsSignedIn(user)) return headers;
        const nowSeconds = Math.round(+new Date() / 1000);

        const token =
          nowSeconds < user.tokenExpiry
            ? user.token
            : /** fetching session fires `tokenRefresh | tokenRefresh_failure` event in Hub */
              await fetchAuthSession({ forceRefresh: true }).then((res) =>
                res.tokens?.idToken?.toString()
              );

        if (!token) return headers;

        headers.set("authorization", token);
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
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    ping: builder.query({
      query: () => ({
        url: "",
        method: "OPTIONS",
        headers: { authorization: TEMP_JWT },
      }),
    }),
    endowmentCards: builder.query<
      EndowListPaginatedAWSQueryRes<EndowmentCard[]>,
      EndowmentsQueryParams
    >({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: "cloudsearch-nonprofits",
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
          url: "cloudsearch-nonprofits",
          params: { ...params, fields: endowSelectorOptionFields, env: apiEnv },
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
      invalidatesTags: (_, error) => (error ? [] : ["endowments", "endowment"]),
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
  useUserBookmarksQuery,
  useToggleUserBookmarkMutation,
  usePingQuery,
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
