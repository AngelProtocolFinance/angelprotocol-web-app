import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import { Page, Post, WpQueryParams } from "types/wp";

export const wpApi = createApi({
  // Set the baseUrl for every endpoint below
  baseQuery: fetchBaseQuery({
    baseUrl: APIs.wp,
    endpoints: (builder) => ({
      listPosts: builder.query<Post[], WpQueryParams>({
        query: (_params) => {
          return {
            url: `/posts`,
            params: {},
          };
        },
      }),
      getPost: builder.query<Post>({
        query: (slug) => {
          return {
            url: `/posts?slug=${slug}`,
            params,
          };
        },
      }),
      listPages: builder.query<Page[], WpQueryParams>({
        query: (_params) => {
          return {
            url: `/pages`,
            params: {},
          };
        },
      }),
      getPage: builder.query<Page>({
        query: (slug) => {
          return {
            url: `/pages?slug=${slug}`,
            params: {},
          };
        },
      }),
      // listCategories: builder.query<Category[], WpQueryParams>({
      // 	query: (params) => {
      // 		return {
      // 			url: `/categories`,
      // 			params: {},
      // 		};
      // 	},
      // }),
      // getCategory: builder.query<Category>({
      // 	query: (id) => {
      // 		return {
      // 			url: `/category/${id}`,
      // 			params: {},
      // 		};
      // 	},
      // }),
    }),
  }),
});
