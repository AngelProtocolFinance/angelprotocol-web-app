import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import { Wordpress } from "types/wordpress";

export const wordpress = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: APIs.wordpress }),
  reducerPath: "wordpress",
  endpoints: (builder) => ({
    posts: builder.query<Wordpress.Post[], Wordpress.Post.QueryParams>({
      query: (_params) => {
        return {
          url: "posts",
          params: {},
        };
      },
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
    pages: builder.query<Wordpress.Page[], Wordpress.Post.QueryParams>({
      query: (_params) => {
        return {
          url: "pages",
          params: {},
        };
      },
    }),
    page: builder.query<Wordpress.Page, string>({
      query: (slug) => {
        return {
          url: `pages?slug=${slug}`,
          params: {},
        };
      },
    }),
    media: builder.query<Wordpress.Media, number>({
      query: (id) => `media/${id}`,
    }),
    // categories: builder.query<Category[], WpQueryParams>({
    //   query: () => {
    //     return {
    //       url: `/categories`,
    //       params: {},
    //     };
    //   },
    // }),
    // category: builder.query<Category>({
    //   query: (id) => {
    //     return {
    //       url: `/category/${id}`,
    //       params: {},
    //     };
    //   },
    // }),
  }),
});

export const {
  usePagesQuery,
  usePageQuery,
  usePostsQuery,
  usePostQuery,
  useMediaQuery,
} = wordpress;
