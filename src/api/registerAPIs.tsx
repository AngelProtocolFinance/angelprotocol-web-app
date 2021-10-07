import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const REGISTER_API_REDUCER_KEY = "registerAPIs";
export const registerAPIs = createApi({
  reducerPath: REGISTER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getRegisteredCharities: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration/list?regStatus=${data.regStatus}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    checkPreviousRegistration: builder.mutation<any, string>({
      query: (uuid) => {
        return {
          url: `registration?uuid=${uuid}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    createCharityMetaData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration?uuid=${data.uuid}`,
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    requestEmail: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration/build-email?uuid=${data.uuid}&type=${data.type}`,
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    createNewCharity: builder.mutation<any, any>({
      query: (body) => ({
        url: "registration",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response,
    }),
    updatePersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration?uuid=${data.uuid}`,
          method: "POST",
          body: data.body,
        };
      },
    }),
  }),
});

export const {
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useGetRegisteredCharitiesMutation,
} = registerAPIs;
