import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.aws,
    mode: "cors",
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 1 }
);

export const aws = createApi({
  tagTypes: [
    "airdrop",
    "admin",
    "endowment",
    "endowments",
    "strategy",
    "programs",
    "program",
    "media",
    "medium",
    "applications",
    "application",
    "banking-applications",
    "banking-application",
    "endow-admins",
    "donations",
    "user",
    "user-endows",
  ],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: () => ({}),
});

export const {
  util: {
    invalidateTags: invalidateAwsTags,
    updateQueryData: updateAWSQueryData,
  },
} = aws;
