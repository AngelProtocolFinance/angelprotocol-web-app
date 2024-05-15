import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import type { Wordpress } from "types/wordpress";

export const wordpress = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: APIs.wordpress }),
  reducerPath: "wordpress",
  endpoints: (builder) => ({
    posts: builder.query<Wordpress.PostPage, Wordpress.Post.QueryParams>({
      query: (params) => ({ url: "posts", params }),
      transformResponse(res: Wordpress.Post[], meta, arg) {
        /**get total */
        const headers = meta?.response?.headers;
        const total = Number(headers?.get("X-Wp-Total") || "0");

        /** get num items */
        const currPage = arg.page ?? 1;
        const itemsPerPage = 10; //default
        const currNumItems = currPage * itemsPerPage;

        return {
          pageNum: currPage,
          posts: res,
          nextPageNum: currNumItems < total ? currPage + 1 : undefined,
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
    media: builder.query<Wordpress.Media, number>({
      query: (id) => `media/${id}`,
    }),
    user: builder.query<Wordpress.User, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  usePostsQuery,
  useLazyPostsQuery,
  usePostQuery,
  useMediaQuery,
  useUserQuery,
  util: { updateQueryData: updateWordpressQueryData },
} = wordpress;
