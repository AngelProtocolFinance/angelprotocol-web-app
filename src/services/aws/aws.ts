import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";
import { awsTags } from "./tags";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 0 }
);

export const aws = createApi({
  tagTypes: [awsTags.admin, awsTags.cha],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: () => ({}),
});

export const { invalidateTags: invalidateAwsTags } = aws.util;
