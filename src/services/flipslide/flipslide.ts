import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { flipside_endpoint } from "constants/urls";

const flipsideBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: flipside_endpoint,
    mode: "cors",
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 0 }
);

export const flipside = createApi({
  reducerPath: "flipside",
  baseQuery: flipsideBaseQuery,
  endpoints: () => ({}),
});
