import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apes_endpoint } from "constants/urls";

export const apes = createApi({
  reducerPath: "apes",
  baseQuery: fetchBaseQuery({
    baseUrl: apes_endpoint,
    mode: "cors",
  }),
  endpoints: () => ({}),
});
