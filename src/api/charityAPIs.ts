import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

export const charityAPIs = createApi({
  reducerPath: "charityAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    addCharityMetadata: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity`,
          params: { uuid: data.uuid },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    updateCharityMetadata: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity`,
          params: { uuid: data.uuid },
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    getCharityData: builder.query<any, any>({
      query: (uuid) => {
        return {
          url: `charity`,
          params: { uuid: uuid },
          method: "Get",
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    getCharityListEndowment: builder.query<any, any>({
      query: (status) => {
        return {
          url: `charity/list`,
          params: { endowmentStatus: status },
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddCharityMetadataMutation,
  useGetCharityDataQuery,
  useGetCharityListEndowmentQuery,
  useUpdateCharityMetadataMutation,
} = charityAPIs;
