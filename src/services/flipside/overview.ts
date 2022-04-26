import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const endowmentsAPI = createApi({
  reducerPath: "endowmentsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://flipside.leslug.com/angel/" }),
  endpoints: (builder) => ({
    getTVL: builder.query<any, unknown>({
      query: (string) => `tvl`,
    }),
  }),
});

export const { useGetTVLQuery } = endowmentsAPI;
