import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

export const keyPersonAPIs = createApi({
  reducerPath: "keyPersonAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    updateKeyPersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.PK },
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    addNewKeyCharity: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.PK },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const { useAddNewKeyCharityMutation, useUpdateKeyPersonDataMutation } =
  keyPersonAPIs;
