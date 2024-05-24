import { TEMP_JWT } from "constants/auth";
import type { Media } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const media = aws.injectEndpoints({
  endpoints: (builder) => ({
    media: builder.query<Media[], number>({
      providesTags: ["media", "medium"],
      query: (endowId) => `/${v(1)}/endowments/${endowId}/media`,
    }),
    medium: builder.query<Media, { endowId: number; mediaId: string }>({
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
      Media,
      { endowId: number; mediaId: string; newUrl: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["medium", "media"]),
      query: ({ endowId, mediaId, newUrl }) => {
        return {
          url: `/${v(1)}/endowments/${endowId}/media/${mediaId}`,
          method: "PATCH",
          headers: { authorization: TEMP_JWT },
          body: newUrl,
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
          url: `/${v(2)}/endowments/${endowId}/programs/${mediaId}`,
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
} = media;
