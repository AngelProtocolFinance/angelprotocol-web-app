import type {
  MediaPage,
  MediaQueryParamsObj,
  MediaUpdate,
  TMedia,
} from "@better-giving/endowment";
import { TEMP_JWT } from "constants/auth";
import { version as v } from "../helpers";
import { aws } from "./aws";

const media = aws.injectEndpoints({
  endpoints: (builder) => ({
    media: builder.query<MediaPage, MediaQueryParamsObj & { endowId: number }>({
      providesTags: ["media", "medium"],
      query: ({ endowId, ...params }) => {
        return { url: `/${v(1)}/endowments/${endowId}/media`, params };
      },
    }),
    medium: builder.query<TMedia, { endowId: number; mediaId: string }>({
      providesTags: ["program"],
      query: ({ endowId, mediaId }) =>
        `/${v(1)}/endowments/${endowId}/media/${mediaId}`,
    }),
    newMedium: builder.mutation<
      { id: string },
      { endowId: number; newUrl: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["media"]),
      query: ({ endowId, newUrl }) => {
        return {
          url: `/${v(1)}/endowments/${endowId}/media`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
          body: newUrl,
        };
      },
    }),
    editMedium: builder.mutation<
      TMedia,
      MediaUpdate & { endowId: number; mediaId: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["medium", "media"]),
      query: ({ endowId, mediaId, ...payload }) => {
        return {
          url: `/${v(1)}/endowments/${endowId}/media/${mediaId}`,
          method: "PATCH",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    deleteMedium: builder.mutation<
      unknown,
      { endowId: number; mediaId: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["media"]),
      query: ({ endowId, mediaId }) => {
        return {
          url: `/${v(1)}/endowments/${endowId}/media/${mediaId}`,
          method: "DELETE",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useMediaQuery,
  useMediumQuery,
  useNewMediumMutation,
  useEditMediumMutation,
  useDeleteMediumMutation,
  useLazyMediaQuery,
  util: { updateQueryData: updateMediaQueryData },
} = media;
