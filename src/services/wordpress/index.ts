import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import { Page, Post, WpQueryParams } from "types/wordpress";

export const wordpress = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: APIs.wordpress }),
  reducerPath: "wordpress",
  endpoints: (builder) => ({
    posts: builder.query<Post[], WpQueryParams>({
      query: (_params) => {
        return {
          url: "post",
          params: {},
        };
      },
    }),
    post: builder.query<Post, string>({
      query: (slug) => {
        return {
          url: `posts?slug=${slug}`,
        };
      },
    }),
    pages: builder.query<Page[], WpQueryParams>({
      query: (_params) => {
        return {
          url: "pages",
          params: {},
        };
      },
    }),
    page: builder.query<Page, string>({
      query: (slug) => {
        return {
          url: `/pages?slug=${slug}`,
          params: {},
        };
      },
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

export const { usePagesQuery, usePageQuery, usePostsQuery, usePostQuery } =
  wordpress;
