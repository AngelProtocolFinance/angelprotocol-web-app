import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { TStore } from "Redux/store";

export const keyPersonAPIs = createApi({
  reducerPath: "keyPersonAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const userData: any = (getState() as TStore).user.userData;
      if (userData.token) {
        headers.set("authorization", `${userData.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateKeyPersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.uuid },
          method: "PUT",
          body: data,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    addNewKeyCharity: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.uuid },
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const { useAddNewKeyCharityMutation, useUpdateKeyPersonDataMutation } =
  keyPersonAPIs;
