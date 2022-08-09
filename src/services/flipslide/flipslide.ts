import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { APIs } from "constants/urls";

const flipsideBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: APIs.flipside,
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
