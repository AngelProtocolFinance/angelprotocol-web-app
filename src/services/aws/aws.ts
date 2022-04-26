import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import createAuthToken, { UserTypes } from "helpers/createAuthToken";
import { aws_endpoint } from "constants/urls";
import { tags } from "./tags";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers) => {
      // need this mostly for /registration endpoints
      const token = createAuthToken(UserTypes.CHARITY_OWNER);
      headers.set("authorization", token);
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
