import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flipsideAPI = createApi({
  reducerPath: "flipsideAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://flipside.leslug.com/angel/" }),
  endpoints: (builder) => ({
    getFlipsideQuery: builder.query<any, unknown>({
      query: (string) => `${string}`,
    }),
  }),
});

export const { useGetFlipsideQueryQuery } = flipsideAPI;
