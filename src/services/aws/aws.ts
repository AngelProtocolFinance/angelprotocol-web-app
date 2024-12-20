import type {
  Endow,
  EndowUpdate,
  EndowsQueryParams,
} from "@better-giving/endowment";
import type {
  Application,
  Page,
  QueryParams,
  Verdict,
} from "@better-giving/registration/approval";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { TEMP_JWT } from "constants/auth";
import { APIs } from "constants/urls";
import type { RootState } from "store/store";
import { userIsSignedIn } from "types/auth";
import type {
  Donation,
  DonationsQueryParams,
  EndowCardsPage,
  EndowOptionsPage,
  EndowmentCard,
  EndowmentOption,
} from "types/aws";
import { version as v } from "../helpers";

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
    "user-endows",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: (builder) => ({
    endowmentCards: builder.query<EndowCardsPage, EndowsQueryParams>({
      providesTags: ["endowments"],
      query: ({ fields = endowCardFields, ...p }) => {
        return {
          url: `${v(1)}/cloudsearch-nonprofits`,
          params: { ...p, fields },
        };
      },
    }),
    endowmentOptions: builder.query<EndowmentOption[], EndowsQueryParams>({
      providesTags: ["endowments"],
      query: (params) => {
        return {
          url: `${v(1)}/cloudsearch-nonprofits`,
          params: { ...params, fields: endowSelectorOptionFields },
        };
      },
      transformResponse(res: EndowOptionsPage) {
        return res.items;
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
      Endow,
      { id: string | number; fields?: (keyof Endow)[] }
    >({
      providesTags: ["endowment"],
      query: ({ fields, id }) => ({
        url: `${v(1)}/endowments/${id}`,
        params: fields ? { fields: fields.join(",") } : {},
      }),
    }),

    editEndowment: builder.mutation<Endow, EndowUpdate & { id: number }>({
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
  useEndowmentQuery,
  useEndowmentCardsQuery,
  useEndowmentOptionsQuery,
  useEditEndowmentMutation,
  useApplicationsQuery,
  useApplicationQuery,
  useReviewApplicationMutation,
  useDonationsQuery,
  useLazyDonationsQuery,
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
  [key in keyof Required<EndowmentCard>]: ""; //we care only for keys
} = {
  id: "",
  card_img: "",
  name: "",
  tagline: "",
  claimed: "",
  contributions_total: "",
  target: "",
};
const endowCardFields = Object.keys(endowCardObj).join(",");

const endowSelectorOptionObj: {
  [key in keyof Required<EndowmentOption>]: "";
} = {
  id: "",
  name: "",
};
const endowSelectorOptionFields = Object.keys(endowSelectorOptionObj).join(",");

export const endowByEin = async (
  ein: string
): Promise<
  Pick<Endow, "id" | "name" | "claimed" | "registration_number"> | undefined
> => {
  const res = await fetch(`${APIs.aws}/${v(1)}/endowments/ein/${ein}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw res;
  return res.json() as Promise<Endow>;
};
