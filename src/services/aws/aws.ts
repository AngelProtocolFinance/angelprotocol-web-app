import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { aws_endpoint } from "constants/urls";
import { tags } from "./tags";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const { charity } = getState() as RootState;

      if (charity.token) {
        headers.set("authorization", charity.token);
      }
      return headers;
    },
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 0 }
);

export const aws = createApi({
  tagTypes: [tags.cha, tags.admin],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: () => ({}),
});
