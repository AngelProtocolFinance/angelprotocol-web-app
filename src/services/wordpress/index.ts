import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import { Wordpress } from "types/wordpress";

export const wordpress = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: APIs.wordpress }),
  reducerPath: "wordpress",
  endpoints: (builder) => ({
    posts: builder.query<Wordpress.Post[], any>({
      query: () => "posts",
    }),
    post: builder.query<Wordpress.Post, string>({
      query: (slug) => {
        return {
          url: "posts",
          params: { slug },
        };
      },
      transformResponse: ([post]: [Wordpress.Post]) => post,
    }),
    media: builder.query<Wordpress.Media, number>({
      query: (id) => `media/${id}`,
    }),
  }),
});

export const { usePostsQuery, usePostQuery, useMediaQuery } = wordpress;
