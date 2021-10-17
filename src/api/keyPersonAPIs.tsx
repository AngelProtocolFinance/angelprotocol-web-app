import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const KEYPERSON_API_REDUCER_KEY = "keyPersonAPIs";
export const keyPersonAPIs = createApi({
  reducerPath: KEYPERSON_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    updateKeyPersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person?uuid=${data.uuid}`,
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    addNewKeyCharity: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person?uuid=${data.uuid}`,
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
