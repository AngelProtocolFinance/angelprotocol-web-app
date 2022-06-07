import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { awsTags } from "./tags";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: aws_endpoint,
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
